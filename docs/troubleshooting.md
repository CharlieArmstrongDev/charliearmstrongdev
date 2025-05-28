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
const { withClerk } = require('@clerk/nextjs/api');

// Correct
const { withClerk } = require('@clerk/nextjs');
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
