// Google Analytics 4 event tracking utilities
// Provides type-safe event tracking for GA4

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      parameters?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        custom_parameter_1?: string;
        custom_parameter_2?: string;
        page_title?: string;
        page_location?: string;
        user_id?: string;
        [key: string]: unknown;
      },
    ) => void;
  }
}

/**
 * Track a page view event in Google Analytics
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!, {
      page_path: url,
      page_title: title,
    });
  }
}

/**
 * Track a custom event in Google Analytics
 */
export function trackEvent(
  action: string,
  category: string = 'engagement',
  label?: string,
  value?: number,
  customParameters?: Record<string, unknown>,
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParameters,
    });
  }
}

/**
 * Track blog post views
 */
export function trackBlogView(postSlug: string, postTitle: string) {
  trackEvent('blog_view', 'content', postSlug, 1, {
    custom_parameter_1: 'blog_post',
    page_title: postTitle,
  });
}

/**
 * Track project views
 */
export function trackProjectView(projectName: string, projectType: string) {
  trackEvent('project_view', 'content', projectName, 1, {
    custom_parameter_1: 'project',
    custom_parameter_2: projectType,
  });
}

/**
 * Track contact form submissions
 */
export function trackContactSubmission(formType: string = 'general') {
  trackEvent('contact_form_submit', 'form', formType, 1, {
    custom_parameter_1: 'contact',
    custom_parameter_2: formType,
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, linkText?: string) {
  trackEvent('external_link_click', 'navigation', url, 1, {
    custom_parameter_1: 'external_link',
    page_location: url,
    event_label: linkText || url,
  });
}

/**
 * Track file downloads
 */
export function trackDownload(fileName: string, fileType: string) {
  trackEvent('file_download', 'engagement', fileName, 1, {
    custom_parameter_1: 'download',
    custom_parameter_2: fileType,
  });
}

/**
 * Track search queries
 */
export function trackSearch(searchTerm: string, resultsCount?: number) {
  trackEvent('search', 'engagement', searchTerm, resultsCount, {
    custom_parameter_1: 'search',
    search_term: searchTerm,
  });
}

/**
 * Track user authentication events
 */
export function trackUserAuth(action: 'login' | 'signup' | 'logout') {
  trackEvent(action, 'user', action, 1, {
    custom_parameter_1: 'authentication',
    custom_parameter_2: action,
  });
}

/**
 * Track error events
 */
export function trackError(errorType: string, errorMessage: string) {
  trackEvent('error', 'exception', errorType, 1, {
    custom_parameter_1: 'error',
    custom_parameter_2: errorType,
    description: errorMessage,
  });
}

/**
 * Track performance metrics
 */
export function trackPerformance(
  metricName: string,
  value: number,
  unit: string = 'ms',
) {
  trackEvent('performance_metric', 'performance', metricName, value, {
    custom_parameter_1: 'performance',
    custom_parameter_2: unit,
    metric_name: metricName,
  });
}
