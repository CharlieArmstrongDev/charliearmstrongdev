'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { trackEvent } from '../../lib/analytics/vercel-analytics';

export default function WebVitals() {
  useReportWebVitals(metric => {
    // Track Core Web Vitals to Vercel Analytics
    trackEvent('Web Vital', {
      metric: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
    });

    // Optional: Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric);
    }
  });

  return null; // This component doesn't render anything
}
