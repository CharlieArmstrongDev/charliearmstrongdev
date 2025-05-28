import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '@/lib/trpc/server';

// Create the tRPC API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}), // Define your context here if needed
});