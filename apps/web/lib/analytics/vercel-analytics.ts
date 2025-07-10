import { track } from '@vercel/analytics';

// Custom event tracking utilities for Vercel Analytics

export const trackEvent = (
  name: string,
  properties?: Record<string, string | number | boolean>,
) => {
  track(name, properties);
};

// Predefined event tracking functions
export const trackPageView = (page: string) => {
  trackEvent('Page View', { page });
};

export const trackProjectView = (projectSlug: string) => {
  trackEvent('Project View', { project: projectSlug });
};

export const trackBlogPostView = (postSlug: string) => {
  trackEvent('Blog Post View', { post: postSlug });
};

export const trackContactFormSubmission = () => {
  trackEvent('Contact Form Submit');
};

export const trackDownload = (fileName: string) => {
  trackEvent('File Download', { file: fileName });
};

export const trackExternalLink = (url: string) => {
  trackEvent('External Link Click', { url });
};

export const trackSearch = (query: string) => {
  trackEvent('Search', { query });
};

export const trackSignup = () => {
  trackEvent('User Signup');
};

export const trackLogin = () => {
  trackEvent('User Login');
};

export const trackError = (errorType: string, errorMessage?: string) => {
  trackEvent('Error', {
    type: errorType,
    ...(errorMessage && { message: errorMessage }),
  });
};
