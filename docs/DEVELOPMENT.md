# Development Guide

## Local Setup

```bash
npm ci
npm run dev
```

The app uses Next.js 15, React 19, TypeScript, Tailwind CSS, RainbowKit, Wagmi, and the Zora Coins SDK.

## Validation

Run these before opening a pull request:

```bash
npm run typecheck
npm run docs:check
npm run build
```

`docs:check` regenerates `docs/PROJECT_STRUCTURE.md` and fails when the generated documentation is stale.

## CI/CD

The GitHub Actions workflow template in `docs/ci-workflow.yml` runs on pull requests and pushes to `dev` or `main`. Copy it to `.github/workflows/ci.yml` to enable it in this repository. It installs with `npm ci`, typechecks, verifies generated docs, and builds the Next.js app.
