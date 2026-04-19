import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import AlignDemo from './demo/Align';
import AlignSource from './demo/Align.tsx?raw';
import GapDemo from './demo/Gap';
import GapSource from './demo/Gap.tsx?raw';
import WrapDemo from './demo/Wrap';
import WrapSource from './demo/Wrap.tsx?raw';

# Flex

A flexbox container component using CSS `gap` for spacing with no child wrapping.

## When To Use

Flex is a one-dimensional layout container best suited for arranging items in a single row or column.

- **Toolbars & action bars** — align a group of buttons, icons, or controls horizontally with consistent spacing.
- **Navigation menus** — lay out nav items in a row or a vertical sidebar list.
- **Form field rows** — place a label, input, and helper text side by side.
- **Card footers / headers** — push actions to opposite ends with `justify="space-between"`.
- **Vertical stacking** — use `vertical` to stack content like a list of cards or settings sections.
- **Inline tag / badge groups** — render a wrapping set of tags with `wrap="wrap"` and a uniform `gap`.

### Flex vs Row

Both use flexbox under the hood, but they serve different purposes:

- Choose **Flex** when you need a general-purpose flexbox container with CSS `gap` and no column semantics.
- Choose **Row / Col** when you need a 24-column grid structure with `span`, `offset`, and responsive breakpoints (`xs` through `xxl`).

## Usage

```jsx
import { Flex } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic Layout

Use `vertical` to control the direction. Default is horizontal.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Alignment

Set `justify` and `align` to control alignment of items.

<DemoBlock component={AlignDemo} source={AlignSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Gap

Preset sizes `sm` (8px), `md` (16px), `lg` (24px) or a custom number via slider.

<DemoBlock component={GapDemo} source={GapSource} />

    </Demo>
    <Demo>

### Wrap

Flex items wrap automatically when `wrap` is set.

<DemoBlock component={WrapDemo} source={WrapSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property  | Description                      | Type                                                                 | Default |
| --------- | -------------------------------- | -------------------------------------------------------------------- | ------- |
| vertical  | Flex direction column            | `boolean`                                                            | `false` |
| wrap      | CSS flex-wrap                    | `nowrap` &#124; `wrap` &#124; `wrap-reverse`                         | -       |
| justify   | CSS justify-content              | `string`                                                             | -       |
| align     | CSS align-items                  | `string`                                                             | -       |
| gap       | Gap between items                | `sm` &#124; `md` &#124; `lg` &#124; `number` &#124; `string`        | -       |
| flex      | CSS flex shorthand               | `string`                                                             | -       |
| component | Custom element type              | `React.ElementType`                                                  | `div`   |