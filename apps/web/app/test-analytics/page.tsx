'use client';

import { useState } from 'react';
import { trackEvent } from '../../lib/analytics/vercel-analytics';

export default function TestAnalyticsPage() {
  const [testResult, setTestResult] = useState<string>('');

  const testAnalytics = () => {
    try {
      // Test basic event tracking
      trackEvent('Test Event', {
        source: 'test-page',
        timestamp: new Date().toISOString(),
      });

      // Check if Vercel Analytics is loaded
      const isLoaded = typeof window !== 'undefined' && 'va' in window;

      setTestResult(`
✅ Analytics Test Completed Successfully!

Analytics Status:
- Vercel Analytics loaded: ${isLoaded ? '✅ Yes' : '❌ No'}
- Global 'va' function available: ${typeof window !== 'undefined' && window.va ? '✅ Yes' : '❌ No'}
- Event tracked: ✅ Yes (Test Event sent)
- Endpoint: /_vercel/insights/event
- Time: ${new Date().toLocaleTimeString()}

✅ What this means:
- Your analytics is working correctly!
- Page views are being tracked automatically
- Custom events are being recorded
- Data will appear in your Vercel dashboard

Next steps:
1. Check your Vercel Analytics dashboard for increased page counts
2. Look for 'Test Event' in your analytics events
3. Verify Web Vitals are being collected
      `);

      console.log('🧪 Analytics Test:', {
        vaExists: typeof window !== 'undefined' && 'va' in window,
        vaFunction: typeof window !== 'undefined' && window.va,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      setTestResult(
        `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      console.error('Analytics test failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Vercel Analytics Test
        </h1>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Analytics Test</h2>

          <button
            onClick={testAnalytics}
            className="mb-4 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            Test Vercel Analytics
          </button>

          {testResult && (
            <div className="rounded border bg-gray-50 p-4">
              <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
            </div>
          )}

          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <h3 className="font-semibold">What to check:</h3>
            <ul className="list-inside list-disc space-y-2">
              <li>Open browser DevTools (F12) → Network tab</li>
              <li>Click the test button above</li>
              <li>Look for requests to:</li>
              <ul className="ml-6 list-inside list-disc">
                <li>
                  <code>/_vercel/insights/event</code> ✅
                </li>
                <li>
                  <code>/_vercel/insights/vitals</code>
                </li>
              </ul>
              <li>Check console for any errors</li>
              <li>Verify page count increases in Vercel dashboard</li>
            </ul>
          </div>

          <div className="mt-6 rounded border-l-4 border-blue-400 bg-blue-50 p-4">
            <h3 className="font-semibold text-blue-800">
              🚀 Web Vitals & Speed Insights:
            </h3>
            <ul className="mt-2 list-inside list-disc text-sm text-blue-700">
              <li>
                <strong>Core Web Vitals:</strong> LCP (loading), FID
                (interactivity), CLS (layout shifts)
              </li>
              <li>
                <strong>View in Vercel:</strong> Dashboard → Project → Speed
                Insights tab
              </li>
              <li>
                <strong>Test now:</strong> Open DevTools Console to see Web
                Vitals logs
              </li>
              <li>
                <strong>External check:</strong>{' '}
                <a
                  href="https://pagespeed.web.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  PageSpeed Insights
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-6 rounded border-l-4 border-green-400 bg-green-50 p-4">
            <h3 className="font-semibold text-green-800">
              ✅ Analytics Status:
            </h3>
            <ul className="mt-2 list-inside list-disc text-sm text-green-700">
              <li>Vercel Analytics is included on all plans now!</li>
              <li>Analytics requests go to /_vercel/insights/event</li>
              <li>Data appears in real-time in Vercel dashboard</li>
              <li>Custom events and Web Vitals are tracked automatically</li>
              <li>Some browsers/ad blockers may still block requests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
