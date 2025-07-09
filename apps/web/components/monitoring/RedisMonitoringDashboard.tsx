'use client';

import { useState, useEffect } from 'react';
import { trpc } from '../../lib/trpc/provider';
import type { RedisMetrics } from '../../lib/monitoring/redis';

export default function RedisMonitoringDashboard() {
  const [metrics, setMetrics] = useState<RedisMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const {
    data: redisMetrics,
    refetch,
    isLoading: queryLoading,
  } = trpc.monitoring.redis.useQuery();

  useEffect(() => {
    if (redisMetrics) {
      // Convert lastCheck from string to Date if needed
      const metricsWithDate = {
        ...redisMetrics,
        lastCheck:
          typeof redisMetrics.lastCheck === 'string'
            ? new Date(redisMetrics.lastCheck)
            : redisMetrics.lastCheck,
      };
      setMetrics(metricsWithDate);
      setLastUpdate(new Date());
      setIsLoading(false);
    }
  }, [redisMetrics]);

  const refreshMetrics = async () => {
    setIsLoading(true);
    await refetch();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime < 50) return 'text-green-600';
    if (responseTime < 100) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading && !metrics) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Redis Monitoring</h2>
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading metrics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Redis Monitoring</h2>
        <button
          onClick={refreshMetrics}
          disabled={queryLoading}
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {queryLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {metrics && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Connection Status */}
          <div className="rounded border p-4">
            <div className="text-sm text-gray-500">Connection Status</div>
            <div
              className={`text-lg font-semibold ${getStatusColor(metrics.connectionStatus)}`}
            >
              {metrics.connectionStatus.charAt(0).toUpperCase() +
                metrics.connectionStatus.slice(1)}
            </div>
          </div>

          {/* Response Time */}
          <div className="rounded border p-4">
            <div className="text-sm text-gray-500">Response Time</div>
            <div
              className={`text-lg font-semibold ${getResponseTimeColor(metrics.responseTime)}`}
            >
              {metrics.responseTime}ms
            </div>
          </div>

          {/* Key Count */}
          <div className="rounded border p-4">
            <div className="text-sm text-gray-500">Key Count</div>
            <div className="text-lg font-semibold text-blue-600">
              {metrics.keyCount !== undefined
                ? metrics.keyCount.toLocaleString()
                : 'N/A'}
            </div>
          </div>

          {/* Error Rate */}
          <div className="rounded border p-4">
            <div className="text-sm text-gray-500">Error Rate</div>
            <div
              className={`text-lg font-semibold ${
                metrics.errorRate === 0
                  ? 'text-green-600'
                  : metrics.errorRate < 0.1
                    ? 'text-yellow-600'
                    : 'text-red-600'
              }`}
            >
              {(metrics.errorRate * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      {lastUpdate && (
        <div className="mt-4 text-sm text-gray-500">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      )}

      {/* Health Status Indicator */}
      <div className="mt-4 flex items-center space-x-2">
        <div
          className={`size-3 rounded-full ${
            metrics?.connectionStatus === 'connected'
              ? 'bg-green-500'
              : metrics?.connectionStatus === 'disconnected'
                ? 'bg-yellow-500'
                : 'bg-red-500'
          }`}
        />
        <span className="text-sm">
          {metrics?.connectionStatus === 'connected'
            ? 'System Healthy'
            : metrics?.connectionStatus === 'disconnected'
              ? 'System Warning'
              : 'System Error'}
        </span>
      </div>
    </div>
  );
}
