import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/blog(.*)',
  '/projects(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sitemap.xml',
  '/robots.txt',
  '/api/sitemap',
  '/favicon.ico',
  '/manifest.json',
  '/test-error', // Keep test error page accessible for Sentry testing
  '/api/sentry-debug', // Debug endpoint for Sentry configuration
  '/api/test-error', // Test error API endpoint for Sentry testing
]);

export default clerkMiddleware((auth, req) => {
  // Only protect routes that are NOT public
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

// Define the config for the middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|.+\\.(?:svg|ico|jpg|jpeg|png|gif|webp)|favicon.ico|sitemap.xml|robots.txt|googletagmanager\\.com).*)',
  ],
};
