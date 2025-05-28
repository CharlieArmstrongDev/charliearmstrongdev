import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function middleware(req) {
  const { userId } = getAuth(req);

  // Check if the user is authenticated
  if (!userId) {
    // Redirect to sign-in page if not authenticated
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  // Add additional middleware logic here (e.g., A/B testing, internationalization)

  return NextResponse.next();
}

// Define the config for the middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Apply middleware to all routes except API and static files
};