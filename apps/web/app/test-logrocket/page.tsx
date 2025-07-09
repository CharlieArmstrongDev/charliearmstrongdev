'use client';

import { useState } from 'react';
import {
  trackLogRocketEvent,
  getLogRocketSessionURL,
} from '../../lib/logrocket';

export default function TestLogRocket() {
  const [sessionURL, setSessionURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [eventStatus, setEventStatus] = useState<string>('');

  const handleTestEvent = () => {
    try {
      trackLogRocketEvent('test-button-click', {
        page: 'test-logrocket',
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      });
      setEventStatus(
        '✅ Event tracked successfully! Check console for details.',
      );
      
      // Clear the status after 3 seconds
      setTimeout(() => setEventStatus(''), 3000);
    } catch (error) {
      setEventStatus('❌ Event tracking failed. Check console for details.');
      console.error('Event tracking error:', error);
    }
  };

  const handleGetSessionURL = async () => {
    setIsLoading(true);
    try {
      const url = await getLogRocketSessionURL();
      setSessionURL(url);
    } catch (error) {
      console.error('Error getting LogRocket session URL:', error);
      setSessionURL('Error: LogRocket may not be initialized');
    }
    setIsLoading(false);
  };

  const handleTestError = () => {
    // Test both LogRocket and Sentry integration
    trackLogRocketEvent('test-error-triggered', {
      page: 'test-logrocket',
      intentional: true,
    });

    // Throw an error to test Sentry integration with LogRocket session URL
    throw new Error('Test error for Sentry + LogRocket integration');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            LogRocket Integration Test
          </h1>

          <div className="space-y-6">
            <div className="rounded-lg bg-blue-50 p-6">
              <h2 className="mb-4 text-xl font-semibold text-blue-900">
                Test LogRocket Event Tracking
              </h2>
              <p className="mb-4 text-blue-700">
                Click the button below to track a custom event in LogRocket.
              </p>
              <button
                onClick={handleTestEvent}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Track Test Event
              </button>
              {eventStatus && (
                <div className="mt-4 rounded border bg-white p-4">
                  <p className="text-sm">{eventStatus}</p>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-green-50 p-6">
              <h2 className="mb-4 text-xl font-semibold text-green-900">
                Get LogRocket Session URL
              </h2>
              <p className="mb-4 text-green-700">
                Get the current LogRocket session URL (useful for support
                tickets).
              </p>
              <button
                onClick={handleGetSessionURL}
                disabled={isLoading}
                className="rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Get Session URL'}
              </button>
              {sessionURL && (
                <div className="mt-4 rounded border bg-white p-4">
                  <p className="text-sm text-gray-600">Session URL:</p>
                  <p className="break-all text-sm text-blue-600">
                    {sessionURL}
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-red-50 p-6">
              <h2 className="mb-4 text-xl font-semibold text-red-900">
                Test Sentry + LogRocket Integration
              </h2>
              <p className="mb-4 text-red-700">
                This will trigger an error to test the Sentry integration with
                LogRocket session URL.
              </p>
              <button
                onClick={handleTestError}
                className="rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
              >
                Trigger Test Error
              </button>
            </div>

            <div className="rounded-lg bg-yellow-50 p-6">
              <h2 className="mb-4 text-xl font-semibold text-yellow-900">
                Console Instructions
              </h2>
              <p className="mb-2 text-yellow-700">
                Open the browser console to see LogRocket status messages. You
                should see:
              </p>
              <ul className="list-inside list-disc space-y-1 text-sm text-yellow-600">
                <li>LogRocket initialization message</li>
                <li>Event tracking confirmations</li>
                <li>Any error messages if LogRocket is not configured</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
