'use client';

import { useState, useEffect } from 'react';
import {
  measurePageLoad,
  analyzeResourcePerformance,
} from '../../lib/web-vitals';

interface PerformanceMetrics {
  pageLoad?: {
    dns: number;
    tcp: number;
    ttfb: number;
    download: number;
    domReady: number;
    windowLoad: number;
  };
  resources?: {
    totalResources: number;
    slowResources: number;
    slowResourceDetails: Array<{
      name: string;
      duration: number;
      size?: number;
      type: string;
    }>;
  };
  webVitals: Array<{
    name: string;
    value: number;
    rating: string;
    timestamp: Date;
  }>;
}

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    webVitals: [],
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Listen for Web Vitals from our tracking
  useEffect(() => {
    const handleWebVital = (event: CustomEvent) => {
      const { name, value, rating } = event.detail;
      setMetrics(prev => ({
        ...prev,
        webVitals: [
          ...prev.webVitals.filter(v => v.name !== name), // Remove duplicate metrics
          { name, value, rating, timestamp: new Date() },
        ],
      }));
    };

    // Listen for custom Web Vitals events
    window.addEventListener('web-vital', handleWebVital as EventListener);

    return () => {
      window.removeEventListener('web-vital', handleWebVital as EventListener);
    };
  }, []);

  const runPerformanceAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const pageLoadMetrics = measurePageLoad('performance-dashboard');
      const resourceMetrics = analyzeResourcePerformance();

      setMetrics(prev => ({
        ...prev,
        pageLoad: pageLoadMetrics,
        resources: resourceMetrics,
      }));
    } catch (error) {
      console.error('Performance analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Performance Dashboard
        </h2>
        <button
          onClick={runPerformanceAnalysis}
          disabled={isAnalyzing}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </div>

      {/* Core Web Vitals */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Core Web Vitals</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.webVitals
            .filter(vital => ['LCP', 'CLS', 'FID', 'INP'].includes(vital.name))
            .map(vital => (
              <div
                key={vital.name}
                className="rounded border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    {vital.name}
                  </span>
                  <span className="text-lg">{getMetricIcon(vital.rating)}</span>
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
              </div>
            ))}
        </div>

        {metrics.webVitals.length === 0 && (
          <div className="rounded border-2 border-dashed border-gray-300 p-8 text-center">
            <p className="text-gray-500">
              Web Vitals will appear here as the page loads and user interacts.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Try navigating around the site or interacting with elements.
            </p>
          </div>
        )}
      </div>

      {/* Additional Metrics */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Additional Metrics</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {metrics.webVitals
            .filter(vital => ['FCP', 'TTFB'].includes(vital.name))
            .map(vital => (
              <div
                key={vital.name}
                className="rounded border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    {vital.name}
                  </span>
                  <span className="text-lg">{getMetricIcon(vital.rating)}</span>
                </div>
                <div
                  className={`text-xl font-bold ${getMetricColor(vital.rating)}`}
                >
                  {vital.value}ms
                </div>
                <div className="text-sm text-gray-500">
                  {vital.rating.replace('-', ' ')}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Page Load Timing */}
      {metrics.pageLoad && (
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold">Page Load Timing</h3>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {Object.entries(metrics.pageLoad).map(([key, value]) => (
              <div key={key} className="rounded border border-gray-200 p-3">
                <div className="text-sm font-medium text-gray-600">
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())}
                </div>
                <div className="text-lg font-bold text-blue-600">{value}ms</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resource Analysis */}
      {metrics.resources && (
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold">Resource Performance</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded border border-gray-200 p-4">
              <div className="text-sm font-medium text-gray-600">
                Total Resources
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {metrics.resources.totalResources}
              </div>
            </div>
            <div className="rounded border border-gray-200 p-4">
              <div className="text-sm font-medium text-gray-600">
                Slow Resources
              </div>
              <div
                className={`text-2xl font-bold ${
                  metrics.resources.slowResources > 0
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}
              >
                {metrics.resources.slowResources}
              </div>
            </div>
          </div>

          {metrics.resources.slowResourceDetails.length > 0 && (
            <div className="mt-4">
              <h4 className="mb-2 font-medium text-gray-700">
                Slow Resources (&gt;1s)
              </h4>
              <div className="space-y-2">
                {metrics.resources.slowResourceDetails.map(
                  (resource, index) => (
                    <div
                      key={index}
                      className="rounded border border-red-200 bg-red-50 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-red-800">
                          {resource.name.split('/').pop()}
                        </span>
                        <span className="text-sm text-red-600">
                          {resource.duration}ms
                        </span>
                      </div>
                      <div className="text-xs text-red-600">
                        Type: {resource.type}
                        {resource.size &&
                          ` • Size: ${Math.round(resource.size / 1024)}KB`}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Performance Tips */}
      <div className="rounded-lg bg-blue-50 p-6">
        <h3 className="mb-3 text-lg font-semibold text-blue-900">
          Performance Monitoring Tips
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            • <strong>LCP (Largest Contentful Paint):</strong> Should be
            &lt;2.5s
          </li>
          <li>
            • <strong>FID/INP (Interaction):</strong> Should be &lt;100ms/200ms
          </li>
          <li>
            • <strong>CLS (Cumulative Layout Shift):</strong> Should be &lt;0.1
          </li>
          <li>
            • <strong>FCP (First Contentful Paint):</strong> Should be &lt;1.8s
          </li>
          <li>
            • <strong>TTFB (Time to First Byte):</strong> Should be &lt;800ms
          </li>
        </ul>
      </div>
    </div>
  );
}
