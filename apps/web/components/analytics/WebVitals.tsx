'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { trackWebVital } from '../../lib/web-vitals';

export default function WebVitals() {
  useReportWebVitals(metric => {
    // Use our enhanced tracking function
    trackWebVital(metric);

    // Dispatch custom event for dashboard
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('web-vital', {
          detail: {
            name: metric.name,
            value: Math.round(metric.value),
            rating: metric.rating,
            id: metric.id,
          },
        }),
      );
    }
  });

  return null; // This component doesn't render anything
}
