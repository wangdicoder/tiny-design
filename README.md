<p align="center">
  <a href="https://wangdicoder.github.io/tiny-design/">
    <img width="200" src="https://github.com/wangdicoder/tiny-design/blob/master/apps/docs/src/assets/logo/logo.svg">
  </a>
</p>

<h1 align="center">Tiny Design</h1>
<p align="center">A friendly, themeable UI component library for React</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@tiny-design/react">
    <img src="https://img.shields.io/npm/v/@tiny-design/react.svg?style=flat-square" alt="npm version"/>
  </a>
  <a href="https://www.npmjs.com/package/@tiny-design/react">
    <img src="https://img.shields.io/npm/dm/@tiny-design/react.svg?style=flat-square" alt="npm downloads"/>
  </a>
  <a href="https://bundlephobia.com/package/@tiny-design/react">
    <img src="https://img.shields.io/bundlephobia/minzip/@tiny-design/react.svg?style=flat-square" alt="bundle size"/>
  </a>
  <a href="https://react.dev">
    <img src="https://img.shields.io/static/v1?label=react&message=%3E=18&color=61dafb&style=flat-square" alt="react version"/>
  </a>
  <a href="https://github.com/wangdicoder/tiny-design/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@tiny-design/react.svg?style=flat-square" alt="license"/>
  </a>
</p>

<p align="center">
  <a href="https://wangdicoder.github.io/tiny-design/"><strong>Documentation</strong></a> &nbsp;&bull;&nbsp;
  <a href="https://wangdicoder.github.io/tiny-design/theme/theme-editor"><strong>Theme Editor</strong></a> &nbsp;&bull;&nbsp;
  <a href="https://wangdicoder.github.io/tiny-design/guide/customise-theme"><strong>Theming Guide</strong></a>
</p>

---

## Highlights

- **80+ components** — buttons, forms, data display, navigation, feedback, and more
- **Visual Theme Editor** — 20+ built-in presets inspired by popular design systems; customise colours, typography, and spacing in real time without writing code
- **Dark mode** — built-in light/dark themes with system preference detection and a `useTheme` hook
- **TypeScript** — written in strict TypeScript with complete type definitions
- **Accessible** — follows [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) standards with keyboard navigation support
- **Lightweight** — tree-shakeable ESM/CJS builds; styles auto-import alongside components
- **i18n** — English and Chinese built in

## Quick Start

```bash
pnpm add @tiny-design/react
```

```jsx
import { Button, Switch } from '@tiny-design/react';

const App = () => (
  <>
    <Button btnType="primary">Click Me</Button>
    <Switch checked />
  </>
);
```

No separate CSS import needed — styles are bundled with each component and tree-shaken by modern bundlers.

## Theming

### Visual Theme Editor

The built-in [Theme Editor](https://wangdicoder.github.io/tiny-design/theme/theme-editor) lets you pick from 20+ preset themes or fine-tune individual tokens — colours, typography, border radius, spacing — and see changes live on real components. Export as CSS or SCSS when you're done.

### Dark mode

```jsx
import { useTheme } from '@tiny-design/react';

function ThemeToggle() {
  const { resolvedTheme, toggle } = useTheme();
  return <button onClick={toggle}>{resolvedTheme}</button>;
}
```

Or set it declaratively:

```html
<html data-tiny-theme="dark">
```

### CSS custom properties

Every visual token is a `--ty-*` CSS custom property. Override any of them:

```css
:root {
  --ty-color-primary: #3b82f6;
  --ty-color-bg: #fafafa;
  --ty-border-radius: 8px;
}
```

### SCSS variables

For compile-time control, override `!default` SCSS variables before importing:

```scss
$primary-color: #3b82f6;
$border-radius: 8px;
@use "@tiny-design/react/es/style/index" as *;
```

See the [Theming Guide](https://wangdicoder.github.io/tiny-design/guide/customise-theme) for the full list of tokens and variables.

## Packages

| Package | Description |
| ------- | ----------- |
| [@tiny-design/react](./packages/react) | Core component library |
| [@tiny-design/tokens](./packages/tokens) | Design tokens and foundational styles |
| [@tiny-design/icons](./packages/icons) | SVG icon components |

## Components

| Category | Count | Examples |
| -------- | :---: | -------- |
| Foundation | 5 | Button, Icon, Image, Link, Typography |
| Layout | 7 | Grid, Flex, Space, Split, Divider, Aspect Ratio |
| Navigation | 7 | Menu, Breadcrumb, Dropdown, Pagination, Steps, Anchor, SpeedDial |
| Data Display | 19 | Card, Carousel, Collapse, Tag, Tooltip, Tree, Table |
| Form | 22 | Input, Select, DatePicker, TimePicker, Checkbox, Radio, Slider |
| Feedback | 13 | Modal, Drawer, Overlay, Message, Notification, Alert, Skeleton |
| Miscellany | 5 | ConfigProvider, BackTop, Sticky, Keyboard, CopyToClipboard |

## Internationalization

```jsx
import { ConfigProvider, zh_CN } from '@tiny-design/react';

<ConfigProvider locale={zh_CN}>
  <App />
</ConfigProvider>
```

| Locale | Language |
| ------ | -------- |
| en_US  | English (default) |
| zh_CN  | 简体中文 |

## Browser Support

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" /><br>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /><br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /><br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /><br>Safari |
| --- | --- | --- | --- |
| last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Contributing

```bash
pnpm install        # install dependencies
pnpm dev            # start docs dev server
pnpm build          # build all packages
pnpm test           # run tests
pnpm lint           # lint code
```

## License

[MIT](https://github.com/wangdicoder/tiny-design/blob/master/LICENSE)
