# Sentry Webpack Plugin Notes

## Current Status

✅ **Sentry Error Tracking**: Working via instrumentation files
✅ **Async redirects() and rewrites()**: Restored and working
✅ **pnpm + Turbo Build**: Working correctly
❌ **Sentry Webpack Plugin**: Disabled due to build issues

## Issue Description

The Sentry webpack plugin causes build failures on Windows with:
- `Error: EPERM: operation not permitted, open '.next\trace'`
- `unhandledRejection [TypeError: invalid pattern]`

## Current Workaround

Sentry error tracking is functional through:
- `instrumentation.ts` (server-side)
- `instrumentation-client.ts` (client-side)
- Traditional `sentry.*.config.ts` files

## To Re-enable Sentry Webpack Plugin

1. Ensure environment variables are set:
   ```
   SENTRY_ORG=your-org
   SENTRY_PROJECT=your-project
   SENTRY_AUTH_TOKEN=your-token
   ```

2. Uncomment the Sentry configuration in `next.config.js`:
   ```javascript
   const { withSentryConfig } = require('@sentry/nextjs');
   
   // ... existing config ...
   
   module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
   ```

3. Test the build:
   ```bash
   pnpm build
   ```

## Benefits of Webpack Plugin

When working, the webpack plugin provides:
- Source map uploads to Sentry
- Better error stack traces in production
- Automatic release management
- Bundle analysis and optimization

## Alternative Commands

Use these commands instead of npm:
- `pnpm dev` (instead of `npm run dev`)
- `pnpm build` (instead of `npm run build`)
- `pnpm lint` (instead of `npm run lint`)

Turbo handles parallel execution and caching automatically.
