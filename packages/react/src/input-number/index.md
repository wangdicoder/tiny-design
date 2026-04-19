import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import PrecisionDemo from './demo/Precision';
import PrecisionSource from './demo/Precision.tsx?raw';

# Input Number

Enter a number within certain range with the mouse or keyboard.

## Scenario

When a numeric value needs to be provided.

## Usage

```jsx
import { InputNumber } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A simple usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Disabled

Click the button to toggle between available and disabled states.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Size

Different sizes of input number components.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### Precision

Set decimal precision with `precision`, and use `controls` to always show step buttons.

<DemoBlock component={PrecisionDemo} source={PrecisionSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property      | Description                                           | Type                                  | Default                   |
| ------------- | ----------------------------------------------------- | ------------------------------------- | ------------------------- |
| min           | Min value                                             | number                                | Number.NEGATIVE_INFINITY  |
| max           | Max value                                             | number                                | Number.POSITIVE_INFINITY  |
| step          | Increased or decreased, it can be decimal or integer  | number                                | 1                         |
| defaultValue  | Initial value                                         | number                                | 0                         |
| value         | Current value                                         | number                                | -                         |
| onChange      | The callback when the value is changed.               | (value, e) => void                    | -                         |
| size          | Input box size                                        | enum: `sm` &#124; `md` &#124; `lg`    | `md`                      |
| disabled      | Disable the input                                     | boolean                               | false                     |
| controls      | Always display the controller                         | boolean                               | false                     |
| style	        | Style object of container object                      |                                       | -                         |
| className	    | ClassName of container                                | string                                | -                         |