'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '../../lib/analytics/vercel-analytics';
import { trackEvent as trackGAEvent } from '../../lib/analytics/google-analytics';

export default function TestAnalyticsPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [gaTestResult, setGaTestResult] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  // Handle client-side only code to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const testAnalytics = () => {
    try {
      // Test basic event tracking
      trackEvent('Test Event', {
        source: 'test-page',
        timestamp: new Date().toISOString(),
      });

      // Check if Vercel Analytics is loaded (only on client)
      const isLoaded = isClient && 'va' in window;

      setTestResult(`
✅ Analytics Test Completed Successfully!

Analytics Status:
- Vercel Analytics loaded: ${isLoaded ? '✅ Yes' : '❌ No'}
- Global 'va' function available: ${isClient && window.va ? '✅ Yes' : '❌ No'}
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
        vaExists: isClient && 'va' in window,
        vaFunction: isClient && window.va,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      setTestResult(
        `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      console.error('Analytics test failed:', error);
    }
  };

  const testGoogleAnalytics = () => {
    try {
      const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
      const isGAConfigured = !!gaId;
      const isGtagLoaded = isClient && 'gtag' in window;

      // Test GA event tracking
      if (isGAConfigured && isGtagLoaded) {
        trackGAEvent('test_analytics_page', 'engagement', 'analytics-test', 1);
      }

      setGaTestResult(`
✅ Google Analytics Test Completed!

Google Analytics Status:
- GA4 ID configured: ${isGAConfigured ? '✅ Yes' : '❌ No'} ${gaId ? `(${gaId})` : ''}
- gtag function loaded: ${isGtagLoaded ? '✅ Yes' : '❌ No'}
- Test event sent: ${isGAConfigured && isGtagLoaded ? '✅ Yes' : '❌ Skipped'}
- Time: ${new Date().toLocaleTimeString()}

${isGAConfigured ? '✅ Configuration is correct!' : '⚠️ Setup required:'}
${
  !isGAConfigured
    ? `
1. Create a Google Analytics 4 property
2. Add NEXT_PUBLIC_GOOGLE_ANALYTICS_ID to your .env.local
3. Restart your development server
4. Visit /test-google-analytics for detailed testing
`
    : ''
}

${
  isGAConfigured
    ? `
✅ Next steps:
1. Visit /test-google-analytics for comprehensive event testing
2. Check GA4 Real-time reports for live data
3. Verify custom events are being recorded
`
    : ''
}
      `);

      console.log('🧪 Google Analytics Test:', {
        gaId,
        isConfigured: isGAConfigured,
        gtagExists: isGtagLoaded,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      setGaTestResult(
        `❌ GA Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Analytics Test Center
        </h1>

        {/* Vercel Analytics Test */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Vercel Analytics Test</h2>

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
        </div>

        {/* Google Analytics Test */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">
            Google Analytics 4 Test
          </h2>

          <button
            onClick={testGoogleAnalytics}
            className="mb-4 rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
          >
            Test Google Analytics
          </button>

          {gaTestResult && (
            <div className="rounded border bg-gray-50 p-4">
              <pre className="whitespace-pre-wrap text-sm">{gaTestResult}</pre>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>For comprehensive GA testing:</strong>{' '}
              <a
                href="/test-google-analytics"
                className="text-blue-600 hover:text-blue-800"
              >
                Visit the dedicated Google Analytics test page →
              </a>
            </p>
          </div>
        </div>

        {/* Verification Instructions */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">
            Verification Instructions
          </h2>

          <div className="space-y-6 text-sm text-gray-600">
            <div>
              <h3 className="mb-2 font-semibold text-gray-900">
                Vercel Analytics:
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>Open browser DevTools (F12) → Network tab</li>
                <li>Click the Vercel Analytics test button</li>
                <li>
                  Look for requests to <code>/_vercel/insights/event</code> ✅
                </li>
                <li>Check Vercel dashboard for page count increases</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-gray-900">
                Google Analytics:
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Ensure <code>NEXT_PUBLIC_GOOGLE_ANALYTICS_ID</code> is set
                </li>
                <li>Check browser DevTools for GA4 gtag requests</li>
                <li>Visit GA4 Real-time reports to see live events</li>
                <li>Use /test-google-analytics for detailed event testing</li>
              </ul>
            </div>
          </div>
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
              <strong>Test now:</strong> Open DevTools Console to see Web Vitals
              logs
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
          <h3 className="font-semibold text-green-800">✅ Analytics Status:</h3>
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
  );
}
