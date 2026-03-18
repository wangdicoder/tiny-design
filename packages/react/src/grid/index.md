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

# Grid

Quickly and easily create layouts with the basic 24-column.

## Usage

```jsx
import { Row, Col } from 'tiny-design';
```

## Examples

<Demo>

### Basic Grid

Create basic grid layout using columns.

<DemoBlock component={BasicDemo} source={BasicSource} />

</Demo>
<Demo>

### Gutter

Use the `gutter` property of `Row` as grid spacing. It is recommended to set it to `8n` px. (`n` stands for natural number.)

<DemoBlock component={GutterDemo} source={GutterSource} />

</Demo>
<Demo>

### Column offset

`Offset` can set the column to the right side.

<DemoBlock component={OffsetDemo} source={OffsetSource} />

</Demo>
<Demo>

### Order

Change the element sort by `order`.

<DemoBlock component={OrderDemo} source={OrderSource} />

</Demo>
<Demo>

### Alignment

Child elements vertically aligned.

<DemoBlock component={AlignmentDemo} source={AlignmentSource} />

</Demo>
<Demo>

### Responsive

Columns respond to viewport width using `xs`, `sm`, `md`, `lg`, `xl`, `xxl` breakpoints. Resize the browser to see columns reflow.

<DemoBlock component={ResponsiveDemo} source={ResponsiveSource} />

</Demo>

## API

### Row

| Property   | Description                                                     | Type                                                                                         | Default |
| ---------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------- |
| gutter     | spacing between grids                                           | number &#124; [number, number]                                                               | 0       |
| gutterSide | gutter padding includes first and end child                     | boolean                                                                                      | false   |
| align      | vertical alignment                                              | enum: `top` &#124; `center` &#124; `bottom`                                                  | -       |
| justify    | horizontal arrangement                                          | enum: `start` &#124; `end` &#124; `center` &#124; `space-around` &#124; `space-between`      | -       |
| style      | style object of container                                       | CSSProperties                                                                                | -       |
| className  | className of container                                          | string                                                                                       | -       |

### Col

| Property  | Description                                      | Type                                          | Default |
| --------- | ------------------------------------------------ | --------------------------------------------- | ------- |
| span      | number of cells to occupy (out of 24)            | number                                        | -       |
| offset    | number of cells to offset from the left          | number                                        | 0       |
| order     | rearrange order                                  | number                                        | 0       |
| xs        | screen < 480px, or a config object               | number &#124; \{ span, offset, order \}         | -       |
| sm        | screen >= 600px, or a config object              | number &#124; \{ span, offset, order \}         | -       |
| md        | screen >= 840px, or a config object              | number &#124; \{ span, offset, order \}         | -       |
| lg        | screen >= 960px, or a config object              | number &#124; \{ span, offset, order \}         | -       |
| xl        | screen >= 1280px, or a config object             | number &#124; \{ span, offset, order \}         | -       |
| xxl       | screen >= 1440px, or a config object             | number &#124; \{ span, offset, order \}         | -       |
| style     | style object of container                        | CSSProperties                                 | -       |
| className | className of container                           | string                                        | -       |