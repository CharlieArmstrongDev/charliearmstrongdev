// instrumentation.ts - New Next.js 15 approach for Sentry
export async function register() {
  console.log('🔧 Registering Sentry server-side instrumentation...');
  console.log('🔧 NEXT_RUNTIME:', process.env.NEXT_RUNTIME);
  console.log('🔧 SENTRY_DSN:', process.env.SENTRY_DSN ? 'SET' : 'NOT SET');

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side initialization
    console.log('🔧 Initializing Sentry for Node.js runtime...');
    const { init } = await import('@sentry/nextjs');

    init({
      dsn: process.env.SENTRY_DSN,

      // Set to 100% in development for testing
      tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,

      // Enable debug in development
      debug: process.env.NODE_ENV === 'development',

      beforeSend(event) {
        console.log('📤 Sentry server-side event:', event);
        // LogRocket integration is handled on client-side
        return event;
      },

      // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
      // spotlight: process.env.NODE_ENV === 'development',
    });

    console.log('✅ Sentry Node.js runtime initialized');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime initialization
    console.log('🔧 Initializing Sentry for Edge runtime...');
    const { init } = await import('@sentry/nextjs');

    init({
      dsn: process.env.SENTRY_DSN,

      // Set to 100% in development for testing
      tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,

      // Enable debug in development
      debug: process.env.NODE_ENV === 'development',

      beforeSend(event) {
        console.log('📤 Sentry edge event:', event);
        return event;
      },
    });

    console.log('✅ Sentry Edge runtime initialized');
  }
}

export const onRequestError = async (
  err: unknown,
  request: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  context: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const { captureRequestError } = await import('@sentry/nextjs');
  captureRequestError(err, request, context);
};
