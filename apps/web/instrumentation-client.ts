// instrumentation-client.ts - Client-side Sentry initialization for Next.js 15
import * as Sentry from '@sentry/nextjs';

console.log('🔧 Initializing Sentry client-side instrumentation...');
console.log(
  '🔧 NEXT_PUBLIC_SENTRY_DSN:',
  process.env.NEXT_PUBLIC_SENTRY_DSN ? 'SET' : 'NOT SET',
);

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set to 100% in development for testing
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,

  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: false, // Don't mask text in development
      blockAllMedia: false, // Don't block media in development
    }),
  ],

  beforeSend(event) {
    console.log('📤 Sentry client-side event:', event);

    // Add LogRocket session URL to Sentry events
    try {
      // Dynamic import for LogRocket integration (only in browser)
      if (typeof window !== 'undefined') {
        import('./lib/logrocket')
          .then(({ getLogRocketSessionURL }) => {
            getLogRocketSessionURL()
              .then((sessionURL: string) => {
                if (event.extra) {
                  event.extra.logRocketURL = sessionURL;
                } else {
                  event.extra = { logRocketURL: sessionURL };
                }
              })
              .catch(() => {
                // Silently fail if LogRocket is not available
              });
          })
          .catch(() => {
            // Silently fail if LogRocket module is not available
          });
      }
    } catch {
      // Silently fail if dynamic import is not supported
    }

    return event;
  },
});

console.log('✅ Sentry client-side instrumentation initialized');

// Export router transition hook for navigation instrumentation
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
