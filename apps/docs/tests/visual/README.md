# Visual Regression Tests

These Playwright tests cover the highest-risk docs examples for popup positioning,
component token styling, and dialog overlays.

Run the comparison:

```sh
pnpm test:visual
```

Update baselines intentionally:

```sh
pnpm test:visual:update
```

The suite targets the docs app and uses the local Chrome channel to avoid storing
browser binaries in the repository workflow.
