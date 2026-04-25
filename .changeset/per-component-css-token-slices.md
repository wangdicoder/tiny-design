---
"@tiny-design/react": minor
"@tiny-design/tokens": minor
---

Emit per-component CSS token slices to dramatically shrink per-component bundles. The tokens package now emits `dist/css/foundation.css` (primitives), `dist/css/semantic.css` (semantics), and `dist/css/components/<name>.css` (per-component) alongside the existing `base.css`. Each compiled component entry imports only the slices it transitively needs, reducing per-component CSS by ~60% raw and ~80% gzipped (Button: 261 KB → 103 KB raw, 36 KB → 7.5 KB gzipped). Full-library bundle size is unchanged; `base.css` is still emitted for backward compatibility.
