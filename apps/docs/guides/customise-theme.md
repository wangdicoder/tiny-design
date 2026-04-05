# Customise Theme

Tiny UI provides three ways to customise the look and feel:

1. **Theme Editor** — a visual, no-code tool for real-time theming (great for exploration and quick customisation).
2. **Design tokens** — CSS custom properties that power light and dark mode. These are the runtime values every component reads.
3. **SCSS constants** — compile-time structural constants (padding, transitions, arrow sizes, etc.) that can be overridden when you build your own stylesheet.

## Theme Editor

The built-in [Theme Editor](/theme/theme-editor) lets you visually customise design tokens in real time. You can:

- Pick from **20+ preset themes** (e.g. Catppuccin, Mocha Mousse, Cyberpunk) or start from scratch.
- Adjust primary, success, warning, danger, and info colours, background, text, and border colours.
- Tweak typography (font size, line height, font weight) and details (border radius, spacing, sizing).
- Preview changes live on real components.
- Export your customised tokens as CSS or JSON to use in your project.

Changes are applied instantly via CSS custom properties — no rebuild required.

## Dark mode

Tiny UI ships with built-in light and dark themes. Light mode is the default. To enable dark mode, set `data-tiny-theme` on the `<html>` element:

```html
<!-- Light (default, no attribute needed) -->
<html>

<!-- Dark -->
<html data-tiny-theme="dark">

<!-- Follow system preference -->
<html data-tiny-theme="system">
```

You can also use the `useTheme` hook to switch themes at runtime:

```tsx
import { useTheme } from '@tiny-design/react';

const App = () => {
  const { mode, resolvedTheme, setMode, toggle } = useTheme();
  return <button onClick={toggle}>Current: {resolvedTheme}</button>;
};
```

The hook returns:

| Property | Type | Description |
|---|---|---|
| `mode` | `'light' \| 'dark' \| 'system'` | The stored preference |
| `resolvedTheme` | `'light' \| 'dark'` | The actual resolved theme (resolves `'system'` to the OS preference) |
| `setMode(mode)` | `(mode: ThemeMode) => void` | Set a specific mode |
| `toggle()` | `() => void` | Toggle between light and dark |

## Design tokens (CSS custom properties)

Every colour, shadow, and visual state is exposed as a `--ty-*` CSS custom property on `:root`. This is the **primary way** to customise Tiny UI. You can override any token in your own stylesheet:

```css
:root {
  --ty-color-primary: #007bff;
  --ty-color-primary-hover: #3d9bff;
  --ty-color-primary-active: #0062d6;
}
```

For dark mode overrides, target the dark theme selector:

```css
html[data-tiny-theme='dark'] {
  --ty-color-primary: #3d9bff;
  --ty-color-primary-hover: #66b3ff;
  --ty-color-primary-active: #007bff;
}
```

### Commonly used tokens

| Token | Light default | Description |
|---|---|---|
| `--ty-color-primary` | `#6e41bf` | Primary brand colour |
| `--ty-color-primary-hover` | `#8b62d0` | Primary hover state |
| `--ty-color-primary-active` | `#5a30a8` | Primary active state |
| `--ty-color-bg` | `#fff` | Page background |
| `--ty-color-text` | `rgba(0,0,0,0.85)` | Primary text colour |
| `--ty-color-text-secondary` | `rgba(0,0,0,0.65)` | Secondary text colour |
| `--ty-color-border` | `#d9d9d9` | Default border colour |
| `--ty-border-radius` | `2px` | Global border radius |
| `--ty-font-size-base` | `1rem` | Base font size |
| `--ty-height-sm` | `24px` | Small control height |
| `--ty-height-md` | `32px` | Medium control height |
| `--ty-height-lg` | `42px` | Large control height |

Every component also has its own tokens for fine-grained control. For example, Button uses `--ty-btn-default-bg`, `--ty-btn-default-color`, etc. The full list of tokens can be found in the source:
- [Light theme tokens](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/themes/_light.scss)
- [Dark theme tokens](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/themes/_dark.scss)

## SCSS constants

If you import Tiny UI's SCSS source instead of the pre-built CSS, you can override compile-time structural constants such as padding, transitions, and arrow sizes. These are values that don't need to change at runtime.

Every constant uses the `!default` flag, so your overrides take precedence.

### 1. Install Sass

```bash
$ npm install sass --save-dev
```

### 2. Create your overrides file

Create a file, e.g. `theme-overrides.scss`. Your overrides **must come before** the Tiny UI import:

```scss
// Override structural constants
$btn-padding-md: 0 20px;
$card-body-padding: 20px;
$tooltip-arrow-size: 6px;

// Import Tiny UI styles (applies your overrides via !default)
@use "@tiny-design/react/es/style/index" as *;
```

### 3. Import in your entry file

```js
import './theme-overrides.scss';
```

The full list of SCSS constants can be found in [_constants.scss](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/_constants.scss).

Some commonly overridden constants:

```scss
// Button
$btn-padding-sm: 0 10px !default;
$btn-padding-md: 0 15px !default;
$btn-padding-lg: 0 28px !default;

// Card
$card-header-padding: 13px 16px !default;
$card-body-padding: 16px !default;

// Notification
$notification-width: 380px !default;
```

> **Note:** Colours, font sizes, border radii, shadows, and all other visual tokens should be customised via CSS custom properties (see above), not SCSS variables. SCSS constants are only for structural values like padding and sizing.

Please report an issue if the existing list of tokens or constants is not enough for you.
