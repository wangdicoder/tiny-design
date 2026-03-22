# Customise Theme

Tiny UI provides three ways to customise the look and feel:

1. **Theme Editor** — a visual, no-code tool for real-time theming (great for exploration and quick customisation).
2. **Design tokens** — CSS custom properties that power light and dark mode. These are the runtime values every component reads.
3. **SCSS variables** — compile-time variables (sizes, font stacks, border radii, etc.) that can be overridden when you build your own stylesheet.

## Theme Editor

The built-in [Theme Editor](/theme/theme-editor) lets you visually customise design tokens in real time. You can:

- Pick from **20+ preset themes** (e.g. Catppuccin, Mocha Mousse, Cyberpunk) or start from scratch.
- Adjust primary, success, warning, danger, and info colours, background, text, and border colours.
- Tweak typography (font size, line height, font weight) and details (border radius, spacing, sizing).
- Preview changes live on real components.
- Export your customised tokens as CSS or SCSS to use in your project.

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

Every colour, shadow, and visual state is exposed as a `--ty-*` CSS custom property on `:root`. You can override any token in your own stylesheet:

```css
:root {
  --ty-color-primary: #007bff;
  --ty-color-primary-hover: #3d9bff;
  --ty-color-primary-active: #0062d6;
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

The full list of tokens can be found in the source:
- [Light theme tokens](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/themes/_light.scss)
- [Dark theme tokens](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/themes/_dark.scss)

## SCSS variables

If you import Tiny UI's SCSS source instead of the pre-built CSS, you can override compile-time variables such as sizes, spacing, font stacks, and border radii. Every variable uses the `!default` flag, so your overrides take precedence.

> **What's `!default`?** A Sass variable with `!default` is only assigned if it hasn't already been defined. By declaring your value *before* importing Tiny UI's styles, your value wins.

### 1. Install Sass

```bash
$ npm install sass --save-dev
```

### 2. Create your overrides file

Create a file, e.g. `theme-variables.scss`. Your overrides **must come before** the Tiny UI import:

```scss
// Your overrides
$primary-color: #007bff;
$border-radius: 4px;
$font-size-base: 14px;

// Import Tiny UI styles (applies your overrides via !default)
@use "@tiny-design/react/es/style/index" as *;
```

### 3. Import in your entry file

```js
import './theme-variables.scss';
```

The full list of SCSS variables can be found in [_variables.scss](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/scss/_variables.scss).

Some commonly overridden variables:

```scss
// Color
$primary-color: #6e41bf !default;

// Font
$font-size-base: 1rem !default;
$font-size-lg: $font-size-base * 1.25 !default;
$font-size-sm: $font-size-base * 0.875 !default;
$font-weight: 400 !default;

// Border
$border-radius: 2px !default;
$border-width: 1px !default;
$border-color: $gray-300 !default;

// Component sizes
$height-sm: 24px !default;
$height-md: 32px !default;
$height-lg: 42px !default;
```

Please report an issue if the existing list of variables is not enough for you.
