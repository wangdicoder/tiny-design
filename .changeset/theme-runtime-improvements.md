---
"@tiny-design/react": minor
"@tiny-design/tokens": minor
---

Theme runtime and token registry improvements:

- **Fix:** `base.css` now emits light defaults under `:root, [data-tiny-theme='light']`, so a scoped `<ConfigProvider theme="light">` inside a dark root flips correctly.
- **New:** `getThemeStylesheet(theme, { selector? })` exported from `@tiny-design/tokens/resolve-theme` (and re-exported from `@tiny-design/react`) returns a CSS string for SSR injection to avoid theme FOUC.
- **New:** `useActiveTheme()` exported from `@tiny-design/react` returns the effective `{ mode, themeConfig }` for the current subtree.
- **New:** `useTheme()` is now context-aware (respects the nearest `ConfigProvider`'s theme) and accepts `{ initialMode }` for SSR hydration.
- **New:** Typed token key unions in `dist/registry.d.ts` (`PrimitiveTokenKey`, `SemanticTokenKey`, `ComponentTokenKey`, `TokenKey`) and a `TypedThemeDocument` in `dist/presets.d.ts` for autocompletion.
- **New:** Additive primitive token layer under `source/primitive/` with initial brand color scale and spacing scale.
- **Build:** Token registry validation now checks `fallback` targets and `$type` vs `$value` compatibility.
