import * as Sentry from '@sentry/nextjs';

export async function GET() {
  console.log('🔥 Test server error GET endpoint called');

  // Capture the error explicitly with Sentry
  const error = new Error(
    'Test server-side error for Sentry integration - API route GET',
  );
  Sentry.captureException(error);
  console.error('🚨 Server error captured:', error.message);

  // Also throw it to trigger Next.js error handling
  throw error;
}

export async function POST() {
  console.log('🔥 Test server error POST endpoint called');

  // Capture the error explicitly with Sentry
  const error = new Error(
    'Test server-side error for Sentry integration - API route POST',
  );
  Sentry.captureException(error);
  console.error('🚨 Server error captured:', error.message);

  // Also throw it to trigger Next.js error handling
  throw error;
}
