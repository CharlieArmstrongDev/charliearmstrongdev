# CharlieArmstrongDev

This repository contains the code for charliearmstrongdev, built with Next.js, TypeScript, and React. The website serves as a portfolio to showcase my skills, projects, and experiences as a web developer.

## Tech Stack

- **Next.js**: A React framework for building server-rendered applications.
- **TypeScript**: A superset of JavaScript that adds static types.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **ShadCN**: A component library for building UI with Tailwind CSS.
- **tRPC**: A framework for building type-safe APIs.
- **React Query**: For data fetching and state management (@tanstack/react-query v5.77.2).
- **Clerk**: For user authentication (@clerk/nextjs).
- **Vercel KV**: For database solutions.
- **pnpm**: Package manager (v10.11.0) for dependency management.
- **Cypress**: For end-to-end testing.
- **Jest**: For unit testing.
- **Sentry**: For error tracking and performance monitoring (@sentry/nextjs v9.23.0).
- **LogRocket**: For session replay and logging.

## Features

- **Responsive Design**: The website is designed to be fully responsive and accessible.
- **Server Components**: Utilizes Next.js server components for improved performance.
- **Static Site Generation (SSG)** and **Incremental Static Regeneration (ISR)**: For optimal performance and SEO.
- **Dynamic Imports**: Heavy components are loaded dynamically to improve initial load times.
- **Service Worker**: Implemented for offline capabilities.
- **CI/CD**: Continuous integration and deployment workflows are set up using GitHub Actions.
- **Optimized Dependencies**: Critical dependencies are version-pinned and overridden for security and performance.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/charliearmstrongdev.git
   cd charliearmstrongdev
   ```

2. **Install dependencies**:

   ```bash
   # Requires pnpm v10.11.0 or higher
   pnpm install
   ```

3. **Environment Setup**:

   ```bash
   # Copy the example env file and update with your values
   cp .env.example .env.local
   ```

4. **Run the development server**:

   ```bash
   pnpm dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`.

## Documentation

Comprehensive documentation is available in the `docs` directory, covering:

- [Architecture](docs/architecture.md)
- [CI/CD Pipeline](docs/ci-cd.md)
- [Domain Driven Design](docs/ddd.md)
- [Edge Functions](docs/edge-functions.md)
- [Performance Optimizations](docs/performance.md)
- [Rendering Strategies](docs/rendering-strategies.md)
- [Tech Stack](docs/tech-stack.md)
- [Advanced TypeScript Usage](docs/typescript.md)
- [Troubleshooting Guide](docs/troubleshooting.md)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Dependency Management

This project uses pnpm (v10.11.0) for dependency management in a monorepo structure. Key aspects of dependency management include:

- **Monorepo Structure**: Using workspaces for apps and shared packages
- **Dependency Overrides**: Critical dependencies like esbuild (v0.25.5) and undici (v7.10.0) are overridden at the root level
- **Security Patching**: Automatically applies security patches through overrides
- **Version Control**: Specific versions are pinned for core dependencies to ensure stability

To update dependencies:

```bash
# Check for outdated packages
pnpm outdated

# Update packages safely
pnpm update --interactive
```
