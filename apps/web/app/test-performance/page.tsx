'use client';

import { useState, useEffect } from 'react';
import { initializeWebVitals } from '../../lib/web-vitals';
import { trpc } from '../../lib/trpc/provider';
import { trackPerformance } from '../../lib/analytics/google-analytics';

interface WebVitalData {
  name: string;
  value: number;
  rating: string;
  timestamp: Date;
}

export default function TestPerformancePage() {
  const [testResults, setTestResults] = useState<string>('');
  const [webVitalsData, setWebVitalsData] = useState<WebVitalData[]>([]);
  // Handle client-side only code
  useEffect(() => {
    // Initialize Web Vitals tracking
    initializeWebVitals();

    // Listen for Web Vitals events
    const handleWebVital = (event: CustomEvent) => {
      const { name, value, rating } = event.detail;
      setWebVitalsData(prev => [
        ...prev.filter(v => v.name !== name), // Remove duplicates
        { name, value, rating, timestamp: new Date() },
      ]);
    };

    window.addEventListener('web-vital', handleWebVital as EventListener);

    return () => {
      window.removeEventListener('web-vital', handleWebVital as EventListener);
    };
  }, []);

  const { data: thresholds } = trpc.monitoring.webVitalsThresholds.useQuery();
  const performanceReportMutation =
    trpc.monitoring.performanceReport.useMutation();

  const runPerformanceTest = () => {
    try {
      // Simulate performance metrics collection
      const testMetrics = [
        { metric: 'LCP', value: 2800, rating: 'needs-improvement' },
        { metric: 'FID', value: 120, rating: 'needs-improvement' },
        { metric: 'CLS', value: 0.15, rating: 'needs-improvement' },
        { metric: 'FCP', value: 1600, rating: 'good' },
        { metric: 'TTFB', value: 900, rating: 'needs-improvement' },
      ];

      // Report each metric
      testMetrics.forEach(({ metric, value, rating }) => {
        performanceReportMutation.mutate({
          metric: metric as 'LCP' | 'FID' | 'INP' | 'CLS' | 'FCP' | 'TTFB',
          value,
          rating: rating as 'good' | 'needs-improvement' | 'poor',
          page: '/test-performance',
        });
      });

      setTestResults(`
✅ Performance Test Completed!

Test Metrics Sent:
${testMetrics
  .map(
    m =>
      `- ${m.metric}: ${m.value}${m.metric === 'CLS' ? '' : 'ms'} (${m.rating})`,
  )
  .join('\n')}

✅ What this test does:
- Simulates various Web Vitals metrics
- Sends data to monitoring system
- Tests alert thresholds
- Verifies Sentry integration for poor metrics

Check your browser console for Web Vitals logs!
Time: ${new Date().toLocaleTimeString()}
      `);

      console.log('🧪 Performance Test:', {
        testMetrics,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      setTestResults(
        `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      console.error('Performance test failed:', error);
    }
  };

  const simulateSlowLCP = () => {
    // Simulate poor LCP by tracking a fake metric
    const slowLCP = 4500; // 4.5 seconds (poor)
    trackPerformance('LCP', slowLCP);
    console.log(
      '🔴 Simulated poor LCP:',
      slowLCP + 'ms (should trigger alert)',
    );

    // Update test results
    setTestResults(
      prev =>
        prev + `\n🔴 Simulated poor LCP: ${slowLCP}ms (should trigger alert)`,
    );
  };

  const simulateSlowFID = () => {
    // Simulate poor FID
    const slowFID = 350; // 350ms (poor)
    trackPerformance('FID', slowFID);
    console.log(
      '🔴 Simulated poor FID:',
      slowFID + 'ms (should trigger alert)',
    );

    setTestResults(
      prev =>
        prev + `\n🔴 Simulated poor FID: ${slowFID}ms (should trigger alert)`,
    );
  };

  const simulateHighCLS = () => {
    // Simulate poor CLS
    const highCLS = 0.3; // 0.3 (poor)
    trackPerformance('CLS', highCLS);
    console.log('🔴 Simulated poor CLS:', highCLS + ' (should trigger alert)');

    setTestResults(
      prev =>
        prev + `\n🔴 Simulated poor CLS: ${highCLS} (should trigger alert)`,
    );
  };

  const simulateGoodMetrics = () => {
    // Simulate good metrics
    const goodLCP = 1800;
    const goodFID = 80;
    const goodCLS = 0.05;

    trackPerformance('LCP', goodLCP);
    trackPerformance('FID', goodFID);
    trackPerformance('CLS', goodCLS);

    console.log('🟢 Simulated good metrics:', {
      LCP: goodLCP,
      FID: goodFID,
      CLS: goodCLS,
    });

    setTestResults(
      prev =>
        prev +
        `\n🟢 Simulated good LCP: ${goodLCP}ms\n🟢 Simulated good FID: ${goodFID}ms\n🟢 Simulated good CLS: ${goodCLS}`,
    );
  };

  const simulateNeedsImprovementMetrics = () => {
    // Simulate metrics that need improvement (not good, not poor)
    const slowButNotPoorLCP = 3200; // Between 2.5s (good) and 4s (poor)
    const slowButNotPoorFID = 200; // Between 100ms (good) and 300ms (poor)
    const mediumCLS = 0.18; // Between 0.1 (good) and 0.25 (poor)

    trackPerformance('LCP', slowButNotPoorLCP);
    trackPerformance('FID', slowButNotPoorFID);
    trackPerformance('CLS', mediumCLS);

    console.log('🟡 Simulated needs improvement metrics:', {
      LCP: slowButNotPoorLCP,
      FID: slowButNotPoorFID,
      CLS: mediumCLS,
    });

    setTestResults(
      prev =>
        prev +
        `\n🟡 Simulated needs improvement LCP: ${slowButNotPoorLCP}ms\n🟡 Simulated needs improvement FID: ${slowButNotPoorFID}ms\n🟡 Simulated needs improvement CLS: ${mediumCLS}`,
    );
  };

  const clearResults = () => {
    setTestResults('');
  };

  const getMetricColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-600';
      case 'needs-improvement':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getMetricIcon = (rating: string) => {
    switch (rating) {
      case 'good':
        return '🟢';
      case 'needs-improvement':
        return '🟡';
      case 'poor':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const testSentryDirectly = async () => {
    try {
      const Sentry = await import('@sentry/nextjs');

      // Test critical alert
      Sentry.captureMessage(
        'Performance Alert: LCP performance critical - 4500ms',
        {
          level: 'error',
          tags: {
            test: 'manual',
            component: 'test-performance',
          },
        },
      );

      // Test warning alert
      Sentry.captureMessage(
        'Performance Alert: FID performance warning - 250ms',
        {
          level: 'warning',
          tags: {
            test: 'manual',
            component: 'test-performance',
          },
        },
      );

      console.log('🧪 Direct Sentry test messages sent');
      setTestResults(
        prev =>
          prev +
          '\n🧪 Direct Sentry test messages sent - check Sentry dashboard',
      );
    } catch (error) {
      console.error('❌ Sentry test failed:', error);
      setTestResults(
        prev => prev + '\n❌ Sentry test failed: ' + (error as Error).message,
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Performance Monitoring Test
        </h1>

        {/* Test Controls */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Performance Test</h2>

          <div className="mb-4 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            <button
              onClick={simulateSlowLCP}
              className="rounded-lg bg-red-600 px-4 py-3 text-white transition-colors hover:bg-red-700"
            >
              🔴 Simulate Poor LCP
            </button>
            <button
              onClick={simulateSlowFID}
              className="rounded-lg bg-red-600 px-4 py-3 text-white transition-colors hover:bg-red-700"
            >
              🔴 Simulate Poor FID
            </button>
            <button
              onClick={simulateHighCLS}
              className="rounded-lg bg-red-600 px-4 py-3 text-white transition-colors hover:bg-red-700"
            >
              🔴 Simulate Poor CLS
            </button>
            <button
              onClick={simulateGoodMetrics}
              className="rounded-lg bg-green-600 px-4 py-3 text-white transition-colors hover:bg-green-700"
            >
              🟢 Simulate Good Metrics
            </button>
            <button
              onClick={simulateNeedsImprovementMetrics}
              className="rounded-lg bg-yellow-600 px-4 py-3 text-white transition-colors hover:bg-yellow-700"
            >
              🟡 Simulate Needs Improvement
            </button>
          </div>

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <button
              onClick={runPerformanceTest}
              className="rounded-lg bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700"
            >
              Run Real Performance Test
            </button>
            <button
              onClick={testSentryDirectly}
              className="rounded-lg bg-purple-600 px-4 py-3 text-white transition-colors hover:bg-purple-700"
            >
              🧪 Test Sentry Directly
            </button>
          </div>

          <div className="mb-4 grid gap-4 md:grid-cols-2">
            <button
              onClick={clearResults}
              className="rounded-lg bg-gray-600 px-4 py-3 text-white transition-colors hover:bg-gray-700"
            >
              🗑️ Clear Results
            </button>
          </div>

          <button
            onClick={simulateSlowLCP}
            className="mb-4 rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700"
          >
            Simulate Slow LCP
          </button>

          <button
            onClick={simulateSlowFID}
            className="mb-4 rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700"
          >
            Simulate Slow FID
          </button>

          <button
            onClick={simulateHighCLS}
            className="mb-4 rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700"
          >
            Simulate High CLS
          </button>

          <button
            onClick={simulateGoodMetrics}
            className="mb-4 rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
          >
            Simulate Good Metrics
          </button>

          <button
            onClick={clearResults}
            className="mb-4 rounded-lg bg-gray-300 px-6 py-3 text-gray-800 transition-colors hover:bg-gray-400"
          >
            Clear Results
          </button>

          {testResults && (
            <div className="rounded border bg-gray-50 p-4">
              <pre className="whitespace-pre-wrap text-sm">{testResults}</pre>
            </div>
          )}
        </div>

        {/* Live Web Vitals */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Live Web Vitals</h2>

          {webVitalsData.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {webVitalsData.map(vital => (
                <div
                  key={vital.name}
                  className="rounded border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      {vital.name}
                    </span>
                    <span className="text-lg">
                      {getMetricIcon(vital.rating)}
                    </span>
                  </div>
                  <div
                    className={`text-xl font-bold ${getMetricColor(vital.rating)}`}
                  >
                    {vital.value}
                    {vital.name === 'CLS' ? '' : 'ms'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {vital.rating.replace('-', ' ')}
                  </div>
                  <div className="text-xs text-gray-400">
                    {vital.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-500">
                Web Vitals will appear here as the page loads.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Navigate around the site or reload the page to see metrics.
              </p>
            </div>
          )}
        </div>

        {/* Thresholds Reference */}
        {thresholds && (
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">
              Performance Thresholds
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(thresholds).map(([metric, values]) => (
                <div key={metric} className="rounded border p-4">
                  <h3 className="font-semibold text-gray-900">{metric}</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-600">Good:</span>
                      <span>
                        &lt;{values.good}
                        {metric === 'CLS' ? '' : 'ms'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-600">Needs Work:</span>
                      <span>
                        &lt;{values.needsImprovement}
                        {metric === 'CLS' ? '' : 'ms'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Poor:</span>
                      <span>
                        &gt;{values.needsImprovement}
                        {metric === 'CLS' ? '' : 'ms'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-blue-900">
            How to Test Performance Monitoring
          </h2>
          <div className="space-y-4 text-blue-800">
            <div>
              <h3 className="font-semibold">1. Run the Performance Test:</h3>
              <p className="text-sm">
                Click the test button to simulate various performance metrics
                and see how alerts are handled.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">2. View Live Metrics:</h3>
              <p className="text-sm">
                Navigate around the site or reload pages to see real Web Vitals
                data being collected.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">3. Check Console:</h3>
              <p className="text-sm">
                Open browser DevTools to see detailed Web Vitals logging and
                performance alerts.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">4. Monitor Dashboard:</h3>
              <p className="text-sm">
                Visit{' '}
                <a
                  href="/monitoring/performance"
                  className="text-blue-600 underline"
                >
                  /monitoring/performance
                </a>{' '}
                for the complete performance dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
