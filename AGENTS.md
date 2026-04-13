# Repository Guidelines

## Project Structure & Module Organization
This repository is a `pnpm` workspace managed with Turborepo. Core packages live under `packages/`:

- `packages/react`: main React component library (`src/`, component styles, demos, and Jest tests)
- `packages/icons`, `packages/tokens`, `packages/cli`, `packages/mcp`, `packages/charts`: supporting packages
- `apps/docs`: Vite-powered documentation site and Playwright visual tests

Common root config lives in `turbo.json`, `eslint.config.mjs`, `.prettierrc`, and `.stylelintrc`. Changesets are stored in `.changeset/`.

## Build, Test, and Development Commands
- `pnpm install`: install workspace dependencies; Node `>=22` is required.
- `pnpm dev`: run workspace dev tasks through Turbo; primarily used for the docs app.
- `pnpm build`: build all packages.
- `pnpm test`: run package test suites through Turbo.
- `pnpm test:visual`: run Playwright visual tests from `apps/docs/tests/visual`.
- `pnpm lint`: run ESLint across workspace packages.
- `pnpm lint:style`: run Stylelint for SCSS sources.

For package-specific work, prefer filtering:
`pnpm --filter @tiny-design/react test` or `pnpm --filter @tiny-design/react lint`.

## Coding Style & Naming Conventions
Use TypeScript with 2-space indentation, semicolons, single quotes, and `printWidth: 100` per `.prettierrc`. Run Prettier before submitting changes.

React source lives mainly in `packages/react/src`. Follow existing component patterns:
- component folders in kebab-case, for example `packages/react/src/date-picker/`
- public exports in each component `index.tsx` and again in `packages/react/src/index.ts`
- SCSS class names prefixed with `ty-`

Linting uses ESLint 9 for TypeScript/React and Stylelint for SCSS.

## Testing Guidelines
Jest is used for unit tests; place tests in `src/__tests__/` or the package’s existing test location and name files `*.test.ts` or `*.test.tsx`. Use Playwright for docs visual regression coverage.

Run:
- `pnpm test`
- `pnpm --filter @tiny-design/react test:coverage`
- `pnpm test:visual`

## Commit & Pull Request Guidelines
Recent history favors short Conventional Commit-style subjects such as `fix(react): ...`, `feat(button): ...`, or `chore: ...`. Keep commits focused and imperative.

PRs should include a clear summary, linked issue when applicable, and screenshots or visual diffs for UI/docs changes. Add or update tests for behavioral changes. For user-facing package changes, create a changeset with `pnpm changeset` and commit the generated file.
