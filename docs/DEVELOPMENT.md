# 🛠️ Development Guide

This guide covers everything you need to know to contribute to Zora-chan, from setting up your development environment to understanding the codebase architecture.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Quality](#code-quality)
- [Testing](#testing)
- [Environment Configuration](#environment-configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - [Installation Guide](https://pnpm.io/installation)
- **Git** - [Download](https://git-scm.com/)
- **A code editor** (VS Code recommended)

### Optional but Recommended

- **VS Code Extensions:**
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Prettier - Code formatter
  - ESLint

## ⚡ Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/zora-chan.git
   cd zora-chan
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.template .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
zora-chan/
├── .github/                    # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml             # Main CI/CD pipeline
│       └── dependency-update.yml
├── docs/                      # Documentation
│   ├── DEVELOPMENT.md         # This file
│   ├── API.md                 # API documentation
│   └── DEPLOYMENT.md          # Deployment guide
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── api/              # API routes
│   │   ├── coins/            # Coins page
│   │   ├── explore/          # Explore page
│   │   ├── mint/             # Mint page
│   │   ├── trade/            # Trade page
│   │   └── vote/             # Vote page
│   ├── components/           # Reusable components
│   │   ├── ui/               # UI components
│   │   ├── mint/             # Mint-specific components
│   │   └── navbars/          # Navigation components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   ├── providers/            # React context providers
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── .husky/                   # Git hooks
├── .lintstagedrc.js         # Lint-staged configuration
├── .prettierrc              # Prettier configuration
├── .prettierignore          # Prettier ignore patterns
├── jest.config.js           # Jest configuration
├── jest.setup.js            # Jest setup file
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🔄 Development Workflow

### Branch Strategy

We use a simplified Git flow:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature branches
- `hotfix/*` - Critical bug fixes

### Making Changes

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following our [coding standards](#code-quality)
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**

   ```bash
   pnpm test
   pnpm lint
   pnpm type-check
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push and create a PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🎯 Code Quality

### ESLint Configuration

We use ESLint with the following rules:

- React hooks rules
- TypeScript rules
- Prettier integration
- Custom rules for our codebase

### Prettier Configuration

Code formatting is handled by Prettier with the following settings:

- Single quotes for strings
- Semicolons at the end of statements
- 2-space indentation
- 80 character line width

### TypeScript

- Strict mode enabled
- No implicit any
- Strict null checks
- Path mapping configured (`@/*` → `src/*`)

### Pre-commit Hooks

Husky runs the following checks before each commit:

- ESLint fixes
- Prettier formatting
- TypeScript type checking

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Structure

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user flows (planned)

### Writing Tests

```typescript
// Example test file: src/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## ⚙️ Environment Configuration

### Required Environment Variables

Copy `env.template` to `.env.local` and configure:

```bash
# Pinata IPFS Configuration
NEXT_PUBLIC_PINATA_API_KEY=your_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_secret_key

# Network Configuration
NEXT_PUBLIC_NETWORK=base-sepolia

# Registry Contract Addresses
NEXT_PUBLIC_BASE_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_BASE_SEPOLIA_REGISTRY_ADDRESS=0x...
```

### Environment-Specific Configurations

- **Development**: Uses Base Sepolia testnet
- **Staging**: Uses Base Sepolia testnet with production-like settings
- **Production**: Uses Base Mainnet

## 🚀 Deployment

### Automated Deployment

- **Staging**: Automatically deploys from `develop` branch
- **Production**: Automatically deploys from `main` branch

### Manual Deployment

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

### Environment Setup

1. **Vercel Configuration**
   - Connect your GitHub repository
   - Set environment variables in Vercel dashboard
   - Configure build settings

2. **Required Secrets**
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `PINATA_API_KEY`
   - `PINATA_SECRET_KEY`

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**

   ```bash
   # Clear cache and reinstall
   pnpm clean
   pnpm install
   ```

2. **TypeScript Errors**

   ```bash
   # Check type definitions
   pnpm type-check
   ```

3. **Test Failures**

   ```bash
   # Run tests with verbose output
   pnpm test --verbose
   ```

4. **Linting Issues**
   ```bash
   # Fix auto-fixable issues
   pnpm lint:fix
   ```

### Getting Help

- Check existing [GitHub Issues](https://github.com/your-username/zora-chan/issues)
- Create a new issue with detailed information
- Join our Discord community (link coming soon)

## 🤝 Contributing

### Before Contributing

1. Read this development guide
2. Check existing issues and PRs
3. Join our community discussions

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Update documentation
6. Submit a pull request

### Code Review Process

- All PRs require at least one review
- CI/CD checks must pass
- Code must follow our style guide
- Tests must pass with good coverage

### Release Process

- Releases are automated via GitHub Actions
- Version numbers follow semantic versioning
- Release notes are generated from commit messages

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zora Protocol Documentation](https://docs.zora.co/)
- [Wagmi Documentation](https://wagmi.sh/)

---

**Happy coding! 🚀**
