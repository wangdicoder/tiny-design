# @tiny-design/tokens

Design tokens and v2 theme runtime for Tiny Design.

## Install

```bash
npm install @tiny-design/tokens
# or
pnpm add @tiny-design/tokens
```

## Usage

### CSS (recommended)

Import the compiled CSS to get all v2 token CSS variables:

```js
import '@tiny-design/tokens';
// or explicitly
import '@tiny-design/tokens/css/base.css';
```

## What's Included

| Module | Description |
| --- | --- |
| `css/base.css` | Package CSS entry copied from the base theme CSS |
| `dist/css/base.css` | v2 light/dark/system theme CSS variables |
| `dist/css/light.css` | Light theme CSS variables |
| `dist/css/dark.css` | Dark theme CSS variables |
| `dist/registry.json` | Token registry for tooling |
| `runtime/*` | Theme presets, resolver, and validator runtime modules |

## Theming

All visual tokens are delivered as CSS custom properties (`--ty-*`). Override them in your stylesheet:

```css
:root {
  --ty-color-primary: #007bff;
  --ty-border-radius: 4px;
}
```

Light and dark themes are supported via the `data-tiny-theme` attribute on the document root:

```html
<html data-tiny-theme="dark">
```

Three modes are available: `light`, `dark`, and `system` (follows `prefers-color-scheme`).

## Component Token Conventions

Component tokens are scoped by component name and should not be shared across different components, even when the semantics line up closely.

For example, `DatePicker` and `Calendar` intentionally use parallel token groups without sharing the same key space:

- `date-picker.header-*` and `calendar.header-*`
- `date-picker.panel-item-*` and `calendar.panel-item-*`
- `date-picker.today-*` and `calendar.today-*`

This keeps token semantics aligned across related components while allowing each component to evolve or be themed independently.

## License

MIT
