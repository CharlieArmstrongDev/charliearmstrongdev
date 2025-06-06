import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  console.log('🔍 Sentry Debug Endpoint Called');
  const debug = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    runtime: process.env.NEXT_RUNTIME || 'nodejs',
    sentryDsn: process.env.SENTRY_DSN ? 'SET' : 'NOT_SET',
    sentryPublicDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ? 'SET' : 'NOT_SET',
    sentryOrg: process.env.SENTRY_ORG || 'NOT_SET',
    sentryProject: process.env.SENTRY_PROJECT || 'NOT_SET',
    vercelEnv: process.env.VERCEL_ENV || 'NOT_SET',
    sentryLoaded: !!Sentry,
  };

  console.log('🔍 Debug info:', debug);

  // Try to capture a test error
  try {
    Sentry.captureMessage('Sentry debug test message from API route', 'info');
    console.log('✅ Sentry.captureMessage called successfully');
  } catch (error) {
    console.error('❌ Error calling Sentry.captureMessage:', error);
  }

  return NextResponse.json(debug);
}
