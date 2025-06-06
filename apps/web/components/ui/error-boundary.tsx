'use client';

import React from 'react';
import * as Sentry from '@sentry/nextjs';

interface ErrorBoundaryState {
  hasError: boolean;
  eventId: string | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: Error;
    eventId: string | null;
    resetErrorBoundary: () => void;
  }>;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, eventId: null };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true, eventId: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to Sentry and get the event ID
    const eventId = Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });

    this.setState({ eventId });
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, eventId: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={new Error('Something went wrong')}
          eventId={this.state.eventId}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

// Default error fallback component
interface ErrorFallbackProps {
  error: Error;
  eventId: string | null;
  resetErrorBoundary: () => void;
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error: _error,
  eventId,
  resetErrorBoundary,
}) => {
  // Suppress unused variable warning - _error is intentionally unused in default fallback
  void _error;
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="mb-4 text-gray-600">
            We apologize for the inconvenience. An error has occurred and has
            been reported to our team.
          </p>

          {eventId && (
            <p className="mb-4 text-sm text-gray-500">
              Error ID:{' '}
              <code className="rounded bg-gray-100 px-2 py-1">{eventId}</code>
            </p>
          )}

          <div className="space-y-3">
            <button
              onClick={resetErrorBoundary}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Try Again
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
  );
};

export default ErrorBoundary;
