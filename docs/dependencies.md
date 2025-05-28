# Dependency Management

This document outlines the dependency management strategy used in the charliearmstrongdev project, including version control, security practices, and upgrade procedures.

## Package Manager

The project uses pnpm v10.11.0 as the package manager of choice for several reasons:

- **Performance**: pnpm offers faster installation times compared to npm or yarn
- **Disk Efficiency**: Uses a content-addressable store to avoid duplication of packages
- **Monorepo Support**: Native support for monorepo architecture through workspaces

## Version Strategy

### Core Dependencies

For core dependencies that affect application stability, we use exact or caret-limited versioning:

- **React**: v18.2.0 (exact version)
- **Next.js**: v15.3.2 (exact version)
- **@clerk/nextjs**: ^5.0.0 (major version locked)
- **React Query**: ^5.77.2 (major version locked)
- **Sentry**: ^9.23.0 (major version locked)

### Development Dependencies

For development tools, we're more flexible with versioning:

- **ESLint**: Uses dual versioning (`^8.0.0 || ^9.0.0`) to support both v8 and v9
- **Prettier**: Latest version is used as formatting rules are more stable
- **TypeScript**: Latest version to benefit from type system improvements

## Security & Performance Optimizations

### Dependency Overrides

The project uses pnpm's overrides feature to enforce specific versions of critical dependencies:

```json
"pnpm": {
  "overrides": {
    "esbuild": "^0.25.5",
    "undici": "^7.10.0",
    "glob": "^8.1.0",
    "rimraf": "^5.0.0",
    "abab": "^2.0.6"
  }
}
```

This ensures that even transitive dependencies are kept at secure and performant versions.

## Vercel Deployment Configuration

To ensure smooth deployments on Vercel with pnpm, we've implemented the following configurations:

### vercel.json Configuration

A custom `vercel.json` file is used to control the build process:

```json
{
  "buildCommand": "pnpm build",
  "installCommand": "npm i -g pnpm@8.10.0 && pnpm install --no-frozen-lockfile",
  "framework": "nextjs"
}
```

### Package Manager Version

For Vercel compatibility, we use pnpm v8.10.0 during deployment, while local development uses pnpm v10.11.0. This dual configuration helps avoid "ERR_INVALID_THIS" errors that can occur with the newest pnpm versions in the Vercel environment.

### Troubleshooting Dependencies

Common issues and their solutions:

1. **ERR_PNPM_FETCH_404**: Check for nonexistent or mistyped package names
2. **ERR_INVALID_THIS**: Use pnpm v8.x in Vercel environments
3. **Dependencies with "latest" versioning**: Pin dependencies to specific versions when deploying to production

To debug dependency issues:

```bash
# View dependency tree
pnpm list --depth=1

# Check for specific warnings or issues
pnpm why <package-name>
```

## Maintenance Schedule

- **Weekly**: Check for security updates
- **Monthly**: Audit dependencies with `pnpm audit`
- **Quarterly**: Review and update major dependencies
