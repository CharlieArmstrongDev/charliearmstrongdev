# Tech Stack Documentation

This document outlines the technology stack used in the charliearmstrongdev project, detailing the frameworks, libraries, and tools that contribute to the development and functionality of the application.

## Frontend

- **Next.js**: A React framework that enables server-side rendering, static site generation, and API routes, providing a robust structure for building web applications.
- **React**: A JavaScript library for building user interfaces, allowing for the creation of reusable UI components.
- **TypeScript**: A superset of JavaScript that adds static typing, enhancing code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework that facilitates rapid UI development with a focus on responsiveness and customization.
- **ShadCN**: A component library that integrates with Tailwind CSS, providing pre-designed components that adhere to modern design principles.
- **React Query**: A data-fetching library that simplifies state management and server state synchronization, providing caching and background updates.

## Backend

- **tRPC**: A framework for building type-safe APIs, allowing for seamless communication between the frontend and backend while leveraging TypeScript for type safety.
- **Vercel KV (Upstash Redis)**: Serverless Redis database providing high-performance data storage with automatic scaling. Implements optimized data structures for user preferences, analytics events, blog posts, and projects with full TypeScript integration and schema validation.

## Authentication

- **Clerk**: A user authentication service (@clerk/nextjs v5.0.0) that simplifies the implementation of user sign-up, sign-in, and session management.

## Performance and Optimization

- **Service Workers**: Implemented for offline capabilities, enhancing the user experience by caching assets and API responses.
- **Next/Image**: A built-in image optimization component in Next.js that automatically optimizes images for faster loading times.
- **Dynamic Imports**: Used for loading heavy components only when needed, improving initial load performance.
- **Vercel Analytics**: Integrated for performance monitoring and insights into user interactions.
- **Optimized Dependencies**: Using latest versions of critical dependencies (esbuild v0.25.5, undici v7.10.0) to ensure security and performance.

## Development Tools

- **pnpm**: A fast and efficient package manager that optimizes the installation of dependencies.
- **ESLint**: A static code analysis tool for identifying and fixing problems in JavaScript and TypeScript code.
- **Prettier**: A code formatter that enforces consistent style across the codebase.
- **Jest**: A testing framework for unit testing React components and other JavaScript code.
- **React Testing Library**: A library for testing React components in a way that resembles how users interact with them.
- **Cypress**: An end-to-end testing framework that allows for testing the entire application in a real browser environment.
- **esbuild**: High-performance JavaScript bundler (v0.25.5) for faster builds.
- **undici**: Modern HTTP client (v7.10.0) used as a dependency for various network operations.

## CI/CD

- **GitHub Actions**: Used for automating workflows, including linting, type checking, running tests, and deploying the application to Vercel.

## Documentation and Structure

- **Domain Driven Design (DDD)**: The project is structured following DDD principles, ensuring that the codebase is organized around the business domain and its logic.
- **Turborepo**: A high-performance build system for managing monorepos, allowing for efficient development and deployment of multiple packages.

This tech stack provides a solid foundation for building a modern, scalable, and maintainable developer portfolio site, showcasing advanced web development practices and technologies.
