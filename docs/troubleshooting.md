# Troubleshooting Guide

This document provides solutions for common issues encountered during development and deployment of the charliearmstrongdev project.

## Vercel Deployment Issues

### Clerk API Path Not Exported Error

**Error Message:**

```
⨯ Failed to load next.config.js
[Error: Package subpath './api' is not defined by "exports" in /vercel/path0/node_modules/@clerk/nextjs/package.json] {
  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
}
```

**Solution:**
Update the import in `next.config.js` from `@clerk/nextjs/api` to `@clerk/nextjs`:

```javascript
// Incorrect
const { withClerk } = require("@clerk/nextjs/api");

// Correct
const { withClerk } = require("@clerk/nextjs");
```

This change is necessary because newer versions of `@clerk/nextjs` (v5+) have changed their export structure.

### PNPM Installation Errors (ERR_INVALID_THIS)

**Error Message:**

```
ERR_PNPM_META_FETCH_FAIL GET https://registry.npmjs.org/typescript: Value of "this" must be of type URLSearchParams
```

**Solution:**

1. Use a specific version of PNPM with Vercel (v8.10.0 works well)
2. Configure your `vercel.json`:

```json
{
  "buildCommand": "pnpm build",
  "installCommand": "npm i -g pnpm@8.10.0 && pnpm install --no-frozen-lockfile",
  "framework": "nextjs"
}
```

3. Add a `.npmrc` file with these settings:

```
registry=https://registry.npmjs.org/
node-linker=hoisted
```

## Local Development Issues

### Dependency Version Conflicts

**Issue:** Conflicting peer dependencies or incompatible package versions.

**Solution:**
Use PNPM overrides in your root `package.json`:

```json
"pnpm": {
  "overrides": {
    "esbuild": "^0.25.5",
    "undici": "^7.10.0",
    "glob": "^8.1.0",
    "rimraf": "^5.0.0"
  }
}
```

### Next.js Build Errors

**Issue:** TypeScript or ESLint errors preventing build completion.

**Solution:**

1. Run `pnpm lint --fix` to fix auto-fixable issues
2. Check that TypeScript version is compatible with Next.js version
3. Ensure all imports use the correct paths as specified in documentation

## Performance Issues

### Slow Initial Page Load

**Issue:** First page load is slow due to large JavaScript bundles.

**Solution:**

1. Implement code splitting with dynamic imports
2. Enable server components where appropriate
3. Use next/image with proper optimization settings
4. Implement proper caching strategies

## Authentication Issues

### Clerk Authentication Failures

**Issue:** Authentication not working as expected.

**Solution:**

1. Verify environment variables are set correctly
2. Make sure middleware is properly configured
3. Check Clerk dashboard for API key status
4. Use the correct Clerk components for sign-in and sign-up flows

## tRPC and API Routes Issues

### tRPC Endpoints Returning 404 Errors ✅ RESOLVED

**Problem:** New tRPC endpoints and API routes return 404 errors even though they exist and Next.js appears to start successfully.

**Status:** ✅ **RESOLVED** - tRPC endpoints are now fully operational at `/api/trpc/*`

**Resolution Summary:**

- Fixed catch-all route pattern: `[...trpc]` instead of `[trpc]`
- Added tRPC endpoints to public routes in middleware
- Removed problematic API rewrites from next.config.js
- Addressed VS Code unsaved file issues
- Implemented proper GET/POST exports in route handlers

**Common Causes & Solutions:**

#### 1. Incorrect Route File Pattern

**Issue:** Using `[trpc]` instead of `[...trpc]` for catch-all routes.

**Error:** Routes like `/api/trpc/monitoring.redis` return 404

**Solution:** Use the correct catch-all pattern:

```
✅ Correct: apps/web/app/api/trpc/[...trpc]/route.ts
❌ Wrong:   apps/web/app/api/trpc/[trpc]/route.ts
```

#### 2. Unsaved Changes in VS Code

**Issue:** File changes not saved in editor, so Next.js reads old version from disk.

**Error:** `⨯ No HTTP methods exported in route.ts`

**Solution:** Always save files before testing API routes. Look for unsaved indicators in VS Code.

#### 3. Middleware Route Protection

**Issue:** New API routes blocked by authentication middleware.

**Error:** Routes return 404 or redirect to sign-in

**Solution:** Add public routes to middleware configuration:

```typescript
// apps/web/middleware.ts
const isPublicRoute = createRouteMatcher([
  // ...existing routes...
  "/api/trpc(.*)", // tRPC endpoints
  "/api/your-new-route", // Add new API routes here
]);
```

#### 4. Problematic Next.js Rewrites

**Issue:** Global API rewrites interfering with route resolution.

**Error:** All API routes redirect to tRPC unexpectedly

**Solution:** Remove or correct problematic rewrites in `next.config.js`:

```javascript
// Remove this if it exists:
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: '/api/trpc/:path*', // This breaks other API routes
    },
  ];
}
```

#### 5. Cache Issues

**Issue:** Next.js serving cached version of routes.

**Solution:** Clear cache and restart dev server:

```bash
# Clear Next.js cache
rm -rf apps/web/.next

# Kill all node processes (Windows)
taskkill /F /IM node.exe

# Restart dev server
pnpm dev
```

### tRPC Method Not Allowed (405) Errors

**Issue:** tRPC endpoints return 405 instead of processing requests.

**Common Causes:**

1. **Wrong HTTP Method for Procedure Type**
   - Use GET for `query` procedures
   - Use POST for `mutation` procedures

2. **Missing Route Exports**
   - Ensure both GET and POST are exported from route file

**Example Fix:**

```typescript
// apps/web/app/api/trpc/[...trpc]/route.ts
export async function GET(req: Request, context: any) {
  return handler(req, context);
}

export async function POST(req: Request, context: any) {
  return handler(req, context);
}
```

### Testing tRPC Endpoints

**Server-side Testing:**

```bash
# Test via tRPC caller (bypasses HTTP)
pnpm test:trpc
```

**HTTP Testing:**

```bash
# Test query procedures (GET)
curl http://localhost:3000/api/trpc/monitoring.redis

# Test mutation procedures (POST)
curl -X POST http://localhost:3000/api/trpc/user.updatePreferences \
  -H "Content-Type: application/json" \
  -d '{"preferences": {"theme": "dark"}}'
```

### Debugging Steps

1. **Check server logs** for route registration and errors
2. **Verify file existence** and correct naming
3. **Test simple API routes** first to isolate tRPC issues
4. **Check git status** for untracked or conflicting files
5. **Verify middleware configuration** for route access
6. **Clear cache and restart** development server
7. **Test with curl** to bypass browser caching

**Completion Verification:**

- ✅ tRPC endpoints respond to HTTP requests
- ✅ Debug logs appear in server output
- ✅ No "No HTTP methods exported" errors
- ✅ Middleware allows access to endpoints
- ✅ Both GET and POST methods work appropriately
