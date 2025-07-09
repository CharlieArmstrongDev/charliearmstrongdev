import RedisMonitoringDashboard from '../../../components/monitoring/RedisMonitoringDashboard';

export default function RedisMonitoringPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Redis Monitoring Dashboard
        </h1>

        <div className="space-y-6">
          <RedisMonitoringDashboard />

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">
              About Redis Monitoring
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                This dashboard monitors the health and performance of your Redis
                (Vercel KV) database. The metrics are updated in real-time and
                include:
              </p>

              <ul className="list-inside list-disc space-y-2">
                <li>
                  <strong>Connection Status:</strong> Whether Redis is reachable
                  and responding
                </li>
                <li>
                  <strong>Response Time:</strong> How long operations take
                  (target: &lt;50ms)
                </li>
                <li>
                  <strong>Key Count:</strong> Total number of keys in the
                  database
                </li>
                <li>
                  <strong>Error Rate:</strong> Percentage of failed operations
                </li>
              </ul>

              <div className="mt-6">
                <h3 className="mb-2 font-semibold">Alert Thresholds:</h3>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  <li>🟢 Good: Response time &lt;50ms, Error rate &lt;1%</li>
                  <li>🟡 Warning: Response time 50-100ms, Error rate 1-10%</li>
                  <li>
                    🔴 Critical: Response time &gt;100ms, Error rate &gt;10%
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
