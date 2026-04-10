# Contributing to Tiny UI

Thanks for your interest in contributing to Tiny UI! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js >= 22
- pnpm (see `packageManager` in `package.json` for the exact version)

### Getting Started

```bash
# Clone the repo
git clone https://github.com/wangdicoder/tiny-design.git
cd tiny-design

# Install dependencies
pnpm install

# Start the docs site (dev server)
pnpm dev

# Run tests
pnpm test

# Build the component library
pnpm build
```

## Project Structure

```
tiny-design/
├── packages/react/       # @tiny-design/react — component library
│   ├── src/              # Component source code
│   ├── scripts/          # Build scripts
│   └── package.json
├── apps/docs/            # Documentation site
│   ├── src/              # Site source
│   ├── guides/           # Guide markdown files
│   └── package.json
├── turbo.json            # Turborepo config
└── package.json          # Workspace root
```

## Adding a New Component

1. Create a new directory under `packages/react/src/your-component/`
2. Follow the existing component structure:

```
your-component/
├── your-component.tsx    # Component implementation
├── types.ts              # TypeScript interfaces
├── index.tsx             # Barrel export
├── index.md              # English documentation
├── index.zh_CN.md        # Chinese documentation
├── style/
│   ├── _index.scss       # Component styles
│   └── index.tsx         # Style entry (imports)
├── demo/
│   └── basic.md          # Usage demos
└── __tests__/
    └── your-component.test.tsx
```

3. Export the component from `packages/react/src/index.ts`
4. Add the route in `apps/docs/src/routers.tsx`

### Public Type Exports

Every component module must export its public TypeScript types from its own `index.tsx`.

- If the component has a `types.ts` file, re-export its public types from `packages/react/src/your-component/index.tsx`
- If the component exposes public types from related files, re-export them from the same module barrel as well
- Keep component-level type exports consistent with the runtime component export instead of creating one-off type exceptions elsewhere

The package root barrel must also re-export those public component types from `packages/react/src/index.ts`.

- Do not add root-level type exports for only one or two special-case components
- Do not rely on consumers importing public component types from internal file paths when the type is part of the supported API surface

## Code Style

- TypeScript strict mode is enabled
- Components use `React.forwardRef` for ref forwarding
- CSS class names follow the `ty-component-name` convention
- Shared Sass helpers for React component styles live in `packages/react/src/style/`

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests for a specific component
pnpm --filter @tiny-design/react test -- --testPathPattern=button

# Update snapshots
pnpm --filter @tiny-design/react test:update

# Run with coverage
pnpm --filter @tiny-design/react test:coverage
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/). Each commit message should be structured as:

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`

Examples:
- `feat(button): add loading state`
- `fix(modal): prevent scroll when open`
- `docs(input): update API documentation`

## Adding a Changeset

We use [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs. If your PR includes user-facing changes to `@tiny-design/react`, add a changeset:

```bash
pnpm changeset
```

You'll be prompted to:
1. Select the package(s) affected (`@tiny-design/react`)
2. Choose the semver bump type (patch / minor / major)
3. Write a short summary of your change

This creates a markdown file in `.changeset/` — commit it with your PR. When the PR merges, a "Version Packages" PR is automatically opened. Merging that PR publishes to npm and updates the changelog.

## Pull Requests

1. Fork the repo and create a branch from `master`
2. If you've added code, add tests
3. Ensure the test suite passes (`pnpm test`)
4. Ensure your code lints (`pnpm lint`)
5. Add a changeset if your change affects published packages (`pnpm changeset`)
6. Create a pull request with a clear description

## Reporting Bugs

Use [GitHub Issues](https://github.com/wangdicoder/tiny-design/issues) with the bug report template. Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- A minimal reproduction if possible

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
