'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { initializeLogRocket, identifyLogRocketUser } from '../lib/logrocket';

export default function LogRocketInit() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Initialize LogRocket when component mounts
    initializeLogRocket();
  }, []);

  useEffect(() => {
    // Identify user when authentication is loaded and user exists
    if (isLoaded && user) {
      identifyLogRocketUser({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || undefined,
        // Add any other non-sensitive user properties
        createdAt: user.createdAt,
        lastSignInAt: user.lastSignInAt,
      });
    }
  }, [isLoaded, user]);

  // This component doesn't render anything visible
  return null;
}
