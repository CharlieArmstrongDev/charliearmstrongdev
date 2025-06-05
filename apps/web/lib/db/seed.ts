// Seed data script for Redis - Initial data setup
import { redis, RedisKeys } from './redis';
import type { BlogPost, Project, SiteStats, UserPreferences } from './schema';
import { DataSerializers } from './schema';

// Sample blog posts for development
const sampleBlogPosts: BlogPost[] = [
  {
    id: 'blog_1',
    title: 'Getting Started with Next.js 14 and App Router',
    slug: 'getting-started-nextjs-14-app-router',
    content: `# Getting Started with Next.js 14 and App Router

Next.js 14 introduces significant improvements to the App Router, making it more stable and feature-rich. In this post, we'll explore the key features and how to get started.

## Key Features

- **Improved Performance**: Enhanced bundling and optimization
- **Server Components**: Better server-side rendering capabilities
- **Streaming**: Progressive loading for better user experience
- **Enhanced SEO**: Built-in optimization features

## Getting Started

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
\`\`\`

This will set up a new project with TypeScript, Tailwind CSS, and ESLint configured.

## App Router Structure

The new app directory structure provides:
- Better file organization
- Improved routing capabilities
- Enhanced layout system
- Server and client component separation

Stay tuned for more advanced tutorials on building with Next.js 14!`,
    excerpt:
      'Learn how to get started with Next.js 14 and the new App Router features for modern web development.',
    authorId: 'charlie',
    status: 'published',
    tags: ['nextjs', 'react', 'typescript', 'web-development'],
    featuredImage: '/images/blog/nextjs-14.jpg',
    readingTime: 5,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    publishedAt: new Date('2024-01-15'),
    viewCount: 125,
    likeCount: 23,
    seo: {
      metaTitle:
        'Getting Started with Next.js 14 and App Router | Charlie Armstrong',
      metaDescription:
        'Complete guide to Next.js 14 App Router features, setup, and best practices for modern web development.',
      keywords: [
        'nextjs',
        'app router',
        'react',
        'typescript',
        'web development',
      ],
    },
  },
  {
    id: 'blog_2',
    title: 'Building Scalable tRPC APIs with TypeScript',
    slug: 'building-scalable-trpc-apis-typescript',
    content: `# Building Scalable tRPC APIs with TypeScript

tRPC provides end-to-end typesafe APIs without the overhead of traditional REST or GraphQL setups. Let's explore how to build scalable APIs with tRPC.

## Why tRPC?

- **Type Safety**: Full TypeScript support from client to server
- **No Code Generation**: Types are inferred automatically
- **Performance**: Minimal runtime overhead
- **Developer Experience**: Excellent IDE support and error messages

## Setting Up tRPC

Here's how to set up a basic tRPC router:

\`\`\`typescript
import { router, procedure } from '@trpc/server'
import { z } from 'zod'

export const appRouter = router({
  hello: procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: \`Hello \${input.name}!\` }
    }),
})
\`\`\`

## Best Practices

1. **Organize routes logically** - Group related procedures
2. **Use middleware** - Handle authentication and validation
3. **Implement proper error handling** - Use tRPC error types
4. **Cache responses** - Implement caching strategies

tRPC is perfect for full-stack TypeScript applications where you want maximum type safety with minimal setup.`,
    excerpt:
      'Learn how to build type-safe, scalable APIs using tRPC and TypeScript for modern full-stack applications.',
    authorId: 'charlie',
    status: 'published',
    tags: ['trpc', 'typescript', 'api', 'full-stack'],
    featuredImage: '/images/blog/trpc-apis.jpg',
    readingTime: 8,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    publishedAt: new Date('2024-01-20'),
    viewCount: 89,
    likeCount: 17,
    seo: {
      metaTitle:
        'Building Scalable tRPC APIs with TypeScript | Charlie Armstrong',
      metaDescription:
        'Complete guide to building type-safe, scalable APIs using tRPC and TypeScript.',
      keywords: ['trpc', 'typescript', 'api', 'full-stack', 'type safety'],
    },
  },
];

// Sample projects for development
const sampleProjects: Project[] = [
  {
    id: 'project_1',
    title: 'Personal Portfolio Website',
    slug: 'personal-portfolio-website',
    description:
      'A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.',
    longDescription: `This is my personal portfolio website showcasing my projects, blog posts, and professional experience. Built with modern web technologies for optimal performance and user experience.

**Key Features:**
- Server-side rendering with Next.js 14
- Type-safe development with TypeScript
- Responsive design with Tailwind CSS
- SEO optimized
- Analytics integration
- Contact form functionality`,
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'tRPC',
      'Vercel KV',
      'Clerk Auth',
    ],
    githubUrl: 'https://github.com/charliearmstrong/portfolio',
    liveUrl: 'https://charliearmstrong.dev',
    imageUrl: '/images/projects/portfolio.jpg',
    screenshots: [
      '/images/projects/portfolio-1.jpg',
      '/images/projects/portfolio-2.jpg',
      '/images/projects/portfolio-3.jpg',
    ],
    featured: true,
    status: 'completed',
    category: 'Web Development',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-02-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-15'),
    viewCount: 245,
    likeCount: 42,
    challenges: [
      'Implementing server-side rendering with dynamic content',
      'Optimizing performance for mobile devices',
      'Creating a flexible content management system',
    ],
    learnings: [
      'Advanced Next.js 14 App Router patterns',
      'Effective TypeScript patterns for React applications',
      'Performance optimization techniques',
    ],
  },
  {
    id: 'project_2',
    title: 'Task Management App',
    slug: 'task-management-app',
    description:
      'A collaborative task management application with real-time updates and team features.',
    longDescription: `A comprehensive task management solution designed for teams and individuals. Features real-time collaboration, project organization, and productivity analytics.

**Key Features:**
- Real-time collaboration
- Project and team management
- Task prioritization and categorization
- Time tracking and analytics
- Mobile-responsive design
- Offline capability`,
    technologies: [
      'React',
      'Node.js',
      'Socket.io',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
    githubUrl: 'https://github.com/charliearmstrong/task-manager',
    liveUrl: 'https://taskmanager.charliearmstrong.dev',
    imageUrl: '/images/projects/task-manager.jpg',
    screenshots: [
      '/images/projects/task-manager-1.jpg',
      '/images/projects/task-manager-2.jpg',
    ],
    featured: true,
    status: 'active',
    category: 'Web Application',
    startDate: new Date('2023-10-01'),
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2024-01-30'),
    viewCount: 156,
    likeCount: 28,
    challenges: [
      'Implementing real-time synchronization across multiple users',
      'Optimizing database queries for large datasets',
      'Building offline-first functionality',
    ],
    learnings: [
      'WebSocket implementation for real-time features',
      'Database optimization and indexing strategies',
      'Progressive Web App development',
    ],
  },
];

// Initial site statistics
const initialSiteStats: SiteStats = {
  totalViews: 430,
  totalPosts: 2,
  totalProjects: 2,
  totalComments: 0,
  popularPosts: [
    { slug: 'getting-started-nextjs-14-app-router', views: 125 },
    { slug: 'building-scalable-trpc-apis-typescript', views: 89 },
  ],
  popularProjects: [
    { slug: 'personal-portfolio-website', views: 245 },
    { slug: 'task-management-app', views: 156 },
  ],
  lastUpdated: new Date(),
};

// Default user preferences
const defaultUserPreferences: Omit<UserPreferences, 'userId'> = {
  theme: 'system',
  notifications: true,
  newsletter: false,
  language: 'en',
  timezone: 'UTC',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export async function seedRedisData() {
  console.log('🌱 Starting Redis data seeding...');

  try {
    // Check Redis connection
    const isConnected = await redis.ping();
    if (!isConnected) {
      throw new Error('Redis connection failed');
    }
    console.log('✅ Redis connection established');

    // Seed blog posts
    console.log('📝 Seeding blog posts...');
    for (const post of sampleBlogPosts) {
      const postKey = RedisKeys.blogPost(post.slug);
      const serializedPost = DataSerializers.serializeForRedis(
        post as unknown as Record<string, unknown>,
      );

      await redis.hset(postKey, serializedPost);

      // Add to published set if published
      if (post.status === 'published') {
        await redis.sadd(RedisKeys.blogPublished(), post.slug);
      }

      // Add tags to tags set
      for (const tag of post.tags) {
        await redis.sadd(RedisKeys.blogTags(), tag);
      }

      // Set view count
      await redis.set(RedisKeys.viewCount('blog', post.slug), post.viewCount);

      console.log(`   ✅ Seeded blog post: ${post.title}`);
    }

    // Seed projects
    console.log('🚀 Seeding projects...');
    for (const project of sampleProjects) {
      const projectKey = RedisKeys.project(project.slug);
      const serializedProject = DataSerializers.serializeForRedis(
        project as unknown as Record<string, unknown>,
      );

      await redis.hset(projectKey, serializedProject);

      // Add to featured set if featured
      if (project.featured) {
        await redis.sadd(RedisKeys.projectsFeatured(), project.slug);
      }

      // Set view count
      await redis.set(
        RedisKeys.viewCount('project', project.slug),
        project.viewCount,
      );

      console.log(`   ✅ Seeded project: ${project.title}`);
    }

    // Seed site statistics
    console.log('📊 Seeding site statistics...');
    const statsKey = RedisKeys.siteStats();
    const serializedStats = DataSerializers.serializeForRedis(
      initialSiteStats as unknown as Record<string, unknown>,
    );
    await redis.hset(statsKey, serializedStats);
    console.log('   ✅ Seeded site statistics');

    // Create admin user preferences (example)
    console.log('👤 Seeding default user preferences...');
    const adminUserId = 'user_charlie';
    const adminPrefs: UserPreferences = {
      ...defaultUserPreferences,
      userId: adminUserId,
      theme: 'dark',
      notifications: true,
      newsletter: true,
    };
    const prefsKey = RedisKeys.userPreferences(adminUserId);
    const serializedPrefs = DataSerializers.serializeForRedis(
      adminPrefs as unknown as Record<string, unknown>,
    );
    await redis.hset(prefsKey, serializedPrefs);
    console.log('   ✅ Seeded admin user preferences');

    console.log('🎉 Redis seeding completed successfully!');

    // Display summary
    const publishedCount = await redis.scard(RedisKeys.blogPublished());
    const featuredCount = await redis.scard(RedisKeys.projectsFeatured());
    const tagCount = await redis.scard(RedisKeys.blogTags());

    console.log('\n📈 Seeding Summary:');
    console.log(`   Blog posts: ${sampleBlogPosts.length}`);
    console.log(`   Published posts: ${publishedCount}`);
    console.log(`   Projects: ${sampleProjects.length}`);
    console.log(`   Featured projects: ${featuredCount}`);
    console.log(`   Unique tags: ${tagCount}`);
  } catch (error) {
    console.error('❌ Redis seeding failed:', error);
    throw error;
  }
}

// Function to clear all seed data (useful for testing)
export async function clearSeedData() {
  console.log('🧹 Clearing seed data...');

  try {
    // Get all keys with our patterns
    const patterns = [
      'blog:*',
      'project:*',
      'views:*',
      'site:stats',
      'user:*:preferences',
    ];

    for (const pattern of patterns) {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
        console.log(
          `   ✅ Cleared ${keys.length} keys matching pattern: ${pattern}`,
        );
      }
    }

    console.log('🎉 Seed data cleared successfully!');
  } catch (error) {
    console.error('❌ Failed to clear seed data:', error);
    throw error;
  }
}

// Export for use in scripts
export {
  sampleBlogPosts,
  sampleProjects,
  initialSiteStats,
  defaultUserPreferences,
};
