'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Something went wrong!
              </h2>
              <p className="mb-4 text-gray-600">
                We apologize for the inconvenience. An error has occurred and
                has been reported to our team.
              </p>

              {error.digest && (
                <p className="mb-4 text-sm text-gray-500">
                  Error ID:{' '}
                  <code className="rounded bg-gray-100 px-2 py-1">
                    {error.digest}
                  </code>
                </p>
              )}

              <div className="space-y-3">
                <button
                  onClick={reset}
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Try again
                </button>

                <button
                  onClick={() => (window.location.href = '/')}
                  className="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
