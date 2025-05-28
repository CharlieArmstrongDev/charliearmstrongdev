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

### Upgrade Procedures

Regular dependency maintenance follows these steps:

1. **Weekly Security Audits**:
   ```bash
   pnpm audit
   ```

2. **Monthly Dependency Reviews**:
   ```bash
   pnpm outdated
   ```
   
3. **Selective Updates**:
   ```bash
   pnpm update --interactive
   ```

4. **Full Verification After Updates**:
   ```bash
   pnpm test && pnpm lint && pnpm build
   ```

## Troubleshooting Common Dependency Issues

### Resolving Peer Dependency Warnings

If you encounter peer dependency warnings, first check if they affect functionality. Non-critical warnings can be addressed by adding appropriate versions to the overrides section.

### Handling Deprecated Packages

When packages are deprecated:
1. Check for recommended replacements in the warning messages
2. Update the package to the recommended alternative
3. Update all imports and usages throughout the codebase

## Monitoring and Automation

- **Dependabot**: Configured to automatically open PRs for security updates
- **Continuous Integration**: All PRs are tested to ensure dependency changes don't break functionality
- **Package Health Tracking**: Regular checks on dependency health and maintenance status
