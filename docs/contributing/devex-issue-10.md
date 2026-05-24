# DevEx Playbook (Issue #10)

## Local Checks

1. Install dependencies with `npm ci`.
2. Run lint using `npm run lint`.
3. Run build validation with `npm run build`.

## Docs Refresh

- Run `npm run docs:generate` to refresh `docs/project-overview.md`.
- Commit generated docs with feature changes.

## Pull Request Checklist

- [ ] Lint passes locally
- [ ] Build passes locally
- [ ] Docs updated when scripts/deps change
