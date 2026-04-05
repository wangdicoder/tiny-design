---
"@tiny-design/react": minor
"@tiny-design/tokens": minor
---

Migrate component styles from SCSS variables to CSS custom properties (`--ty-*`) for better runtime theming support.

- Migrate ~80 structural SCSS constants (padding, sizing, transitions) to runtime-customizable CSS custom properties
- Tokenize hardcoded values in Button, Input, Card, Select, and Notification components
- Add component-scoped CSS variable fallback chains (e.g., `--ty-btn-border-radius` falls back to `--ty-border-radius`)
- Add `ThemeConfig` API to `ConfigProvider` for programmatic token and component-level overrides
- Three-level customization: global tokens, component tokens, and scoped instance overrides via CSS
