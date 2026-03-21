---
name: release
description: Create a changeset, commit, push, and open a PR for releasing packages
user_invocable: true
---

# Release Skill

When the user invokes `/release`, follow these steps:

## Step 1: Determine the branch

- Run `git branch --show-current` to get the current branch.
- If on `master`, create a new branch based on the changes:
  - Check `git diff master --name-only` and `git log master --oneline` to understand what changed.
  - Create a meaningful branch name like `fix/short-description` or `feat/short-description`.
  - Run `git checkout -b <branch-name>`.
- If already on a dev branch, continue on it.

## Step 2: Analyze changes

- Run `git diff master...HEAD --stat` and `git log master...HEAD --oneline` to understand all changes since master.
- Determine the appropriate bump type:
  - `patch` for bug fixes
  - `minor` for new features (backwards compatible)
  - `major` for breaking changes
- Identify which packages are affected by checking which `packages/*/` directories have changes.

## Step 3: Create changeset

- Create a markdown file in `.changeset/` with a descriptive kebab-case filename (e.g., `fix-form-useform-hook.md`).
- Use this format:

```markdown
---
"@tiny-design/react": patch
---

Short description of the change
```

- Only include packages that actually have code changes (not `@tiny-design/docs` as it's ignored in changeset config).
- Note: packages `@tiny-design/react`, `@tiny-design/icons`, and `@tiny-design/tokens` are in a fixed version group — they version together.

## Step 4: Commit the changeset

- Stage only the changeset file: `git add .changeset/<filename>.md`
- Commit with message: `chore: add changeset for <summary>`

## Step 5: Push to remote

- Push the branch: `git push -u origin <branch-name>`

## Step 6: Create a Pull Request

- Use `gh pr create` to open a PR targeting `master`.
- Title should follow the commit convention: `fix(react): ...` or `feat(react): ...`
- Body should include:
  - `## Summary` — bullet points describing the changes
  - `## Release` — the bump type and affected packages
  - `## Test plan` — how to verify the changes
