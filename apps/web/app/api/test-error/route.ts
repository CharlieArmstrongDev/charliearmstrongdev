export async function GET() {
  // This will trigger a server-side error for Sentry testing
  throw new Error('Test server-side error for Sentry integration - API route');
}

export async function POST() {
  // This will also trigger a server-side error for Sentry testing
  throw new Error(
    'Test server-side error for Sentry integration - POST request',
  );
}
