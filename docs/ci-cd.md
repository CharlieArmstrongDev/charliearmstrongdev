# CI/CD Pipeline Documentation

This document outlines the CI/CD pipeline setup for the charliearmstrongdev project, detailing the workflows for continuous integration and deployment.

## Continuous Integration (CI)

The CI workflow is defined in the `.github/workflows/ci.yml` file. This workflow is triggered on every push and pull request to the main branches. It includes the following steps:

1. **Checkout Code**: The workflow checks out the code from the repository.
2. **Set Up Node.js**: It sets up the Node.js environment using the specified version.
3. **Install Dependencies**: The workflow installs project dependencies using `pnpm`.
4. **Linting**: It runs ESLint to check for code quality and style issues.
5. **Type Checking**: TypeScript is used to check for type errors in the codebase.
6. **Run Tests**: Unit tests and integration tests are executed using Jest and Cypress.

### Example CI Workflow (ci.yml)

```yaml
name: CI

on:
  push:
    branches:
      - main
      - "feature/*"
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"

      - name: Install dependencies
        run: pnpm install

      - name: Run ESLint
        run: pnpm lint

      - name: Type check
        run: pnpm type-check

      - name: Run tests
        run: pnpm test
```

## Continuous Deployment (CD)

The CD workflow is defined in the `.github/workflows/deploy.yml` file. This workflow is triggered on successful merges to the main branch. It handles both preview and production deployments.

### Vercel Deployment

The project uses Vercel for continuous deployment with the following configuration:

1. **GitHub Integration**: The repository is connected to Vercel for automated deployments.
2. **Environment Variables**: All necessary environment variables are configured in the Vercel project settings.
3. **Custom Install Command**: To handle pnpm compatibility issues, we use a custom install command:

   ```
   npm i -g pnpm@8.10.0 && pnpm install --no-frozen-lockfile
   ```

4. **Build Configuration**: The build is configured in `vercel.json` to ensure consistent deployment:

   ```json
   {
     "buildCommand": "pnpm build",
     "installCommand": "npm i -g pnpm@8.10.0 && pnpm install --no-frozen-lockfile",
     "framework": "nextjs"
   }
   ```

### Deployment Environments

The project has three deployment environments:

1. **Production**: Deployed from the `main` branch.
2. **Preview**: Automatically deployed for pull requests for testing before merging.
3. **Development**: Used for testing features in isolation.

### Troubleshooting Common Deployment Issues

1. **pnpm Compatibility**: Using pnpm@8.10.0 on Vercel to avoid "ERR_INVALID_THIS" errors
2. **Package Path Errors**: Ensure packages are properly exported in the package.json
3. **Environment Variables**: Verify all required environment variables are set in Vercel project settings
4. **Build Caching**: Clear deployment cache if experiencing persistent build issues

### Example CD Workflow (deploy.yml)

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Install dependencies
        run: pnpm install

      - name: Deploy to Vercel
        run: pnpm vercel --prod
```

## Summary

This CI/CD setup ensures that the code is continuously integrated and deployed, maintaining high code quality and enabling rapid development cycles. The use of GitHub Actions allows for automation of testing and deployment processes, making it easier to manage the project efficiently.
