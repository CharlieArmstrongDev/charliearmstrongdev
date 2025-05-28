# Contributing to CharlieArmstrongDev

Thank you for your interest in contributing to CharlieArmstrongDev! This document outlines the process for contributing to this project.

## Development Workflow

1. **Fork the Repository**: Start by forking the repository to your GitHub account.

2. **Clone your Fork**: Clone your fork to your local machine.

   ```bash
   git clone https://github.com/YOUR-USERNAME/charliearmstrongdev.git
   cd charliearmstrongdev
   ```

3. **Install Dependencies**: Install the project dependencies.

   ```bash
   pnpm install
   ```

4. **Create a Branch**: Create a new branch for your feature or bugfix.

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make Changes**: Make your changes to the codebase.

6. **Test Your Changes**: Ensure that your changes pass all tests.

   ```bash
   pnpm test
   ```

7. **Lint Your Code**: Run the linter to ensure your code follows our style guide.

   ```bash
   pnpm lint
   ```

8. **Commit Your Changes**: Commit your changes with a descriptive commit message.

   ```bash
   git commit -m "feat: add new feature"
   ```

9. **Push Your Changes**: Push your changes to your fork.

   ```bash
   git push origin feature/your-feature-name
   ```

10. **Create a Pull Request**: Open a pull request from your fork to the main repository.

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for changes that do not affect the meaning of the code (formatting, etc.)
- `refactor:` for code changes that neither fix a bug nor add a feature
- `perf:` for performance improvements
- `test:` for adding or updating tests
- `chore:` for changes to the build process or auxiliary tools and libraries

## Pull Request Process

1. Update the README.md or documentation with details of changes, if applicable.
2. Update the version numbers in any examples files to the new version that this PR would represent.
3. The PR must pass all CI checks before it can be merged.
4. A maintainer will review your PR and provide feedback.

## Code of Conduct

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) in all your interactions with the project.

## Questions?

If you have any questions or need help, feel free to open an issue or contact the maintainers.

Thank you for contributing!
