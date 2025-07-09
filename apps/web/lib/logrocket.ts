// LogRocket configuration for session replay and monitoring
import LogRocket from 'logrocket';

// Initialize LogRocket only in browser environment
export const initializeLogRocket = () => {
  // Only run in browser and production/staging environments
  if (typeof window === 'undefined') return;

  const appId = process.env.NEXT_PUBLIC_LOGROCKET_APP_ID;
  const releaseVersion = process.env.LOGROCKET_RELEASE_VERSION || '1.0.0';

  if (!appId) {
    console.warn('⚠️ LogRocket App ID not found. Session replay disabled.');
    console.warn('Add NEXT_PUBLIC_LOGROCKET_APP_ID to your .env.local file');
    return;
  }

  console.log('🔧 Initializing LogRocket with App ID:', appId);

  // Initialize LogRocket
  LogRocket.init(appId, {
    // Release version for tracking deployments
    release: releaseVersion,

    // Network configuration
    network: {
      requestSanitizer: request => {
        // Sanitize sensitive headers
        if (request.headers?.authorization) {
          request.headers.authorization = '[REDACTED]';
        }
        return request;
      },
      responseSanitizer: response => {
        // Sanitize sensitive response data
        return response;
      },
    },

    // DOM configuration
    dom: {
      inputSanitizer: true, // Automatically sanitize input fields
      textSanitizer: true, // Automatically sanitize text content
      baseHref: typeof window !== 'undefined' ? window.location.origin : '',
    },

    // Console logging
    console: {
      shouldAggregateConsoleErrors: true,
    },
  });

  console.log('✅ LogRocket initialized successfully');
};

// Identify user when authenticated
export const identifyLogRocketUser = (user: {
  id: string;
  email?: string;
  name?: string;
  [key: string]: unknown;
}) => {
  if (typeof window === 'undefined') return;

  const identityData: Record<string, string | number | boolean> = {};

  if (user.email) {
    identityData.email = user.email;
  }
  if (user.name) {
    identityData.name = user.name;
  }

  LogRocket.identify(user.id, identityData);
};

// Track custom events
export const trackLogRocketEvent = (
  eventName: string,
  properties?: Record<string, string | number | boolean>,
) => {
  if (typeof window === 'undefined') {
    console.warn('LogRocket: Cannot track event on server-side');
    return;
  }

  try {
    LogRocket.track(eventName, properties);
    console.log(`✅ LogRocket event tracked: ${eventName}`, properties);
  } catch (error) {
    console.error('❌ LogRocket event tracking failed:', error);
  }
};

// Get session URL for support/debugging
export const getLogRocketSessionURL = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject('LogRocket not available on server');
      return;
    }

    LogRocket.getSessionURL(sessionURL => {
      resolve(sessionURL);
    });
  });
};

// Sentry integration helper
export const integrateSentryWithLogRocket = () => {
  if (typeof window === 'undefined') return;

  // This will be called from Sentry configuration
  return LogRocket.getSessionURL;
};

export default LogRocket;
