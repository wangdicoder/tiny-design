# @tiny-design/tokens

Design tokens, themes, and foundational styles for Tiny Design.

## Install

```bash
npm install @tiny-design/tokens
# or
pnpm add @tiny-design/tokens
```

## Usage

### CSS (recommended)

Import the compiled CSS to get all tokens, normalization, and animations:

```js
import '@tiny-design/tokens';
// or explicitly
import '@tiny-design/tokens/css/base.css';
```

### SCSS

Import individual SCSS modules for custom builds:

```scss
@use '@tiny-design/tokens/scss/variables';
@use '@tiny-design/tokens/scss/tokens';
@use '@tiny-design/tokens/scss/animation';
@use '@tiny-design/tokens/scss/mixins';
```

## What's Included

| Module | Description |
| --- | --- |
| `_variables.scss` | Core variables — colors, typography, spacing, breakpoints, component dimensions |
| `_tokens.scss` | CSS custom property wrappers (`--ty-*` prefix) |
| `_theme.scss` | Theme generation (light/dark via `data-tiny-theme` attribute) |
| `_normalise.scss` | HTML normalization (based on Normalize.css) |
| `_animation.scss` | Keyframe animations (`ty-rotate`, `ty-rotate-reverse`, `ty-processing`) |
| `_mixins.scss` | Helper mixins (e.g. `loader()`) |

## Theming

Tokens supports light and dark themes via the `data-tiny-theme` attribute on the document root:

```html
<html data-tiny-theme="dark">
```

Three modes are available: `light`, `dark`, and `system` (follows `prefers-color-scheme`).

## Breakpoints

| Name | Width |
| --- | --- |
| `xs` | 480px |
| `sm` | 600px |
| `md` | 840px |
| `lg` | 960px |
| `xl` | 1280px |
| `xxl` | 1440px |

## License

MIT
