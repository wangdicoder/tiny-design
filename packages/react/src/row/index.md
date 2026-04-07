import BasicDemo from '../grid/demo/Basic';
import BasicSource from '../grid/demo/Basic.tsx?raw';
import GutterDemo from '../grid/demo/Gutter';
import GutterSource from '../grid/demo/Gutter.tsx?raw';
import OffsetDemo from '../grid/demo/Offset';
import OffsetSource from '../grid/demo/Offset.tsx?raw';
import OrderDemo from '../grid/demo/Order';
import OrderSource from '../grid/demo/Order.tsx?raw';
import AlignmentDemo from '../grid/demo/Alignment';
import AlignmentSource from '../grid/demo/Alignment.tsx?raw';
import ResponsiveDemo from '../grid/demo/Responsive';
import ResponsiveSource from '../grid/demo/Responsive.tsx?raw';

# Grid System

Use `Row` and `Col` to build classic 24-column page grids with responsive breakpoints.

## Usage

```jsx
import { Row, Col } from 'tiny-design';
```

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
