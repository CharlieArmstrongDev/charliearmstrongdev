// Redis data structure definitions and TypeScript interfaces

export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  newsletter: boolean;
  language: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsEvent {
  id: string;
  userId?: string;
  sessionId: string;
  event: string;
  properties: Record<string, unknown>;
  page: string;
  referrer?: string;
  userAgent?: string;
  timestamp: Date;
  ipHash?: string; // Hashed IP for privacy
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  featuredImage?: string;
  readingTime: number; // estimated reading time in minutes
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  viewCount: number;
  likeCount: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  screenshots?: string[];
  featured: boolean;
  status: 'planning' | 'active' | 'completed' | 'archived';
  category: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  likeCount: number;
  challenges?: string[];
  learnings?: string[];
}

export interface Comment {
  id: string;
  blogSlug: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected' | 'spam';
  parentId?: string; // for reply threads
  createdAt: Date;
  updatedAt: Date;
  likeCount: number;
  isEdited: boolean;
}

export interface SiteStats {
  totalViews: number;
  totalPosts: number;
  totalProjects: number;
  totalComments: number;
  popularPosts: Array<{ slug: string; views: number }>;
  popularProjects: Array<{ slug: string; views: number }>;
  lastUpdated: Date;
}

export interface UserSession {
  id: string;
  userId?: string;
  startTime: Date;
  lastActivity: Date;
  pageViews: number;
  referrer?: string;
  userAgent: string;
  isBot: boolean;
  country?: string;
  device: {
    type: 'desktop' | 'mobile' | 'tablet';
    browser: string;
    os: string;
  };
}

// Redis data structure schemas for validation
export const RedisSchemas = {
  userPreferences: {
    keyPattern: 'user:*:preferences',
    dataType: 'hash' as const,
    fields: [
      'userId',
      'theme',
      'notifications',
      'newsletter',
      'language',
      'timezone',
      'createdAt',
      'updatedAt',
    ],
  },

  analyticsEvents: {
    keyPattern: 'analytics:events',
    dataType: 'stream' as const,
    maxLength: 10000, // Keep last 10k events
  },

  blogPosts: {
    keyPattern: 'blog:*',
    dataType: 'hash' as const,
    fields: [
      'id',
      'title',
      'slug',
      'content',
      'excerpt',
      'authorId',
      'status',
      'tags',
      'createdAt',
      'updatedAt',
    ],
  },

  blogPublished: {
    keyPattern: 'blog:published',
    dataType: 'set' as const,
    description: 'Set of published blog post slugs',
  },

  blogTags: {
    keyPattern: 'blog:tags',
    dataType: 'set' as const,
    description: 'Set of all available blog tags',
  },

  projects: {
    keyPattern: 'project:*',
    dataType: 'hash' as const,
    fields: [
      'id',
      'title',
      'slug',
      'description',
      'technologies',
      'status',
      'featured',
      'createdAt',
      'updatedAt',
    ],
  },

  projectsFeatured: {
    keyPattern: 'projects:featured',
    dataType: 'set' as const,
    description: 'Set of featured project slugs',
  },

  comments: {
    keyPattern: 'comment:*',
    dataType: 'hash' as const,
    fields: [
      'id',
      'blogSlug',
      'authorId',
      'content',
      'status',
      'createdAt',
      'updatedAt',
    ],
  },

  blogComments: {
    keyPattern: 'blog:*:comments',
    dataType: 'list' as const,
    description: 'List of comment IDs for each blog post',
  },

  siteStats: {
    keyPattern: 'site:stats',
    dataType: 'hash' as const,
    fields: [
      'totalViews',
      'totalPosts',
      'totalProjects',
      'totalComments',
      'lastUpdated',
    ],
  },

  viewCounts: {
    keyPattern: 'views:*:*',
    dataType: 'string' as const,
    description: 'View counts for blog posts and projects',
  },

  userSessions: {
    keyPattern: 'session:*',
    dataType: 'hash' as const,
    ttl: 86400, // 24 hours
    fields: [
      'id',
      'userId',
      'startTime',
      'lastActivity',
      'pageViews',
      'userAgent',
    ],
  },
};

// Helper functions for data serialization
export const DataSerializers = {
  // Serialize dates to ISO strings for Redis storage
  serializeForRedis(data: Record<string, unknown>): Record<string, string> {
    const serialized: Record<string, string> = {};

    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Date) {
        serialized[key] = value.toISOString();
      } else if (Array.isArray(value)) {
        serialized[key] = JSON.stringify(value);
      } else if (typeof value === 'object' && value !== null) {
        serialized[key] = JSON.stringify(value);
      } else {
        serialized[key] = String(value);
      }
    }

    return serialized;
  }, // Deserialize data from Redis
  deserializeFromRedis<T>(
    data: Record<string, unknown>,
    dateFields: string[] = [],
  ): T {
    const deserialized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      const stringValue = String(value);
      if (dateFields.includes(key)) {
        deserialized[key] = new Date(stringValue);
      } else if (key.includes('Count') || key.includes('Time')) {
        deserialized[key] = Number(stringValue);
      } else if (stringValue.startsWith('[') || stringValue.startsWith('{')) {
        try {
          deserialized[key] = JSON.parse(stringValue);
        } catch {
          deserialized[key] = stringValue;
        }
      } else if (stringValue === 'true' || stringValue === 'false') {
        deserialized[key] = stringValue === 'true';
      } else {
        deserialized[key] = stringValue;
      }
    }

    return deserialized as T;
  },
};

// Type guards for runtime validation
export const TypeGuards = {
  isUserPreferences(data: unknown): data is UserPreferences {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof (data as Record<string, unknown>).userId === 'string' &&
      typeof (data as Record<string, unknown>).theme === 'string'
    );
  },

  isBlogPost(data: unknown): data is BlogPost {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof (data as Record<string, unknown>).id === 'string' &&
      typeof (data as Record<string, unknown>).slug === 'string'
    );
  },

  isProject(data: unknown): data is Project {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof (data as Record<string, unknown>).id === 'string' &&
      typeof (data as Record<string, unknown>).slug === 'string'
    );
  },

  isComment(data: unknown): data is Comment {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof (data as Record<string, unknown>).id === 'string' &&
      typeof (data as Record<string, unknown>).blogSlug === 'string'
    );
  },
};
