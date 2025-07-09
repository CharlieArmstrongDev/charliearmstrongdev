# Documentation Index

This directory contains comprehensive documentation for the charliearmstrongdev project.

## Architecture & Design

- [**Architecture Overview**](./architecture.md) - Project structure and architectural decisions
- [**Domain Driven Design**](./ddd.md) - DDD principles and implementation
- [**Tech Stack**](./tech-stack.md) - Technologies and libraries used

## Development

- [**TypeScript Configuration**](./typescript.md) - TypeScript setup and best practices
- [**Dependencies Management**](./dependencies.md) - Package management and updates
- [**Performance Optimization**](./performance.md) - Performance strategies and monitoring

## Infrastructure & Monitoring

- [**Redis Monitoring**](./redis-monitoring.md) - Comprehensive Redis/Vercel KV monitoring guide
- [**Database Setup**](./database.md) - Database configuration and management
- [**Troubleshooting Guide**](./troubleshooting.md) - Common issues and solutions

## Deployment & CI/CD

- [**CI/CD Pipeline**](./ci-cd.md) - Continuous integration and deployment
- [**Rendering Strategies**](./rendering-strategies.md) - SSR, SSG, and ISR implementation
- [**Edge Functions**](./edge-functions.md) - Edge computing and serverless functions

## SEO & Content

- [**SEO & Sitemap**](./seo-sitemap.md) - Search engine optimization and sitemap generation

## Recent Additions

### ✅ Redis Monitoring Documentation

Complete documentation for the Redis monitoring system including:

- Real-time dashboard usage (`/monitoring/redis`)
- Alert configuration and thresholds
- tRPC API integration (`/api/trpc/monitoring.redis`)
- Troubleshooting common monitoring issues
- Production deployment guide

### ✅ tRPC API Routes Implementation

Comprehensive tRPC endpoint implementation and troubleshooting documentation:

- Next.js 15 App Router compatibility fixes
- Catch-all route pattern implementation (`[...trpc]`)
- Middleware configuration for public tRPC endpoints
- HTTP method exports (GET/POST) for proper routing
- Cache clearing and development server troubleshooting
- Clerk authentication integration with tRPC context

### ✅ API Route Troubleshooting Guide

Enhanced troubleshooting documentation covering:

- 404 and 405 error resolution for tRPC endpoints
- Next.js routing pattern best practices
- VS Code file saving issues affecting route registration
- Development server cache problems and solutions

## Quick Reference

### Monitoring Dashboards

- **Redis Monitoring**: `http://localhost:3000/monitoring/redis`
- **Health Check**: `http://localhost:3000/api/trpc/health`

### Common Commands

```bash
# Health checks
pnpm seed:health
pnpm monitor:redis

# Testing
pnpm test:trpc
pnpm test:e2e

# Development
pnpm dev
pnpm build
```

### Key Documentation Files

- [troubleshooting.md](./troubleshooting.md) - First stop for development issues
- [redis-monitoring.md](./redis-monitoring.md) - Monitoring system documentation
- [architecture.md](./architecture.md) - Understanding the project structure

## Contributing to Documentation

When adding new features or fixing issues:

1. Update relevant documentation files
2. Add troubleshooting entries for common problems
3. Include examples and code snippets
4. Update this index with new documentation
5. Test all documented procedures

## Documentation Standards

- Use clear, descriptive headings
- Include code examples with syntax highlighting
- Provide step-by-step instructions
- Document both success and error scenarios
- Keep documentation up to date with code changes
