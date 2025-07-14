// Global types for Vercel Analytics
declare global {
  interface Window {
    va?: (event: string, properties?: Record<string, any>) => void;
  }
}

export {};
