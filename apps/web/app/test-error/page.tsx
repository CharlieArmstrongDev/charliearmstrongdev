'use client';

import { useState } from 'react';

export default function TestErrorPage() {
  const [shouldError, setShouldError] = useState(false);

  // This will trigger a client-side error
  const triggerClientError = () => {
    throw new Error('Test client-side error for Sentry integration');
  }; // This will trigger a server-side error via API route
  const triggerServerError = () => {
    fetch('/api/test-error', {
      method: 'POST',
    })
      .then(response => {
        if (!response.ok) {
          console.error('Server error triggered successfully');
          alert('Server error triggered - check your Sentry dashboard!');
        }
      })
      .catch(error => {
        console.error('Server error triggered:', error);
        alert('Server error triggered - check your Sentry dashboard!');
      });
  };

  if (shouldError) {
    triggerClientError();
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Sentry Error Testing
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Client-Side Error Test
            </h2>
            <p className="mb-3 text-sm text-gray-600">
              This will trigger a client-side error that should be caught by the
              ErrorBoundary and reported to Sentry.
            </p>
            <button
              onClick={() => setShouldError(true)}
              className="w-full rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
            >
              Trigger Client Error
            </button>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Server-Side Error Test
            </h2>
            <p className="mb-3 text-sm text-gray-600">
              This will trigger a server-side error via tRPC that should be
              reported to Sentry.
            </p>
            <button
              onClick={triggerServerError}
              className="w-full rounded-md bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
            >
              Trigger Server Error
            </button>
          </div>

          <div className="pt-4">
            <a
              href="/"
              className="block w-full rounded-md bg-gray-200 px-4 py-2 text-center text-gray-800 transition-colors hover:bg-gray-300"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
