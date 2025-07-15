// Performance alerting configuration
import * as Sentry from '@sentry/nextjs';
import {
  WEB_VITALS_THRESHOLDS,
  type WebVitalMetric,
  type PerformanceRating,
} from '../web-vitals';

export interface PerformanceAlert {
  metric: WebVitalMetric;
  value: number;
  threshold: number;
  severity: 'warning' | 'critical';
  message: string;
  timestamp: Date;
}

// Alert severity thresholds
const ALERT_THRESHOLDS = {
  LCP: { warning: 3000, critical: 4000 },
  FID: { warning: 200, critical: 300 },
  INP: { warning: 300, critical: 500 },
  CLS: { warning: 0.15, critical: 0.25 },
  FCP: { warning: 2500, critical: 3000 },
  TTFB: { warning: 1200, critical: 1800 },
} as const;

// Generate performance alert
export function createPerformanceAlert(
  metric: WebVitalMetric,
  value: number,
  rating: PerformanceRating,
): PerformanceAlert | null {
  if (rating === 'good') return null;

  const thresholds = ALERT_THRESHOLDS[metric];
  const severity = value >= thresholds.critical ? 'critical' : 'warning';

  return {
    metric,
    value,
    threshold: rating === 'poor' ? thresholds.critical : thresholds.warning,
    severity,
    message: `Performance Alert: ${metric} performance ${severity} - ${value}${metric === 'CLS' ? '' : 'ms'} (${rating})`,
    timestamp: new Date(),
  };
}

// Send alerts to monitoring services
export async function sendPerformanceAlert(
  alert: PerformanceAlert,
): Promise<void> {
  // Log to console
  const emoji = alert.severity === 'critical' ? '🚨' : '⚠️';
  console.warn(`${emoji} Performance Alert:`, alert.message);

  // Send to Sentry
  const alertMessage = `Performance Alert: ${alert.metric} performance ${alert.severity} - ${alert.value}${alert.metric === 'CLS' ? '' : 'ms'}`;

  Sentry.captureMessage(alertMessage, {
    level: alert.severity === 'critical' ? 'error' : 'warning',
    tags: {
      component: 'web-vitals',
      metric: alert.metric,
      severity: alert.severity,
      performance_rating:
        alert.value >= ALERT_THRESHOLDS[alert.metric].critical
          ? 'poor'
          : 'needs-improvement',
    },
    extra: {
      metric_name: alert.metric,
      metric_value: alert.value,
      threshold_exceeded: alert.threshold,
      severity: alert.severity,
      timestamp: alert.timestamp.toISOString(),
      good_threshold: WEB_VITALS_THRESHOLDS[alert.metric].good,
      needs_improvement_threshold:
        WEB_VITALS_THRESHOLDS[alert.metric].needsImprovement,
    },
  });

  // In production, you could also send to other services:
  // - Email alerts
  // - Slack notifications
  // - PagerDuty
  // - Custom webhook endpoints
}

// Check if alerts should be sent (rate limiting)
const alertHistory = new Map<string, number>();
const ALERT_COOLDOWN = 5 * 60 * 1000; // 5 minutes

export function shouldSendAlert(metric: WebVitalMetric): boolean {
  const now = Date.now();
  const lastAlert = alertHistory.get(metric);

  if (!lastAlert || now - lastAlert > ALERT_COOLDOWN) {
    alertHistory.set(metric, now);
    return true;
  }

  return false;
}

// Get alert configuration for dashboard
export function getAlertConfiguration() {
  return {
    thresholds: ALERT_THRESHOLDS,
    webVitalsThresholds: WEB_VITALS_THRESHOLDS,
    cooldownPeriod: ALERT_COOLDOWN,
  };
}
