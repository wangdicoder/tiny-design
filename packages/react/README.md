# @tiny-design/react

A friendly UI component library for React with 80+ components, theming, and i18n support.

## Install

```bash
npm install @tiny-design/react
# or
pnpm add @tiny-design/react
```

**Peer dependencies:** `react >= 18.0.0`, `react-dom >= 18.0.0`

## Quick Start

```tsx
import { Button, ConfigProvider } from '@tiny-design/react';

function App() {
  return (
    <ConfigProvider theme="light">
      <Button variant="solid" color="primary">
        Hello Tiny
      </Button>
    </ConfigProvider>
  );
}
```

## Components

### Layout
Flex, Layout, Row, Col, Space, Divider, AspectRatio

### Navigation
Anchor, Breadcrumb, Menu, Link, Pagination, Steps, Tabs

### Forms & Input
Input, InputNumber, InputPassword, Textarea, Button, Checkbox, Radio, Select, NativeSelect, AutoComplete, Cascader, DatePicker, TimePicker, ColorPicker, Slider, Switch, Rate, Segmented, Upload, Transfer, Form

### Data Display
Avatar, Badge, Card, Descriptions, Empty, Image, List, Table, Tag, Timeline, Tree, Typography, Progress, Statistic, Skeleton, Carousel

### Feedback
Modal, Drawer, Alert, Tooltip, Popover, PopConfirm, Notification, Message, Result, Loader, LoadingBar

### Other
Dropdown, SplitButton, Overlay, Countdown, CopyToClipboard, Flip, BackTop, Sticky, QuickActions, Split, ScrollIndicator, StrengthIndicator, Transition

## Configuration

Use `ConfigProvider` to set global defaults:

```tsx
import { ConfigProvider, zh_CN } from '@tiny-design/react';

<ConfigProvider
  theme="dark"
  componentSize="lg"
  locale={zh_CN}
>
  <App />
</ConfigProvider>
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `'light' \| 'dark' \| 'system' \| ThemeConfig` | `-` | Global theme mode or token config |
| `componentSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Global component size |
| `locale` | `Locale` | `-` | Locale for i18n |
| `prefixCls` | `string` | `'ty'` | CSS class prefix |

## Theming

Toggle themes programmatically with the `useTheme` hook:

```tsx
import { useTheme } from '@tiny-design/react';

function ThemeToggle() {
  const { mode, resolvedTheme, setMode, toggle } = useTheme();

  return (
    <>
      <button onClick={toggle}>Current: {resolvedTheme}</button>
      <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>Toggle mode</button>
    </>
  );
}
```

Theme preference is persisted to `localStorage` and the `system` option follows `prefers-color-scheme`.

## Localization

Built-in locales: `en_US`, `zh_CN`.

```tsx
import { ConfigProvider, zh_CN } from '@tiny-design/react';

<ConfigProvider locale={zh_CN}>
  <App />
</ConfigProvider>
```

## AI-Friendly

Tiny Design is optimized for AI-assisted development:

- **`llms.txt`** — Structured library overview for LLMs ([view](https://wangdicoder.github.io/tiny-design/llms.txt))
- **`llms-full.txt`** — Complete Props API reference for all components ([view](https://wangdicoder.github.io/tiny-design/llms-full.txt))
- **`.cursorrules`** — Cursor IDE context for accurate code generation
- **MCP Tools** — Claude Code / Claude Desktop integration via `@tiny-design/mcp`

Use with Cursor, Claude Code, or any AI coding assistant for the best experience.

## License

MIT
