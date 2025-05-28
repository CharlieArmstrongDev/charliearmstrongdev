import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Create tRPC instance
const t = initTRPC.create();

// Export router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Example router
export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}!`,
      };
    }),
  
  posts: publicProcedure
    .query(async () => {
      // Mock data - replace with actual database calls
      return [
        { id: 1, title: 'First Post', content: 'Hello World!' },
        { id: 2, title: 'Second Post', content: 'This is the second post.' },
      ];
    }),
});

export type AppRouter = typeof appRouter;
