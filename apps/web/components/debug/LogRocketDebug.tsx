'use client';

import { useEffect, useState } from 'react';

export default function LogRocketDebug() {
  const [status, setStatus] = useState<{
    appId: string | undefined;
    isInitialized: boolean;
    environment: string;
  }>({
    appId: undefined,
    isInitialized: false,
    environment: 'unknown',
  });

  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_LOGROCKET_APP_ID;
    const environment = process.env.NODE_ENV;

    // Check if LogRocket is initialized
    const isInitialized =
      typeof window !== 'undefined' &&
      'LogRocket' in window &&
      window.LogRocket !== undefined;

    setStatus({
      appId,
      isInitialized,
      environment,
    });
  }, []);

  // Only show in development or if you add ?debug=true to URL
  const shouldShow =
    process.env.NODE_ENV === 'development' ||
    (typeof window !== 'undefined' &&
      window.location.search.includes('debug=true'));

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-black p-4 text-sm text-white">
      <h3 className="mb-2 font-bold">LogRocket Debug</h3>
      <div className="space-y-1">
        <div>Environment: {status.environment}</div>
        <div>App ID: {status.appId || 'Not set'}</div>
        <div>Initialized: {status.isInitialized ? '✅' : '❌'}</div>
      </div>
    </div>
  );
}
