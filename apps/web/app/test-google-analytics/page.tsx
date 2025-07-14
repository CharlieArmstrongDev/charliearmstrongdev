'use client';

import { useState, useEffect } from 'react';
import {
  trackBlogView,
  trackProjectView,
  trackContactSubmission,
  trackExternalLink,
  trackDownload,
  trackSearch,
  trackUserAuth,
  trackError,
  trackPerformance,
} from '../../lib/analytics/google-analytics';

export default function TestGoogleAnalyticsPage() {
  const [eventStatus, setEventStatus] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    userAgent: 'Loading...',
    pageUrl: 'Loading...',
    referrer: 'Loading...',
    screenResolution: 'Loading...',
    gtagAvailable: false,
  });

  const handleTestEvent = (eventName: string, eventFunction: () => void) => {
    try {
      eventFunction();
      setEventStatus(`✅ ${eventName} event sent successfully!`);
      setTimeout(() => setEventStatus(''), 3000);
    } catch (error) {
      setEventStatus(`❌ Error sending ${eventName} event: ${error}`);
      setTimeout(() => setEventStatus(''), 5000);
    }
  };

  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  const isGAConfigured = !!gaId;

  // Handle client-side only code to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setClientInfo({
      userAgent: navigator.userAgent,
      pageUrl: window.location.href,
      referrer: document.referrer || 'Direct',
      screenResolution: `${screen.width}x${screen.height}`,
      gtagAvailable: 'gtag' in window,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Google Analytics 4 Test Page
          </h1>

          {/* Configuration Status */}
          <div className="mb-8 rounded-lg bg-blue-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-blue-900">
              Configuration Status
            </h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span
                  className={isGAConfigured ? 'text-green-600' : 'text-red-600'}
                >
                  {isGAConfigured ? '✅' : '❌'}
                </span>
                <span className="text-gray-700">
                  Google Analytics ID: {gaId || 'Not configured'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={
                    isClient && clientInfo.gtagAvailable
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {isClient && clientInfo.gtagAvailable ? '✅' : '❌'}
                </span>
                <span className="text-gray-700">
                  gtag function available:{' '}
                  {isClient
                    ? clientInfo.gtagAvailable
                      ? 'Yes'
                      : 'No'
                    : 'Loading...'}
                </span>
              </div>
            </div>
          </div>

          {/* Setup Instructions */}
          {!isGAConfigured && (
            <div className="mb-8 rounded-lg bg-yellow-50 p-6">
              <h2 className="mb-4 text-xl font-semibold text-yellow-900">
                Setup Required
              </h2>
              <div className="space-y-2 text-sm text-yellow-800">
                <p>To test Google Analytics, you need to:</p>
                <ol className="ml-4 list-inside list-decimal space-y-1">
                  <li>Create a Google Analytics 4 property</li>
                  <li>Copy your Measurement ID (starts with G-)</li>
                  <li>
                    Add it to your .env.local file as
                    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
                  </li>
                  <li>Restart your development server</li>
                </ol>
              </div>
            </div>
          )}

          {/* Event Status */}
          {eventStatus && (
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-700">{eventStatus}</p>
            </div>
          )}

          {/* Test Events */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Test Events
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Blog View Event */}
              <button
                onClick={() =>
                  handleTestEvent('Blog View', () =>
                    trackBlogView('test-post', 'Test Blog Post'),
                  )
                }
                className="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={!isGAConfigured}
              >
                Test Blog View
              </button>

              {/* Project View Event */}
              <button
                onClick={() =>
                  handleTestEvent('Project View', () =>
                    trackProjectView('test-project', 'web-app'),
                  )
                }
                className="rounded-lg bg-green-600 px-4 py-3 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                disabled={!isGAConfigured}
              >
                Test Project View
              </button>

              {/* Contact Form Event */}
              <button
                onClick={() =>
                  handleTestEvent('Contact Form', () =>
                    trackContactSubmission('test-form'),
                  )
                }
                className="rounded-lg bg-purple-600 px-4 py-3 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                disabled={!isGAConfigured}
              >
                Test Contact Form
              </button>

              {/* External Link Event */}
              <button
                onClick={() =>
                  handleTestEvent('External Link', () =>
                    trackExternalLink('https://example.com', 'Test Link'),
                  )
                }
                className="rounded-lg bg-red-600 px-4 py-3 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                disabled={!isGAConfigured}
              >
                Test External Link
              </button>

              {/* Download Event */}
              <button
                onClick={() =>
                  handleTestEvent('Download', () =>
                    trackDownload('test-file.pdf', 'pdf'),
                  )
                }
                className="rounded-lg bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={!isGAConfigured}
              >
                Test Download
              </button>

              {/* Search Event */}
              <button
                onClick={() =>
                  handleTestEvent('Search', () => trackSearch('test query', 5))
                }
                className="rounded-lg bg-pink-600 px-4 py-3 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                disabled={!isGAConfigured}
              >
                Test Search
              </button>

              {/* Auth Event */}
              <button
                onClick={() =>
                  handleTestEvent('User Auth', () => trackUserAuth('login'))
                }
                className="rounded-lg bg-yellow-600 px-4 py-3 text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                disabled={!isGAConfigured}
              >
                Test User Login
              </button>

              {/* Error Event */}
              <button
                onClick={() =>
                  handleTestEvent('Error', () =>
                    trackError('test-error', 'This is a test error message'),
                  )
                }
                className="rounded-lg bg-orange-600 px-4 py-3 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                disabled={!isGAConfigured}
              >
                Test Error Event
              </button>

              {/* Performance Event */}
              <button
                onClick={() =>
                  handleTestEvent('Performance', () =>
                    trackPerformance('page_load_time', 1234, 'ms'),
                  )
                }
                className="rounded-lg bg-teal-600 px-4 py-3 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                disabled={!isGAConfigured}
              >
                Test Performance
              </button>
            </div>
          </div>

          {/* Verification Instructions */}
          <div className="mt-8 rounded-lg bg-green-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-green-900">
              Verification Instructions
            </h2>
            <div className="space-y-3 text-sm text-green-800">
              <div>
                <h3 className="font-semibold">Real-time Reports:</h3>
                <p>
                  Go to Google Analytics → Reports → Realtime to see events in
                  real-time
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Event Details:</h3>
                <p>Events → All events to see custom event tracking</p>
              </div>
              <div>
                <h3 className="font-semibold">Custom Parameters:</h3>
                <p>
                  Configure custom dimensions in GA4 to see custom parameters
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Browser DevTools:</h3>
                <p>
                  Open Network tab and filter by &apos;google-analytics&apos; to
                  see event requests
                </p>
              </div>
            </div>
          </div>

          {/* Debug Information */}
          <div className="mt-8 rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Debug Information
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>User Agent:</strong>{' '}
                {isClient ? clientInfo.userAgent : 'Loading...'}
              </p>
              <p>
                <strong>Page URL:</strong>{' '}
                {isClient ? clientInfo.pageUrl : 'Loading...'}
              </p>
              <p>
                <strong>Referrer:</strong>{' '}
                {isClient ? clientInfo.referrer : 'Loading...'}
              </p>
              <p>
                <strong>Screen Resolution:</strong>{' '}
                {isClient ? clientInfo.screenResolution : 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
