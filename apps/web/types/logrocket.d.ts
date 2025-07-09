// LogRocket type declarations
declare global {
  interface Window {
    LogRocket?: {
      init: (appId: string, options?: Record<string, unknown>) => void;
      identify: (userId: string, userData?: Record<string, unknown>) => void;
      track: (eventName: string, properties?: Record<string, unknown>) => void;
      getSessionURL: (callback: (url: string) => void) => void;
      captureException: (error: Error) => void;
    };
  }
}

export {};
