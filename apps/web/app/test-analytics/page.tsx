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
Analytics Test Results:
- Vercel Analytics loaded: ${isLoaded ? '✅ Yes' : '❌ No'}
- Global 'va' function available: ${typeof window !== 'undefined' && window.va ? '✅ Yes' : '❌ No'}
- Event tracked: ✅ Yes (check console for details)
- Time: ${new Date().toLocaleTimeString()}
      `);

      console.log('🧪 Analytics Test:', {
        vaExists: typeof window !== 'undefined' && 'va' in window,
        vaFunction: typeof window !== 'undefined' && window.va,
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      setTestResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
                <li><code>va.vercel-scripts.com</code></li>
                <li><code>/v1/event</code> or <code>/v1/vitals</code></li>
              </ul>
              <li>Check console for any errors</li>
              <li>Verify your Vercel plan supports Analytics</li>
            </ul>
          </div>

          <div className="mt-6 rounded border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <h3 className="font-semibold text-yellow-800">Important Notes:</h3>
            <ul className="mt-2 text-sm text-yellow-700">
              <li>• Vercel Analytics requires a <strong>Pro plan</strong> or higher</li>
              <li>• Analytics may be disabled by ad blockers</li>
              <li>• Data can take 24 hours to appear in dashboard</li>
              <li>• Some browsers block analytics requests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
