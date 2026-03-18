import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import AlignDemo from './demo/Align';
import AlignSource from './demo/Align.tsx?raw';

# Space

Set components spacing.

## Scenario

Avoid components clinging together and set a unified space.

## Usage

```jsx
import { Space } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic Usage

Distribute components in a horizontal space.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Space Size

`small`, `medium` and `large` preset sizes.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Vertical Space

Distribute components in a vertical space.

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### Align

Item align.

<DemoBlock component={AlignDemo} source={AlignSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property  | Description       | Type                                                          | Default       |
| --------- | ----------------- | ------------------------------------------------------------- | ------------- |
| align     | align items       | enum: `start` &#124; `end` &#124; `center` &#124; `baseline`  | `center`      |
| direction | space direction	| enum: `horizontal` &#124; `vertical`                          | `horizontal`  |
| size      | space size        | enum: `sm` &#124; `md` &#124; `lg` &#124; `number`            | `sm`          |