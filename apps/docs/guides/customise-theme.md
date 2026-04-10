# Customise Theme

Tiny UI uses a token-driven runtime theme model:

1. **CSS custom properties** for direct runtime overrides.
2. **ThemeDocument** for portable theme JSON.
3. **ConfigProvider `theme.tokens`** for React-scoped theming.

## Theme Editor

The built-in [Theme Editor](/theme/theme-studio) lets you visually customise design tokens in real time. You can:

- Pick from **20+ preset themes** (e.g. Catppuccin, Mocha Mousse, Cyberpunk) or start from scratch.
- Adjust primary, success, warning, danger, and info colours, background, text, and border colours.
- Tweak typography (font size, line height, font weight) and details (border radius, spacing, sizing).
- Preview changes live on real components.
- Export your customised tokens as CSS or JSON to use in your project.

Changes are applied instantly via CSS custom properties — no rebuild required.

The editor exports the same token model used by the runtime, so the result can be applied as CSS variables, stored as a `ThemeDocument`, or passed into `ConfigProvider`.

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

Every semantic token and component token is exposed as a `--ty-*` CSS custom property. This is the lowest-level runtime API and works in any stack.

You can override tokens directly in your own stylesheet:

```css
:root {
  --ty-color-primary: #007bff;
  --ty-color-primary-hover: #3d9bff;
  --ty-color-primary-active: #0062d6;
  --ty-button-radius: 999px;
  --ty-card-header-padding: 20px;
}
```

For dark mode overrides, target the dark theme selector:

```css
html[data-tiny-theme='dark'] {
  --ty-color-primary: #3d9bff;
  --ty-color-primary-hover: #66b3ff;
  --ty-color-primary-active: #007bff;
  --ty-color-bg-container: #111827;
  --ty-color-text: rgba(249, 250, 251, 0.92);
}
```

### Naming rules

- Semantic token keys use kebab-case, for example `color-primary`.
- Component token keys use dot paths, for example `button.radius` or `card.header-padding`.
- Runtime CSS variables are the same keys with dots converted to hyphens, for example `--ty-button-radius` and `--ty-card-header-padding`.

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
| `--ty-border-radius` | `6px` | Global border radius |
| `--ty-font-size-base` | `14px` | Base font size |
| `--ty-height-sm` | `24px` | Small control height |
| `--ty-height-md` | `35px` | Medium control height |
| `--ty-height-lg` | `44px` | Large control height |

Every component also has its own tokens for fine-grained control. For example, Button uses `--ty-button-bg-default`, `--ty-button-text-default`, and `--ty-button-radius`. The full list of supported tokens is generated from the token registry and component sources:
- [Token registry](https://github.com/wangdicoder/tiny-design/blob/master/packages/tokens/dist/registry.json)
- [Component token sources](https://github.com/wangdicoder/tiny-design/tree/master/packages/tokens/source/components)

## ThemeDocument

`ThemeDocument` is the canonical JSON format for sharing, exporting, saving, and applying themes.

```json
{
  "meta": {
    "id": "brand-ocean",
    "name": "Brand Ocean",
    "schemaVersion": 1
  },
  "mode": "light",
  "extends": "tiny-light",
  "tokens": {
    "semantic": {
      "color-primary": "#0ea5e9",
      "border-radius": "12px"
    },
    "components": {
      "button.radius": "999px",
      "card.header-padding": "20px"
    }
  }
}
```

Use `ThemeDocument` when you need:

- a serializable theme file
- import/export between tools
- community themes or preset themes
- mode-aware overrides built on top of `tiny-light` or `tiny-dark`

## React: ConfigProvider

In React apps, the recommended API is `ConfigProvider theme={{ tokens: ... }}`.

```tsx
import { ConfigProvider } from '@tiny-design/react';

<ConfigProvider
  theme={{
    mode: 'light',
    extends: 'tiny-light',
    tokens: {
      semantic: {
        'color-primary': '#0ea5e9',
        'border-radius': '12px',
      },
      components: {
        'button.radius': '999px',
        'card.header-padding': '20px',
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

Use this when you want:

- scoped theming for part of the React tree
- nested theme overrides
- popup / portal content to inherit the same token scope

Use `theme.tokens.semantic` and `theme.tokens.components` as the supported React theme shape.

## Sass source styles

Tiny UI still ships Sass source files for bundlers that compile library styles directly, but Sass variables are not a theme API. Treat `@tiny-design/react/es/style/*.scss` and component `style/*.scss` files as implementation source, not as supported customisation contracts.

Use tokens for visual changes such as colour, typography, radii, shadows, spacing, sizing, and component states. If a value is not exposed as a token yet, prefer adding it to the token registry instead of adding a new public Sass variable.

The full token list is generated from `packages/tokens/dist/registry.json`.

## Recommended approach

- Use CSS variables when you want the simplest runtime override.
- Use `ThemeDocument` when you need a portable JSON theme format.
- Use `ConfigProvider` when you need scoped theming in React.
- Avoid treating Sass variables as public theme configuration; add missing customisation points as tokens.

Please report an issue if the existing list of tokens is not enough for you.
