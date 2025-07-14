import PerformanceDashboard from '../../../components/monitoring/PerformanceDashboard';

export default function PerformanceMonitoringPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Performance Monitoring
        </h1>

        <div className="space-y-6">
          <PerformanceDashboard />

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">
              About Performance Monitoring
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                This dashboard monitors Core Web Vitals and performance metrics
                for optimal user experience. The metrics are collected in
                real-time and include:
              </p>

              <ul className="list-inside list-disc space-y-2">
                <li>
                  <strong>LCP (Largest Contentful Paint):</strong> Time until
                  the largest element is rendered (target: &lt;2.5s)
                </li>
                <li>
                  <strong>FID/INP (First Input Delay/Interaction):</strong> Time
                  from user interaction to browser response (target:
                  &lt;100ms/200ms)
                </li>
                <li>
                  <strong>CLS (Cumulative Layout Shift):</strong> Visual
                  stability score (target: &lt;0.1)
                </li>
                <li>
                  <strong>FCP (First Contentful Paint):</strong> Time until
                  first content appears (target: &lt;1.8s)
                </li>
                <li>
                  <strong>TTFB (Time to First Byte):</strong> Server response
                  time (target: &lt;800ms)
                </li>
              </ul>

              <div className="mt-6">
                <h3 className="mb-2 font-semibold">Alert Thresholds:</h3>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  <li>🟢 Good: All metrics within optimal ranges</li>
                  <li>🟡 Needs Improvement: Some metrics approaching limits</li>
                  <li>🔴 Poor: Metrics exceeding recommended thresholds</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 font-semibold">External Tools:</h3>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  <li>
                    <a
                      href="https://pagespeed.web.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      PageSpeed Insights
                    </a>{' '}
                    - Google&apos;s performance analysis tool
                  </li>
                  <li>
                    <a
                      href="https://web.dev/measure/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Web.dev Measure
                    </a>{' '}
                    - Comprehensive performance audit
                  </li>
                  <li>
                    <strong>Vercel Speed Insights:</strong> Available in Vercel
                    dashboard for deployed applications
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
