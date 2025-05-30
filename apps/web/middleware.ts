import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/blog(.*)',
  '/projects(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // Only protect routes that are NOT public
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

// Define the config for the middleware
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
