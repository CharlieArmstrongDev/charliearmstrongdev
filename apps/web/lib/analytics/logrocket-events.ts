// LogRocket event tracking utilities
import { trackLogRocketEvent } from '../logrocket';

// Track page views
export const trackPageView = (pagePath: string) => {
  trackLogRocketEvent('Page View', {
    path: pagePath,
    timestamp: new Date().toISOString(),
  });
};

// Track user interactions
export const trackUserInteraction = (
  action: string,
  element: string,
  details?: Record<string, unknown>,
) => {
  trackLogRocketEvent('User Interaction', {
    action,
    element,
    ...details,
    timestamp: new Date().toISOString(),
  });
};

// Track errors (for manual error tracking)
export const trackError = (error: Error, context?: Record<string, unknown>) => {
  trackLogRocketEvent('Error', {
    message: error.message,
    stack: error.stack || 'No stack trace available',
    ...(context && { context: JSON.stringify(context) }),
    timestamp: new Date().toISOString(),
  });
};

// Track performance metrics
export const trackPerformance = (
  metric: string,
  value: number,
  unit: string,
) => {
  trackLogRocketEvent('Performance', {
    metric,
    value,
    unit,
    timestamp: new Date().toISOString(),
  });
};

// Track feature usage
export const trackFeatureUsage = (
  feature: string,
  details?: Record<string, unknown>,
) => {
  trackLogRocketEvent('Feature Usage', {
    feature,
    ...details,
    timestamp: new Date().toISOString(),
  });
};
