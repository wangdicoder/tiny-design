---
'@tiny-design/react': patch
---

Fix TypeScript compatibility with React 19. Component prop interfaces used the pattern `React.PropsWithRef<JSX.IntrinsicElements['x']>`, which relied on a globally-augmented `JSX` namespace that `@types/react@19` no longer provides. The resolved prop types collapsed to `any`, silently dropping every intrinsic HTML attribute (`onClick`, `type`, `disabled`, `aria-*`, `children`, etc.) for consumers on React 19. Replaced the pattern with `React.ComponentProps<'x'>` / `React.ComponentPropsWithoutRef<'x'>` across ~60 component type files. Works on React 18 and 19.
