import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import GutterDemo from './demo/Gutter';
import GutterSource from './demo/Gutter.tsx?raw';
import OffsetDemo from './demo/Offset';
import OffsetSource from './demo/Offset.tsx?raw';
import OrderDemo from './demo/Order';
import OrderSource from './demo/Order.tsx?raw';
import AlignmentDemo from './demo/Alignment';
import AlignmentSource from './demo/Alignment.tsx?raw';
import ResponsiveDemo from './demo/Responsive';
import ResponsiveSource from './demo/Responsive.tsx?raw';

# Grid System

Use `Row` and `Col` to build classic 24-column page grids with responsive breakpoints.

## Usage

```jsx
import { Row, Col } from 'tiny-design';
```

## When To Use

Grid System provides a familiar 24-column grid powered by Flexbox — the same mental model used by Bootstrap and Ant Design.

- **Page-level content columns** — split a page into sidebar (6 columns) and main content (18 columns) with a single `gutter`.
- **Form layouts** — align labels and inputs into consistent columns across different form sections.
- **Marketing / landing pages** — create hero sections, feature grids, and pricing tables with predictable column math.
- **Responsive column shifting** — use breakpoint props (`xs` through `xxl`) on `Col` to stack columns on mobile and spread them on desktop.
- **Column offset & reordering** — use `offset` to create whitespace and `order` to rearrange columns visually without changing DOM order.

### Choosing between layout components

| Scenario | Recommended |
|---|---|
| Toolbar, button group, inline tags | **Flex** |
| Page columns, form grid, marketing layout | **Grid System** (Row / Col) |
| Dashboard shell, card wall, named areas, row spanning | **Grid** |

## Examples

<Demo>

### Basic Grid

Create a basic 24-column layout using `Row` and `Col`.

<DemoBlock component={BasicDemo} source={BasicSource} />

</Demo>
<Demo>

### Gutter

Use `Row.gutter` to control horizontal and vertical spacing between columns.

<DemoBlock component={GutterDemo} source={GutterSource} />

</Demo>
<Demo>

### Column Offset

Use `offset` to push a column to the right.

<DemoBlock component={OffsetDemo} source={OffsetSource} />

</Demo>
<Demo>

### Order

Use `order` to change the visual order of columns.

<DemoBlock component={OrderDemo} source={OrderSource} />

</Demo>
<Demo>

### Alignment

Use `align` and `justify` on `Row` to control cross-axis and main-axis placement.

<DemoBlock component={AlignmentDemo} source={AlignmentSource} />

</Demo>
<Demo>

### Responsive

Use `xs`, `sm`, `md`, `lg`, `xl`, `xxl` to define responsive spans and offsets.

<DemoBlock component={ResponsiveDemo} source={ResponsiveSource} />

</Demo>

## Props

### Row

| Property   | Description                                | Type                                                                                    | Default |
| ---------- | ------------------------------------------ | --------------------------------------------------------------------------------------- | ------- |
| gutter     | spacing between columns                    | number \| [number, number]                                                             | 0       |
| gutterSide | include gutter padding on outer edges      | boolean                                                                                 | false   |
| align      | vertical alignment                         | `top` \| `center` \| `bottom` \| `baseline`                                            | -       |
| justify    | horizontal arrangement                     | `start` \| `end` \| `center` \| `space-around` \| `space-between` \| `space-evenly`   | -       |
| style      | style object of container                  | CSSProperties                                                                           | -       |
| className  | className of container                     | string                                                                                  | -       |

### Col

| Property  | Description                                 | Type                                 | Default |
| --------- | ------------------------------------------- | ------------------------------------ | ------- |
| span      | number of cells to occupy, out of 24        | number                               | -       |
| offset    | number of cells to offset from the left     | number                               | 0       |
| order     | visual order                                | number                               | 0       |
| xs        | screen < 480px config                       | number \| `{ span, offset, order }`  | -       |
| sm        | screen >= 600px config                      | number \| `{ span, offset, order }`  | -       |
| md        | screen >= 840px config                      | number \| `{ span, offset, order }`  | -       |
| lg        | screen >= 960px config                      | number \| `{ span, offset, order }`  | -       |
| xl        | screen >= 1280px config                     | number \| `{ span, offset, order }`  | -       |
| xxl       | screen >= 1440px config                     | number \| `{ span, offset, order }`  | -       |
| style     | style object of container                   | CSSProperties                        | -       |
| className | className of container                      | string                               | -       |
