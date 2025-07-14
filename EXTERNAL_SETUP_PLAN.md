# External Setup Implementation Plan

_CharlieArmstrongDev Project - External Infrastructure & Services Setup_

---

## Progress Overview

**Total Tasks:** 93 | **Completed:** 6+ (including major troubleshooting) | **Remaining:** 87

### Recently Completed

✅ **Section 1.1 - Vercel KV (Upstash Redis) Database Setup** - ✅ FULLY COMPLETED

- Comprehensive Redis infrastructure with data structures, seeding, tRPC integration, and testing
- All TypeScript compilation errors resolved ✅
- Build process successful ✅
- All tRPC endpoints tested and functional ✅
- Ready for production deployment

✅ **Section 2.1 - Sentry Error Tracking Setup** - ✅ FULLY COMPLETED

- Modern Next.js 15 instrumentation approach implementation
- Server-side and client-side error tracking functional ✅
- Comprehensive test endpoints and debugging capabilities ✅
- Session replay integration and performance monitoring ✅
- tRPC error formatting with Sentry integration ✅

✅ **Section 2.2 - LogRocket Session Replay Setup** - ✅ FULLY COMPLETED

- Complete LogRocket integration with Next.js 15 ✅
- User authentication integration with Clerk ✅
- Privacy-compliant configuration with data sanitization ✅
- Custom event tracking and session URL retrieval ✅
- Comprehensive testing infrastructure and debug capabilities ✅
- TypeScript declarations and type safety ✅

✅ **Section 2.3 - Redis (Vercel KV) Monitoring Setup** - ✅ FULLY COMPLETED

- Comprehensive Redis monitoring with real-time metrics ✅
- Automated alerting via Sentry integration ✅
- Live dashboard for performance tracking ✅
- Script-based monitoring for automated health checks ✅
- Integration with existing tRPC infrastructure ✅

✅ **Section 3.1 - Vercel Analytics Setup** - ✅ FULLY COMPLETED & PRODUCTION TESTED

- Comprehensive analytics setup with automatic page view tracking ✅
- Speed Insights integration for Core Web Vitals monitoring ✅
- Custom event tracking utilities for user interactions ✅
- Real-time performance monitoring via Vercel dashboard ✅
- Development debugging with console logging ✅
- **Production verification**: Analytics confirmed working with `/_vercel/insights/event` endpoint ✅
- **Free plan compatibility**: Works on all Vercel plans without Pro subscription ✅

✅ **tRPC API Routes & HTTP Endpoint Troubleshooting** - ✅ FULLY COMPLETED

- Resolved Next.js 15 App Router API route 404 issues ✅
- Fixed tRPC catch-all route pattern `[...trpc]` vs `[trpc]` ✅
- Corrected middleware public route configuration for tRPC ✅
- Removed problematic API rewrite rules in next.config.js ✅
- Verified tRPC endpoints work via HTTP requests (GET/POST) ✅
- All new API routes now register and execute properly ✅

### Outstanding Next Steps from Recent Completions

- **Section 2.1** - Error Boundaries and Production Alerting (4 remaining tasks)
- **Section 2.2** - Vercel Environment Variables and Production Testing (3 remaining tasks)
- **Section 7.2** - Enhanced Redis Backup Strategy (existing, needs completion)
- **Section 8.1** - Database Testing Suite (7 new tasks)

---

## Status Legend

- ✅ **Completed**
- 🔄 **In Progress**
- ❌ **Not Started**
- 🔍 **Needs Investigation**
- ⚠️ **Blocked/Issues**

---

## 1. Database & Storage Setup

### 1.1 Vercel KV (Upstash Redis) Database Setup ✅

**Priority: High** | **Estimated Time: 2-3 hours** | **Status: COMPLETED**

**Tasks:**

- [x] Create Vercel KV (Upstash Redis) database via Vercel marketplace integration
- [x] Configure environment variables (may be auto-added by integration):
  - `KV_URL` - Redis connection URL
  - `KV_REST_API_URL` - REST API endpoint
  - `KV_REST_API_TOKEN` - REST API authentication token
  - `KV_REST_API_READ_ONLY_TOKEN` - Read-only token for safe operations
- [x] Install required packages: `@vercel/kv` and `@upstash/redis`
- [x] Create Redis data structures for:
  - User preferences (Hash: `user:${userId}:preferences`)
  - Analytics data (Stream: `analytics:events`)
  - Blog posts (Hash: `blog:${slug}`, Set: `blog:published`)
  - Projects (Hash: `project:${slug}`, Set: `projects:featured`)
  - Comments (Hash: `comment:${id}`, List: `blog:${slug}:comments`)
- [x] Update tRPC server configuration to connect to Upstash Redis
- [x] Create initial seed data and Redis key structure

**Files to Create:**

- `apps/web/lib/db/redis.ts` - Upstash Redis connection and utilities ✅
- `apps/web/lib/db/schema.ts` - Redis data structure definitions ✅
- `apps/web/lib/db/seed.ts` - Seed data script for Redis ✅
- `apps/web/lib/trpc/client.ts` - tRPC client configuration ✅
- `scripts/seed-redis.ts` - Redis data management script ✅
- `scripts/test-trpc.ts` - tRPC endpoint testing script ✅

**Documentation:**

- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Upstash Redis Documentation](https://docs.upstash.com/redis)

**Completion Summary:**
✅ **Redis Infrastructure**: Fully implemented with connection utilities, health checks, and key generators
✅ **Data Structures**: Complete TypeScript interfaces for all data types (UserPreferences, BlogPost, Project, etc.)
✅ **Seed Data**: Sample blog posts, projects, and site statistics with comprehensive seeding scripts
✅ **tRPC Integration**: Full server implementation with organized routers (blog, projects, analytics, user)
✅ **Client Configuration**: tRPC React client setup for frontend integration
✅ **Management Scripts**: Redis seeding, clearing, and health check scripts with npm/pnpm commands
✅ **Testing**: Health checks and data verification working correctly

**Available Commands:**

- `pnpm seed:health` - Check Redis connection and basic operations
- `pnpm seed:seed` - Populate Redis with sample data
- `pnpm seed:clear` - Remove all seeded data from Redis
- `pnpm seed:reset` - Clear existing data and reseed

**Missing Next Steps from Vercel KV Guide:**

- [ ] **Comprehensive Testing**: Implement unit and integration tests for data operations (see Section 8.1)
- [ ] **Redis Monitoring**: Set up Redis monitoring and alerts (see Section 2.3)
- [ ] **Backup Strategy**: Implement backup procedures for Redis data (see Section 7.2)

**Next Steps**: Continue with Section 1.2 (PostgreSQL) or proceed to other infrastructure sections.

---

## 2. Error Tracking & Monitoring

### 2.1 Sentry Error Tracking Setup ✅

**Priority: High** | **Estimated Time: 2-3 hours** | **Status: COMPLETED**

**Tasks:**

- [x] Create Sentry project for charliearmstrongdev
- [x] Configure Sentry in Next.js application using modern instrumentation approach
- [x] Set up environment variables:
  - `SENTRY_DSN` ✅
  - `NEXT_PUBLIC_SENTRY_DSN` ✅
  - `SENTRY_ORG` ✅
  - `SENTRY_PROJECT` ✅
  - `SENTRY_AUTH_TOKEN` (for source maps - optional)
- [ ] Configure error boundaries in React components
- [x] Set up performance monitoring with traces and session replay
- [ ] Configure alerts for:
  - Error rate > 5%
  - Performance degradation > 20%
  - Memory usage spikes
- [ ] Enable source maps upload for better debugging

**Files Created:**

- `apps/web/instrumentation.ts` - Modern Next.js 15 server-side Sentry initialization ✅
- `apps/web/instrumentation-client.ts` - Client-side Sentry initialization with session replay ✅
- `apps/web/app/api/test-error/route.ts` - Server-side error testing endpoint ✅
- `apps/web/app/api/sentry-debug/route.ts` - Sentry configuration debug endpoint ✅
- `apps/web/app/test-error/page.tsx` - Client-side error testing page ✅

**Configuration Updates:**

- [x] Add Sentry test routes to `middleware.ts` ✅
- [x] Enhanced tRPC error formatter with Sentry integration ✅
- [x] Comprehensive logging and debugging setup ✅

**Implementation Notes:**

✅ **Modern Approach**: Used Next.js 15 instrumentation files instead of traditional config files
✅ **Server-side Tracking**: Full server error capture with detailed logging
✅ **Client-side Tracking**: Session replay integration with development-optimized settings
✅ **Testing Infrastructure**: Complete test endpoints for verification
✅ **Debug Capabilities**: Environment variable verification and configuration debugging
✅ **Error Capture Verified**: Successfully tested both handled and unhandled errors

**Remaining Tasks:**

- [ ] **Error Boundaries**: Implement React error boundaries for unhandled client errors
- [ ] **Alerting**: Configure Sentry alerts for error rates and performance
- [ ] **Source Maps**: Enable source map uploads for production debugging
- [ ] **Production Testing**: Verify error capture in production environment

### 2.2 LogRocket Session Replay Setup ✅

**Priority: Medium** | **Estimated Time: 1-2 hours** | **Status: COMPLETED**

**Tasks:**

- [x] Create LogRocket application
- [x] Configure LogRocket SDK with privacy settings
- [x] Set up environment variables:
  - `NEXT_PUBLIC_LOGROCKET_APP_ID=dwgouk/charliearmstrongdev` ✅
  - `LOGROCKET_RELEASE_VERSION=1.0.0` ✅
- [x] Integrate with user authentication (Clerk) ✅
- [x] Configure privacy settings for sensitive data ✅
- [x] Set up performance monitoring integration ✅
- [x] Create comprehensive test page for event tracking ✅
- [x] Add TypeScript declarations for LogRocket ✅

**Files Created:**

- `apps/web/lib/logrocket.ts` - LogRocket configuration and utilities ✅
- `apps/web/lib/analytics/logrocket-events.ts` - Event tracking utilities ✅
- `apps/web/app/LogRocketInit.tsx` - React component for initialization ✅
- `apps/web/app/test-logrocket/page.tsx` - Test page for LogRocket functionality ✅
- `apps/web/components/debug/LogRocketDebug.tsx` - Debug component ✅
- `apps/web/types/logrocket.d.ts` - TypeScript declarations ✅

**Configuration Updates:**

- [x] Added LogRocket initialization to app layout ✅
- [x] Configured user identification with Clerk integration ✅
- [x] Set up event tracking utilities ✅
- [x] Added comprehensive testing infrastructure ✅

**Implementation Notes:**

✅ **Modern Implementation**: Used latest LogRocket SDK with Next.js 15 compatibility
✅ **Privacy Compliant**: Configured input/text sanitization and request/response sanitizers
✅ **User Integration**: Automatic user identification when authenticated via Clerk
✅ **Event Tracking**: Custom event tracking with structured data
✅ **Testing Infrastructure**: Complete test page with event tracking, session URL retrieval, and error integration
✅ **TypeScript Support**: Full type safety with custom type declarations
✅ **Debug Capabilities**: Debug component for development environment

### 2.3 Redis (Vercel KV) Monitoring Setup ✅

**Priority: Medium** | **Estimated Time: 2-3 hours** | **Status: COMPLETED**

**Tasks:**

- [x] Set up Redis performance monitoring ✅
- [x] Configure alerts for:
  - High memory usage (> 80%) ✅
  - Connection failures ✅
  - Slow query performance (> 100ms) ✅
  - Rate limit threshold approaching ✅
- [x] Create Redis monitoring dashboard ✅
- [x] Set up automated health checks ✅
- [x] Configure performance metrics collection ✅
- [x] Integrate with existing error tracking (Sentry) ✅

**Files Created:**

- `apps/web/lib/monitoring/redis.ts` - Redis monitoring utilities ✅
- `scripts/redis-monitor.ts` - Redis monitoring script ✅
- `apps/web/components/monitoring/RedisMonitoringDashboard.tsx` - Dashboard component ✅
- `apps/web/app/monitoring/redis/page.tsx` - Monitoring page ✅

**Configuration Updates:**

- [x] Enhanced tRPC health endpoint with detailed Redis metrics ✅
- [x] Added Redis monitoring router to tRPC ✅
- [x] Added npm scripts for monitoring: `pnpm monitor:redis` ✅
- [x] Integrated Sentry alerting for critical issues ✅

**Implementation Notes:**

✅ **Comprehensive Metrics**: Connection status, response time, key count, and error rates
✅ **Real-time Dashboard**: Live monitoring dashboard at `/monitoring/redis`
✅ **Automated Alerts**: Integration with Sentry for critical and high-severity issues
✅ **Performance Thresholds**: Configurable alert thresholds for various metrics
✅ **Health Check Integration**: Enhanced tRPC health endpoint with detailed metrics
✅ **Script-based Monitoring**: Standalone monitoring script for automated checks

**Monitoring Metrics:**

- Connection pool status ✅
- Query response times ✅
- Memory usage patterns (via key count) ✅
- Error rates and types ✅
- Rate limiting statistics ✅

**Dashboard Access:** http://localhost:3000/monitoring/redis

**tRPC API Integration:** ✅ COMPLETED

- HTTP endpoint: `/api/trpc/monitoring.redis` ✅
- Real-time data access via GET requests ✅
- Integration with main health check endpoint ✅
- Proper Next.js 15 App Router compatibility ✅
- Authentication-free public access ✅

**Implementation Details:**

✅ **Catch-all Route Pattern**: Fixed `[...trpc]` routing for proper Next.js 15 compatibility
✅ **HTTP Method Exports**: Proper GET/POST exports for route handler recognition
✅ **Middleware Configuration**: Public route access for monitoring endpoints
✅ **Error Resolution**: Resolved 404/405 HTTP errors and route registration issues
✅ **Development Workflow**: Fixed cache clearing and unsaved file issues

**Remaining Tasks:**

- [ ] **Production Deployment**: Test monitoring in production environment
- [ ] **Alert Tuning**: Fine-tune alert thresholds based on production usage
- [ ] **Historical Data**: Consider implementing metrics storage for trend analysis

---

## 3. Analytics & Performance

### 3.1 Vercel Analytics Setup ✅

**Priority: Medium** | **Estimated Time: 30 minutes** | **Status: COMPLETED**

**Tasks:**

- [x] Enable Vercel Analytics in project dashboard ✅
- [x] Install @vercel/analytics package ✅
- [x] Install @vercel/speed-insights package ✅
- [x] Add Analytics component to layout ✅
- [x] Configure Web Vitals tracking ✅
- [x] Set up custom events tracking utilities ✅

**Files Created:**

- `apps/web/app/VercelAnalytics.tsx` - Vercel Analytics component ✅
- `apps/web/lib/analytics/vercel-analytics.ts` - Custom event tracking utilities ✅
- `apps/web/components/analytics/WebVitals.tsx` - Web Vitals tracking component ✅

**Files Updated:**

- `apps/web/app/layout.tsx` - Added Analytics components ✅
- `apps/web/package.json` - Added Vercel Analytics dependencies ✅

**Implementation Notes:**

✅ **Analytics Tracking**: Automatic page view and user behavior tracking via `/_vercel/insights/event`
✅ **Speed Insights**: Core Web Vitals monitoring (LCP, FID, CLS) via `/_vercel/insights/vitals`
✅ **Custom Events**: Pre-built utilities for tracking specific interactions
✅ **Performance Monitoring**: Real-time performance metrics in Vercel dashboard
✅ **Development Integration**: Console logging for development debugging
✅ **Free Plan Compatible**: Analytics included on all Vercel plans (no Pro plan required)
✅ **Modern Endpoint**: Uses current `/_vercel/insights/*` API endpoints

**Production Verification:** ✅ TESTED AND WORKING
- Analytics requests confirmed in browser DevTools at `/_vercel/insights/event`
- Page count increases visible in Vercel Analytics dashboard
- Custom event tracking functional in production environment

**Dashboard Access:** https://vercel.com/dashboard → Project → Analytics

**Available Custom Events:**
- Page views, project views, blog post views
- Contact form submissions, file downloads
- External link clicks, search queries
- User signup/login, error tracking

### 3.2 Google Analytics 4 Setup ✅

**Priority: Medium** | **Estimated Time: 1 hour** | **Status: COMPLETED & HYDRATION FIXED**

**Tasks:**

- [x] Create Google Analytics 4 property ✅
- [x] Configure GA4 tracking ID: `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` ✅
- [x] Implement Google Analytics component ✅
- [x] Create custom event tracking utilities ✅
- [x] Set up enhanced ecommerce (if applicable) ✅
- [x] Configure real-time reports ✅
- [x] Fix hydration errors in test pages ✅
- [x] Set up custom events for:
  - [x] Blog post views ✅
  - [x] Project views ✅
  - [x] Contact form submissions ✅
  - [x] External link clicks ✅
  - [x] File downloads ✅
  - [x] User authentication events ✅
  - [x] Error tracking ✅
  - [x] Performance metrics ✅

**Files Created/Updated:**

- `apps/web/app/GoogleAnalytics.tsx` - GA4 component with environment variable support ✅
- `apps/web/lib/analytics/google-analytics.ts` - Custom event tracking utilities ✅
- `apps/web/app/test-google-analytics/page.tsx` - Comprehensive test page ✅
- `apps/web/app/layout.tsx` - Already integrated GA component ✅

**Step-by-Step Setup Guide:**

**Step 1: Create Google Analytics 4 Property**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring" or "Create Property"
3. Enter your website details:
   - Property name: "CharlieArmstrongDev"
   - Country: Select your country
   - Currency: Select your currency
4. Choose "Web" as your platform
5. Enter website details:
   - Website URL: `https://charliearmstrong.dev`
   - Stream name: "CharlieArmstrongDev Web"
6. Copy your **Measurement ID** (starts with `G-`)

**Step 2: Configure Environment Variables**
1. **Local Development:**
   ```bash
   # Add to apps/web/.env.local
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

2. **Vercel Production:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` = `G-XXXXXXXXXX`
   - Deploy to apply changes

**Step 3: Test Implementation**
1. **Local Testing:**
   - Restart your development server: `pnpm dev`
   - Visit: `http://localhost:3000/test-google-analytics`
   - Test various events using the buttons
   - Check browser DevTools → Network tab for GA requests

2. **Production Testing:**
   - Deploy to production
   - Visit: `https://charliearmstrong.dev/test-google-analytics`
   - Test events and verify in GA4 real-time reports

**Step 4: Verify in Google Analytics**
1. **Real-time Reports:**
   - GA4 Dashboard → Reports → Realtime
   - Should see active users and events

2. **Event Tracking:**
   - GA4 Dashboard → Configure → Events
   - Should see custom events: `blog_view`, `project_view`, `contact_form_submit`, etc.

3. **Custom Parameters:**
   - GA4 Dashboard → Configure → Custom Definitions
   - Create custom dimensions for `custom_parameter_1` and `custom_parameter_2`

**Step 5: Enhanced Configuration (Optional)**
1. **Enhanced Ecommerce:** Configure if selling products/services
2. **Conversion Events:** Mark important events as conversions
3. **Audience Segments:** Create user segments for better insights
4. **Goals & Funnels:** Set up conversion funnels

**Implementation Notes:**

✅ **Environment Variable Support**: Component automatically uses `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
✅ **Privacy Compliant**: Includes `anonymize_ip: true` for GDPR compliance
✅ **Custom Event Tracking**: Comprehensive event utilities for all major interactions
✅ **Type Safety**: Full TypeScript support with proper types
✅ **Performance Optimized**: Uses Next.js Script component with `afterInteractive` strategy
✅ **Real-time Testing**: Test page for immediate verification
✅ **Production Ready**: Works in both development and production environments

**Available Custom Events:**
- `blog_view` - Blog post views with post title and slug
- `project_view` - Project page views with project name and type
- `contact_form_submit` - Contact form submissions with form type
- `external_link_click` - External link clicks with URL and text
- `file_download` - File downloads with filename and type
- `search` - Search queries with terms and result count
- `login/signup/logout` - User authentication events
- `error` - Error tracking with type and message
- `performance_metric` - Performance metrics with values and units

**Custom Parameters:**
- `custom_parameter_1` - Page/content type (blog_post, project, etc.)
- `custom_parameter_2` - Sub-category or user type
- Additional parameters for specific tracking needs

**Dashboard URLs:**
- **Real-time Reports:** https://analytics.google.com/analytics/web/#/realtime
- **Events:** https://analytics.google.com/analytics/web/#/analysis
- **Custom Definitions:** https://analytics.google.com/analytics/web/#/admin/custom-definitions

### 3.3 Core Web Vitals Monitoring ❌

**Priority: Medium** | **Estimated Time: 1 hour**

**Tasks:**

- [ ] Configure Web Vitals tracking
- [ ] Set up performance alerts for:
  - LCP > 2.5s
  - FID > 100ms
  - CLS > 0.1
- [ ] Integrate with Vercel Analytics
- [ ] Create performance dashboard

**Files to Create:**

- `apps/web/lib/web-vitals.ts` - Web Vitals tracking utilities

---

## 4. CI/CD & GitHub Configuration

### 4.1 Vercel Deployment Configuration ❌

**Priority: High** | **Estimated Time: 1 hour**

**Environment Variables to Configure in Vercel Dashboard:**

**Required for LogRocket:**

- [ ] `NEXT_PUBLIC_LOGROCKET_APP_ID=dwgouk/charliearmstrongdev`
- [ ] `LOGROCKET_RELEASE_VERSION=1.0.0`

**Required for Authentication:**

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Copy from local .env.local
- [ ] `CLERK_SECRET_KEY` - Copy from local .env.local
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/`

**Required for Error Tracking:**

- [ ] `SENTRY_DSN` - Copy from local .env.local
- [ ] `NEXT_PUBLIC_SENTRY_DSN` - Copy from local .env.local
- [ ] `SENTRY_ORG=charliearmstrongdev`
- [ ] `SENTRY_PROJECT=charliearmstrongdev`
- [ ] `SENTRY_AUTH_TOKEN` - Copy from local .env.local

**Required for Database:**

- [ ] `KV_URL` - Copy from local .env.local
- [ ] `KV_REST_API_URL` - Copy from local .env.local
- [ ] `KV_REST_API_TOKEN` - Copy from local .env.local
- [ ] `KV_REST_API_READ_ONLY_TOKEN` - Copy from local .env.local
- [ ] `REDIS_URL` - Copy from local .env.local

**Steps:**

1. [ ] Go to Vercel Dashboard → Project Settings → Environment Variables
2. [ ] Add all environment variables above for Production, Preview, and Development environments
3. [ ] Test deployment with LogRocket functionality
4. [ ] Verify LogRocket events appear in dashboard at https://app.logrocket.com/dwgouk/charliearmstrongdev

### 4.2 GitHub Secrets Setup ❌

**Priority: High** | **Estimated Time: 1 hour**

**Secrets to Configure:**

- [ ] `VERCEL_TOKEN` - For deployment
- [ ] `SENTRY_AUTH_TOKEN` - For Sentry integration
- [ ] `CLERK_SECRET_KEY` - For authentication
- [ ] `KV_REST_API_TOKEN` - For database access
- [ ] `GA_TRACKING_ID` - For analytics
- [ ] `NEXT_PUBLIC_LOGROCKET_APP_ID` - For session replay
- [ ] `LOGROCKET_RELEASE_VERSION` - For LogRocket releases

- [ ] Create GitHub Actions workflow for automated testing
- [ ] Set up deployment notifications
- [ ] Configure branch protection rules
- [ ] Enable dependabot for security updates

**Files to Create:**

- `.github/workflows/ci.yml` - Continuous integration
- `.github/workflows/deploy.yml` - Deployment workflow

### 4.3 Repository Security ❌

**Priority: High** | **Estimated Time: 30 minutes**

**Tasks:**

- [ ] Enable 2FA on GitHub account
- [ ] Configure branch protection for main branch
- [ ] Enable vulnerability alerts
- [ ] Set up code scanning (GitHub Advanced Security)
- [ ] Configure secret scanning

---

## 5. Authentication & Security

### 5.1 Clerk Authentication Configuration ❌

**Priority: High** | **Estimated Time: 2 hours**

**Tasks:**

- [ ] Configure Clerk application settings
- [ ] Set up OAuth providers (Google, GitHub)
- [ ] Configure user metadata collection
- [ ] Set up webhooks for user events
- [ ] Configure session management
- [ ] Set up 2FA for admin accounts

**Environment Variables:**

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`

### 5.2 Security Headers Configuration ❌

**Priority: High** | **Estimated Time: 1 hour**

**Tasks:**

- [ ] Configure Content Security Policy (CSP)
- [ ] Set up HSTS headers
- [ ] Configure X-Frame-Options
- [ ] Set up CORS for API routes
- [ ] Configure rate limiting

**Files to Update:**

- `apps/web/next.config.js` - Add security headers
- `apps/web/middleware.ts` - Add security middleware

---

## 6. Code Configuration

### 6.1 tRPC Configuration Files ❌

**Priority: High** | **Estimated Time: 2 hours**

**Files to Create:**

- [ ] `apps/web/lib/trpc/client.ts` - Client-side tRPC configuration
- [ ] Update `apps/web/lib/trpc/server.ts` - Add database integration
- [ ] `apps/web/lib/trpc/context.ts` - Request context (user auth, etc.)
- [ ] `apps/web/lib/trpc/routers/` - Modular router organization
  - `auth.ts` - Authentication routes
  - `blog.ts` - Blog management routes
  - `projects.ts` - Project management routes
  - `analytics.ts` - Analytics routes

**Current Status:** Basic tRPC setup exists, needs enhancement for production

### 6.2 Database Schema Implementation ❌

**Priority: High** | **Estimated Time: 3-4 hours**

**Schema Tables Needed:**

```typescript
// User Preferences
interface UserPreferences {
  userId: string;
  theme: "light" | "dark" | "system";
  notifications: boolean;
  newsletter: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Events
interface AnalyticsEvent {
  id: string;
  userId?: string;
  event: string;
  properties: Record<string, any>;
  timestamp: Date;
  sessionId: string;
}

// Blog Posts
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: string;
  status: "draft" | "published" | "archived";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

// Projects
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  status: "active" | "completed" | "archived";
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 7. Backup & Recovery

### 7.1 GitHub Repository Backup ❌

**Priority: Medium** | **Estimated Time: 1 hour**

**Tasks:**

- [ ] Set up automated repository mirroring
- [ ] Configure backup to external Git service
- [ ] Document recovery procedures
- [ ] Set up backup verification

### 7.2 Vercel KV Backup Process ❌

**Priority: Medium** | **Estimated Time: 2 hours**

**Tasks:**

- [ ] Document KV backup procedures
- [ ] Create backup scripts
- [ ] Set up automated backup scheduling
- [ ] Test restore procedures
- [ ] Document data retention policies

**Files to Create:**

- `scripts/backup-kv.ts` - KV backup script
- `scripts/restore-kv.ts` - KV restore script

### 7.3 Environment Variables Backup ❌

**Priority: High** | **Estimated Time: 30 minutes**

**Tasks:**

- [ ] Document all required environment variables
- [ ] Create secure backup of env variables (encrypted)
- [ ] Set up env variable versioning
- [ ] Document recovery procedures

**Files to Create:**

- `docs/environment-variables.md` - Complete env var documentation

---

## 8. Documentation & URLs

### 8.1 README Updates ❌

**Priority: Low** | **Estimated Time: 1 hour**

**Tasks:**

- [ ] Add live production URL
- [ ] Add staging/preview URLs
- [ ] Update deployment instructions
- [ ] Add monitoring dashboard links
- [ ] Update feature list with live services

### 8.2 Deployment Process Documentation ❌

**Priority: Medium** | **Estimated Time: 2 hours**

**Tasks:**

- [ ] Document complete deployment process
- [ ] Create deployment checklist
- [ ] Document rollback procedures
- [ ] Create troubleshooting guide for deployments

**Files to Update:**

- `docs/deployment.md` - Comprehensive deployment guide

---

## 9. Service-Specific 2FA Setup

### 9.1 Enable 2FA on All Services ❌

**Priority: High** | **Estimated Time: 1 hour**

**Services to Secure:**

- [ ] GitHub (repository access)
- [ ] Vercel (hosting & deployment)
- [ ] Clerk (authentication service)
- [ ] Sentry (error tracking)
- [ ] Google Analytics (analytics)
- [ ] LogRocket (session replay)

---

## 10. CORS & API Configuration

### 10.1 CORS Settings ❌

**Priority: Medium** | **Estimated Time: 1 hour**

**Tasks:**

- [ ] Configure CORS for API routes
- [ ] Set up allowed origins for production/staging
- [ ] Configure preflight handling
- [ ] Set up API rate limiting
- [ ] Configure API authentication

**Files to Update:**

- `apps/web/middleware.ts` - Add CORS handling
- `apps/web/next.config.js` - API configuration

---

## 8. Testing Infrastructure

### 8.1 Database Testing Suite ❌

**Priority: Medium** | **Estimated Time: 3-4 hours**

**Tasks:**

- [ ] Set up Redis testing environment
- [ ] Create unit tests for data operations
- [ ] Implement integration tests for tRPC endpoints
- [ ] Set up test data fixtures and factories
- [ ] Create performance tests for Redis operations
- [ ] Configure test database isolation
- [ ] Add continuous integration testing

**Files to Create:**

- `apps/web/tests/lib/db/redis.test.ts` - Redis connection and utility tests
- `apps/web/tests/lib/db/schema.test.ts` - Data validation and serialization tests
- `apps/web/tests/lib/trpc/server.test.ts` - tRPC endpoint integration tests
- `apps/web/tests/fixtures/redis-data.ts` - Test data fixtures
- `scripts/test-setup-redis.ts` - Test environment setup

**Testing Coverage:**

- Connection establishment and health checks
- CRUD operations for all data types (users, blog posts, projects, analytics)
- Error handling and edge cases
- Data serialization/deserialization
- Performance benchmarks
- Concurrent operation handling

### 8.2 End-to-End Testing Enhancement ❌

**Priority: Low** | **Estimated Time: 2-3 hours**

**Tasks:**

- [ ] Extend Cypress tests to include database operations
- [ ] Test user workflows with Redis integration
- [ ] Add performance testing for database-heavy pages
- [ ] Test error scenarios and recovery

**Files to Update:**

- `apps/web/tests/e2e/` - Add database-related E2E tests

---

## Implementation Priority Order

### Phase 1: Core Infrastructure (Week 1)

1. Vercel KV Database Setup
2. tRPC Configuration Files
3. Database Schema Implementation
4. GitHub Secrets Setup
5. Security Headers Configuration

### Phase 2: Monitoring & Analytics (Week 2)

1. Sentry Error Tracking Setup
2. Vercel Analytics Setup
3. Google Analytics Setup
4. Core Web Vitals Monitoring
5. LogRocket Session Replay Setup

### Phase 3: Security & Backup (Week 3)

1. 2FA Setup on All Services
2. Clerk Authentication Configuration
3. Backup Strategy Implementation
4. CORS Configuration

### Phase 4: Documentation & Polish (Week 4)

1. Documentation Updates
2. Deployment Process Documentation
3. Performance Monitoring Setup
4. Final Testing & Validation

---

## Environment Variables Checklist

### Required for Production:

```bash
# Database
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Error Tracking
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=

# Analytics
GA_TRACKING_ID=
NEXT_PUBLIC_LOGROCKET_APP_ID=dwgouk/charliearmstrongdev
LOGROCKET_RELEASE_VERSION=1.0.0

# Deployment
VERCEL_TOKEN=
```

---

## Completion Tracking

**Total Tasks:** 4/87 ✅
**Phase 1:** 0/20 ✅
**Phase 2:** 4/25 ✅  
**Phase 3:** 0/22 ✅
**Phase 4:** 0/20 ✅

---

_Last Updated: June 3, 2025_
_Next Review: [Date]_

## Notes & Issues

### LogRocket Integration Notes (Completed)

- ✅ **Dashboard Access**: LogRocket dashboard available at https://app.logrocket.com/dwgouk/charliearmstrongdev
- ✅ **Event Tracking**: Custom events tracked via `trackLogRocketEvent()` function
- ✅ **Session URLs**: Available via `getLogRocketSessionURL()` for support tickets
- ✅ **User Identification**: Automatic identification when users sign in via Clerk
- ✅ **Privacy Compliance**: Input/text sanitization enabled, sensitive headers redacted
- ✅ **Testing**: Complete test page at `/test-logrocket` for verification
- ✅ **Build Issues**: Fixed TypeScript build error with proper Window interface declaration

### Vercel Environment Variables Required

LogRocket requires these environment variables to be set in Vercel dashboard:

- `NEXT_PUBLIC_LOGROCKET_APP_ID=dwgouk/charliearmstrongdev`
- `LOGROCKET_RELEASE_VERSION=1.0.0`

### Local Build Issues

If `pnpm build` freezes locally but works on Vercel:

- Clear Node.js cache: `pnpm store prune`
- Restart VS Code and terminal
- Check for hanging processes
- Vercel build environment is more stable for this project

- Add any implementation notes or issues encountered here
- Link to relevant documentation or resources
- Track decisions made during implementation
