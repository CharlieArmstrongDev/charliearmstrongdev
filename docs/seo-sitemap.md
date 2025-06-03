# SEO and Sitemap Implementation

## Overview

This document outlines the SEO and sitemap implementation for the CharlieArmstrongDev portfolio website.

## Files Created

### 1. `app/sitemap.ts`

- Dynamic sitemap generator using Next.js 13+ App Router
- Automatically includes static pages and dynamic content
- Generates XML sitemap at `/sitemap.xml`

### 2. `app/robots.ts`

- Robots.txt generator for search engine directives
- Available at `/robots.txt`
- References the sitemap location

### 3. `lib/sitemap.ts`

- Utility functions for sitemap generation
- Mock data functions that can be replaced with real data fetching
- Centralized configuration for base URL

### 4. `app/api/sitemap/route.ts`

- Alternative XML API endpoint for sitemap
- Provides fallback XML generation
- Available at `/api/sitemap`

## Key Features

- **Static Generation**: Sitemap is pre-rendered at build time
- **Dynamic Content**: Supports blog posts and project pages
- **SEO Optimized**: Proper priorities and change frequencies
- **Public Access**: Configured to bypass authentication middleware

## Google Search Console Integration

### The Problem

Initially, Google Search Console couldn't fetch the sitemap because it was blocked by Clerk authentication middleware.

### The Solution

Updated `middleware.ts` to include SEO-related routes as public:

```typescript
const isPublicRoute = createRouteMatcher([
  "/",
  "/blog(.*)",
  "/projects(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sitemap.xml", // ✅ Added
  "/robots.txt", // ✅ Added
  "/api/sitemap", // ✅ Added
  "/favicon.ico", // ✅ Added
  "/manifest.json", // ✅ Added
]);
```

### Testing Sitemap Access

After deployment, verify sitemap accessibility:

1. **Direct URL**: `https://charliearmstrong.dev/sitemap.xml`
2. **Robots.txt**: `https://charliearmstrong.dev/robots.txt`
3. **API Endpoint**: `https://charliearmstrong.dev/api/sitemap`

## Google Search Console Setup

1. Navigate to [Google Search Console](https://search.google.com/search-console)
2. Select your property: `charliearmstrong.dev`
3. Go to "Sitemaps" in the left sidebar
4. Add new sitemap: `https://charliearmstrong.dev/sitemap.xml`
5. Submit and verify it can be fetched

## Future Enhancements

### When Adding Real Blog Data

Replace mock functions in `lib/sitemap.ts`:

```typescript
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  // Replace with actual database/CMS call
  const posts = await fetch("/api/posts").then((res) => res.json());
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.publishedAt,
    lastModified: new Date(post.updatedAt),
  }));
};
```

### Additional SEO Features

- Add structured data (JSON-LD)
- Implement page-specific metadata
- Add Open Graph images
- Set up Google Analytics (tracking ID provided in docs)

## Troubleshooting

### Sitemap Returns 404

- Check if the build completed successfully
- Verify `sitemap.ts` has no syntax errors
- Ensure the file is in the correct `app/` directory

### Sitemap Redirects to Sign-in

- Check `middleware.ts` configuration
- Verify sitemap routes are included in `isPublicRoute`
- Test with an incognito browser

### Google Search Console Can't Fetch

- Verify the sitemap is publicly accessible
- Check for any firewall or CDN blocking
- Ensure the sitemap returns valid XML

## Related Files

- `apps/web/middleware.ts` - Authentication configuration
- `apps/web/app/layout.tsx` - Global metadata and SEO tags
- `apps/web/next.config.js` - Next.js configuration
- `docs/performance.md` - SEO performance guidelines
