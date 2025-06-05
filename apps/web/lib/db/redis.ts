// Redis connection and utilities for Vercel KV (Upstash Redis)
import { kv } from '@vercel/kv';
import { Redis } from '@upstash/redis';

// Vercel KV client (recommended for most operations)
export const redis = kv;

// Upstash Redis client (for advanced operations)
export const upstashRedis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Redis key generators
export const RedisKeys = {
  // User preferences
  userPreferences: (userId: string) => `user:${userId}:preferences`,

  // Analytics
  analyticsEvents: () => 'analytics:events',
  userSessions: (sessionId: string) => `session:${sessionId}`,

  // Blog posts
  blogPost: (slug: string) => `blog:${slug}`,
  blogPublished: () => 'blog:published',
  blogTags: () => 'blog:tags',
  blogComments: (slug: string) => `blog:${slug}:comments`,

  // Projects
  project: (slug: string) => `project:${slug}`,
  projectsFeatured: () => 'projects:featured',

  // Comments
  comment: (id: string) => `comment:${id}`,

  // Site statistics
  siteStats: () => 'site:stats',

  // View counts
  viewCount: (type: 'blog' | 'project', slug: string) =>
    `views:${type}:${slug}`,
};

// Redis connection health check
export async function checkRedisConnection(): Promise<boolean> {
  try {
    await redis.ping();
    return true;
  } catch (error) {
    console.error('Redis connection failed:', error);
    return false;
  }
}

// Utility functions for common Redis operations
export const RedisUtils = {
  // Set with expiration
  async setWithExpiry<T>(
    key: string,
    value: T,
    expirySeconds: number,
  ): Promise<void> {
    await redis.set(key, JSON.stringify(value), { ex: expirySeconds });
  },
  // Get and parse JSON
  async getJSON<T = unknown>(key: string): Promise<T | null> {
    const value = await redis.get(key);
    if (!value) return null;
    try {
      return typeof value === 'string'
        ? (JSON.parse(value) as T)
        : (value as T);
    } catch {
      return value as T;
    }
  },

  // Increment counter with expiry
  async incrementCounter(key: string, expirySeconds?: number): Promise<number> {
    const count = await redis.incr(key);
    if (expirySeconds && count === 1) {
      await redis.expire(key, expirySeconds);
    }
    return count;
  },

  // Add to set if not exists
  async addToSetIfNotExists(setKey: string, value: string): Promise<boolean> {
    const result = await redis.sadd(setKey, value);
    return result === 1;
  }, // Get random members from set
  async getRandomFromSet(setKey: string, count: number): Promise<string[]> {
    const result = await redis.srandmember(setKey, count);
    return (result as string[]) || [];
  },

  // Batch operations
  async pipeline() {
    return upstashRedis.pipeline();
  },
};

// Export types for better TypeScript support
export type RedisKey = keyof typeof RedisKeys;
export type RedisClient = typeof redis;
