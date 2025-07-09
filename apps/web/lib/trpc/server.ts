import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';
import { redis, RedisKeys, RedisUtils } from '../db/redis';
import {
  DataSerializers,
  type BlogPost,
  type Project,
  type UserPreferences,
} from '../db/schema';
import { checkRedisHealth } from '../monitoring/redis';

// Context type for tRPC
type Context = {
  userId?: string;
};

// Create tRPC instance with error handling
const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    // Log errors to Sentry
    if (error.code !== 'BAD_REQUEST') {
      Sentry.captureException(error.cause || error);
    }

    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof z.ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Export router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId, // userId is now guaranteed to be defined
    },
  });
});

// Blog router
const blogRouter = router({
  // Get all published blog posts
  getPublished: publicProcedure.query(async () => {
    try {
      const publishedSlugs = await redis.smembers(RedisKeys.blogPublished());
      const posts: BlogPost[] = [];

      for (const slug of publishedSlugs) {
        const postData = await redis.hgetall(RedisKeys.blogPost(slug));
        if (postData && Object.keys(postData).length > 0) {
          const post = DataSerializers.deserializeFromRedis<BlogPost>(
            postData,
            ['createdAt', 'updatedAt', 'publishedAt'],
          );
          posts.push(post);
        }
      }

      // Sort by publishedAt date, newest first
      return posts.sort(
        (a, b) =>
          new Date(b.publishedAt || b.createdAt).getTime() -
          new Date(a.publishedAt || a.createdAt).getTime(),
      );
    } catch (error) {
      console.error('Error fetching published posts:', error);
      return [];
    }
  }),

  // Get single blog post by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        const postData = await redis.hgetall(RedisKeys.blogPost(input.slug));
        if (!postData || Object.keys(postData).length === 0) {
          return null;
        }

        // Increment view count
        await RedisUtils.incrementCounter(
          RedisKeys.viewCount('blog', input.slug),
        );

        return DataSerializers.deserializeFromRedis<BlogPost>(postData, [
          'createdAt',
          'updatedAt',
          'publishedAt',
        ]);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
      }
    }),

  // Get all blog tags
  getTags: publicProcedure.query(async () => {
    try {
      return await redis.smembers(RedisKeys.blogTags());
    } catch (error) {
      console.error('Error fetching blog tags:', error);
      return [];
    }
  }),

  // Get posts by tag
  getByTag: publicProcedure
    .input(z.object({ tag: z.string() }))
    .query(async ({ input }) => {
      try {
        const publishedSlugs = await redis.smembers(RedisKeys.blogPublished());
        const posts: BlogPost[] = [];

        for (const slug of publishedSlugs) {
          const postData = await redis.hgetall(RedisKeys.blogPost(slug));
          if (postData && Object.keys(postData).length > 0) {
            const post = DataSerializers.deserializeFromRedis<BlogPost>(
              postData,
              ['createdAt', 'updatedAt', 'publishedAt'],
            );
            if (post.tags.includes(input.tag)) {
              posts.push(post);
            }
          }
        }

        return posts.sort(
          (a, b) =>
            new Date(b.publishedAt || b.createdAt).getTime() -
            new Date(a.publishedAt || a.createdAt).getTime(),
        );
      } catch (error) {
        console.error('Error fetching posts by tag:', error);
        return [];
      }
    }),
});

// Projects router
const projectsRouter = router({
  // Get all projects
  getAll: publicProcedure.query(async () => {
    try {
      const projectKeys = await redis.keys('project:*');
      const projects: Project[] = [];

      for (const key of projectKeys) {
        const projectData = await redis.hgetall(key);
        if (projectData && Object.keys(projectData).length > 0) {
          const project = DataSerializers.deserializeFromRedis<Project>(
            projectData,
            ['startDate', 'endDate', 'createdAt', 'updatedAt'],
          );
          projects.push(project);
        }
      }

      // Sort by updatedAt date, newest first
      return projects.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }),

  // Get featured projects
  getFeatured: publicProcedure.query(async () => {
    try {
      const featuredSlugs = await redis.smembers(RedisKeys.projectsFeatured());
      const projects: Project[] = [];

      for (const slug of featuredSlugs) {
        const projectData = await redis.hgetall(RedisKeys.project(slug));
        if (projectData && Object.keys(projectData).length > 0) {
          const project = DataSerializers.deserializeFromRedis<Project>(
            projectData,
            ['startDate', 'endDate', 'createdAt', 'updatedAt'],
          );
          projects.push(project);
        }
      }

      return projects.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }
  }),

  // Get single project by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        const projectData = await redis.hgetall(RedisKeys.project(input.slug));
        if (!projectData || Object.keys(projectData).length === 0) {
          return null;
        }

        // Increment view count
        await RedisUtils.incrementCounter(
          RedisKeys.viewCount('project', input.slug),
        );

        return DataSerializers.deserializeFromRedis<Project>(projectData, [
          'startDate',
          'endDate',
          'createdAt',
          'updatedAt',
        ]);
      } catch (error) {
        console.error('Error fetching project:', error);
        return null;
      }
    }),
});

// Analytics router
const analyticsRouter = router({
  // Track page view
  trackPageView: publicProcedure
    .input(
      z.object({
        page: z.string(),
        referrer: z.string().optional(),
        userAgent: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const eventId = `event_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

        const event = {
          id: eventId,
          sessionId,
          event: 'page_view',
          properties: {
            page: input.page,
            referrer: input.referrer,
            userAgent: input.userAgent,
          },
          page: input.page,
          referrer: input.referrer,
          userAgent: input.userAgent,
          timestamp: new Date(),
        };

        // Add to analytics stream
        await redis.xadd(
          RedisKeys.analyticsEvents(),
          '*',
          DataSerializers.serializeForRedis(event),
        );

        return { success: true };
      } catch (error) {
        console.error('Error tracking page view:', error);
        return { success: false };
      }
    }),

  // Get site stats
  getSiteStats: publicProcedure.query(async () => {
    try {
      const statsData = await redis.hgetall(RedisKeys.siteStats());
      if (!statsData || Object.keys(statsData).length === 0) {
        return null;
      }

      return DataSerializers.deserializeFromRedis(statsData, ['lastUpdated']);
    } catch (error) {
      console.error('Error fetching site stats:', error);
      return null;
    }
  }),
});

// Test router for Sentry error tracking
const testRouter = router({
  // Test server-side error reporting
  serverError: publicProcedure.query(() => {
    throw new Error('Test server-side error for Sentry integration');
  }),

  // Test client-side error with specific message
  clientError: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(({ input }) => {
      throw new Error(`Test client error: ${input.message}`);
    }),
});

// User preferences router
const userRouter = router({
  // Get user preferences
  getPreferences: protectedProcedure.query(async ({ ctx }) => {
    try {
      const prefsData = await redis.hgetall(
        RedisKeys.userPreferences(ctx.userId),
      );
      if (!prefsData || Object.keys(prefsData).length === 0) {
        return null;
      }

      return DataSerializers.deserializeFromRedis<UserPreferences>(prefsData, [
        'createdAt',
        'updatedAt',
      ]);
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      return null;
    }
  }),

  // Update user preferences
  updatePreferences: protectedProcedure
    .input(
      z.object({
        preferences: z.object({
          theme: z.enum(['light', 'dark', 'system']).optional(),
          notifications: z.boolean().optional(),
          newsletter: z.boolean().optional(),
          language: z.string().optional(),
          timezone: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const existingData = await redis.hgetall(
          RedisKeys.userPreferences(ctx.userId),
        );

        const updatedPrefs: UserPreferences = {
          userId: ctx.userId,
          theme: input.preferences.theme || 'system',
          notifications: input.preferences.notifications ?? true,
          newsletter: input.preferences.newsletter ?? false,
          language: input.preferences.language || 'en',
          timezone: input.preferences.timezone || 'UTC',
          createdAt: existingData?.createdAt
            ? new Date(String(existingData.createdAt))
            : new Date(),
          updatedAt: new Date(),
          ...input.preferences,
        };

        await redis.hset(
          RedisKeys.userPreferences(ctx.userId),
          DataSerializers.serializeForRedis(
            updatedPrefs as unknown as Record<string, unknown>,
          ),
        );

        return { success: true, preferences: updatedPrefs };
      } catch (error) {
        console.error('Error updating user preferences:', error);
        return { success: false };
      }
    }),
});

// Monitoring router
const monitoringRouter = router({
  redis: publicProcedure.query(async () => {
    return await checkRedisHealth();
  }),
});

// Main app router
export const appRouter = router({
  // Legacy hello endpoint for compatibility
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}!`,
      };
    }),

  // Organized routers
  blog: blogRouter,
  projects: projectsRouter,
  analytics: analyticsRouter,
  user: userRouter,
  test: testRouter,
  monitoring: monitoringRouter,

  // Health check with Redis monitoring
  health: publicProcedure.query(async () => {
    try {
      const metrics = await checkRedisHealth();
      return {
        status: 'ok',
        redis: {
          connected: metrics.connectionStatus === 'connected',
          responseTime: metrics.responseTime,
          keyCount: metrics.keyCount,
          errorRate: metrics.errorRate,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        redis: {
          connected: false,
          responseTime: -1,
          keyCount: 0,
          errorRate: 1.0,
        },
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }),
});

export type AppRouter = typeof appRouter;
