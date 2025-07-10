'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function VercelAnalytics() {
  return (
    <>
      {/* Vercel Analytics for page views and user behavior */}
      <Analytics />

      {/* Speed Insights for Core Web Vitals monitoring */}
      <SpeedInsights />
    </>
  );
}
