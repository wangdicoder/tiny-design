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

## Scenario

Use Flex when you need a lightweight flexbox layout without wrapping each child in additional elements.

## Usage

```jsx
import { Flex } from 'tiny-design';
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

## API

| Property  | Description                      | Type                                                                 | Default |
| --------- | -------------------------------- | -------------------------------------------------------------------- | ------- |
| vertical  | Flex direction column            | `boolean`                                                            | `false` |
| wrap      | CSS flex-wrap                    | `nowrap` &#124; `wrap` &#124; `wrap-reverse`                         | -       |
| justify   | CSS justify-content              | `string`                                                             | -       |
| align     | CSS align-items                  | `string`                                                             | -       |
| gap       | Gap between items                | `sm` &#124; `md` &#124; `lg` &#124; `number` &#124; `string`        | -       |
| flex      | CSS flex shorthand               | `string`                                                             | -       |
| component | Custom element type              | `React.ElementType`                                                  | `div`   |