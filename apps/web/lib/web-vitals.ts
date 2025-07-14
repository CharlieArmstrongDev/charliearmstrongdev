'use client';

import { onCLS, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';
import { trackEvent as trackGoogleAnalytics } from './analytics/google-analytics';
import { trackEvent as trackVercelAnalytics } from './analytics/vercel-analytics';

// Web Vitals thresholds for performance classification
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 }, // First Input Delay (deprecated, replaced by INP)
  INP: { good: 200, needsImprovement: 500 }, // Interaction to Next Paint
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
} as const;

export type WebVitalMetric = 'LCP' | 'FID' | 'INP' | 'CLS' | 'FCP' | 'TTFB';
export type PerformanceRating = 'good' | 'needs-improvement' | 'poor';

// Classification function for performance ratings
export function getPerformanceRating(
  metric: WebVitalMetric,
  value: number,
): PerformanceRating {
  const thresholds = WEB_VITALS_THRESHOLDS[metric];
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
}

// Enhanced Web Vitals tracking with alerts
export function trackWebVital(metric: Metric) {
  const { name, value, rating, id } = metric;
  const numericValue = Math.round(value);
  const performanceRating = getPerformanceRating(
    name as WebVitalMetric,
    numericValue,
  );

  // Track to Google Analytics
  trackGoogleAnalytics('web_vital', 'performance', name, numericValue, {
    custom_parameter_1: 'web_vitals',
    custom_parameter_2: performanceRating,
    metric_name: name,
    metric_id: id,
    rating: rating,
  });

  // Track to Vercel Analytics
  trackVercelAnalytics('Web Vital', {
    metric: name,
    value: numericValue,
    rating: performanceRating,
    id: id,
  });

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 Web Vital [${name}]:`, {
      value: `${numericValue}${name === 'CLS' ? '' : 'ms'}`,
      rating: performanceRating,
      threshold: WEB_VITALS_THRESHOLDS[name as WebVitalMetric],
    });
  }

  // Performance alerts for poor metrics
  if (performanceRating === 'poor') {
    handlePerformanceAlert(name, numericValue, performanceRating);
  }

  return {
    name,
    value: numericValue,
    rating: performanceRating,
    id,
  };
}

// Handle performance alerts for poor metrics
import {
  createPerformanceAlert,
  sendPerformanceAlert,
  shouldSendAlert,
} from './monitoring/performance-alerts';

async function handlePerformanceAlert(
  metric: string,
  value: number,
  rating: PerformanceRating,
) {
  const alertMessage = `Poor ${metric} performance: ${value}${metric === 'CLS' ? '' : 'ms'} (${rating})`;

  // Log alert
  console.warn('🔴 Performance Alert:', alertMessage);

  // Create structured alert
  const alert = createPerformanceAlert(metric as WebVitalMetric, value, rating);

  if (alert && shouldSendAlert(metric as WebVitalMetric)) {
    await sendPerformanceAlert(alert);
  }

  // Track alert as custom event
  trackGoogleAnalytics('performance_alert', 'performance', metric, value, {
    custom_parameter_1: 'alert',
    custom_parameter_2: rating,
    alert_type: 'web_vitals',
    metric_name: metric,
  });

  trackVercelAnalytics('Performance Alert', {
    metric,
    value,
    rating,
    type: 'web_vitals',
  });
}

// Initialize all Web Vitals collection
export function initializeWebVitals() {
  // Core Web Vitals
  onCLS(trackWebVital);
  onLCP(trackWebVital);

  // Additional metrics
  onFCP(trackWebVital);
  onTTFB(trackWebVital);
}

// Manual performance measurement utilities
export function measurePageLoad(pageName: string) {
  if (typeof window === 'undefined') return;

  const navigationEntry = performance.getEntriesByType(
    'navigation',
  )[0] as PerformanceNavigationTiming;

  if (navigationEntry) {
    const metrics = {
      dns: Math.round(
        navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart,
      ),
      tcp: Math.round(
        navigationEntry.connectEnd - navigationEntry.connectStart,
      ),
      ttfb: Math.round(
        navigationEntry.responseStart - navigationEntry.requestStart,
      ),
      download: Math.round(
        navigationEntry.responseEnd - navigationEntry.responseStart,
      ),
      domReady: Math.round(
        navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart,
      ),
      windowLoad: Math.round(
        navigationEntry.loadEventEnd - navigationEntry.fetchStart,
      ),
    };

    // Track page load metrics
    trackGoogleAnalytics(
      'page_load_timing',
      'performance',
      pageName,
      metrics.windowLoad,
      {
        custom_parameter_1: 'page_timing',
        custom_parameter_2: pageName,
        dns_time: metrics.dns,
        tcp_time: metrics.tcp,
        ttfb_time: metrics.ttfb,
        download_time: metrics.download,
        dom_ready_time: metrics.domReady,
      },
    );

    trackVercelAnalytics('Page Load Timing', {
      page: pageName,
      totalTime: metrics.windowLoad,
      ttfb: metrics.ttfb,
      domReady: metrics.domReady,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Page Load Metrics [${pageName}]:`, metrics);
    }

    return metrics;
  }
}

// Resource timing analysis
export function analyzeResourcePerformance() {
  if (typeof window === 'undefined') return;

  const resources = performance.getEntriesByType(
    'resource',
  ) as PerformanceResourceTiming[];
  const slowResources = resources
    .filter(resource => resource.duration > 1000) // Resources taking > 1s
    .map(resource => ({
      name: resource.name,
      duration: Math.round(resource.duration),
      size: resource.transferSize,
      type: resource.initiatorType,
    }));

  if (slowResources.length > 0) {
    console.warn('🐌 Slow Resources Detected:', slowResources);

    // Track slow resources
    slowResources.forEach(resource => {
      trackVercelAnalytics('Slow Resource', {
        resourceName: resource.name,
        duration: resource.duration,
        size: resource.size,
        type: resource.type,
      });
    });
  }

  return {
    totalResources: resources.length,
    slowResources: slowResources.length,
    slowResourceDetails: slowResources,
  };
}

// Export for use in components
export { onCLS, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';
