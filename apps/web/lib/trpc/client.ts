// tRPC client configuration for CharlieArmstrongDev
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server';

// Create the tRPC React hooks
export const trpc = createTRPCReact<AppRouter>();

// Client configuration
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      // Static headers for now - can be made dynamic later if needed
      headers: {
        // authorization: getAuthCookie(),
      },
    }),
  ],
});
