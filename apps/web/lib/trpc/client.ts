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
      // You can pass any HTTP headers here
      async headers() {
        return {
          // authorization: getAuthCookie(),
        };
      },
    }),
  ],
});
