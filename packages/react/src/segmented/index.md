import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';

# Segmented

Segmented control for toggling between a set of options.

## Scenario

Use when you have 2-5 mutually exclusive options and want a more visual alternative to Radio.Group.

## Usage

```jsx
import { Segmented } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Simplest usage of Segmented control.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### With Icons

Add icons to segmented options using the `icon` property.

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Size

Three sizes: `sm`, `md`, and `lg`.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### Disabled

Disable the entire control or individual options.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property     | Description                                 | Type                                                  | Default |
| ------------ | ------------------------------------------- | ----------------------------------------------------- | ------- |
| options      | options for the segmented control           | (string \| number \| SegmentedOption)[]               |         |
| value        | currently selected value (controlled)       | string \| number                                      |         |
| defaultValue | default selected value                      | string \| number                                      |         |
| onChange     | callback when the value changes             | (value: string \| number) => void                     |         |
| block        | fit width to parent                         | boolean                                               | false   |
| disabled     | disable the entire control                  | boolean                                               | false   |
| size         | size of the control                         | 'sm' \| 'md' \| 'lg'                                 | md      |

### SegmentedOption

| Property | Description               | Type      | Default |
| -------- | ------------------------- | --------- | ------- |
| label    | display text              | ReactNode |         |
| value    | option value              | string \| number |  |
| disabled | disable this option       | boolean   | false   |
| icon     | icon node                 | ReactNode |         |