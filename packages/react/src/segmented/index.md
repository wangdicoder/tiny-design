import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ControlledDemo from './demo/Controlled';
import ControlledSource from './demo/Controlled.tsx?raw';
import DefaultValueDemo from './demo/DefaultValue';
import DefaultValueSource from './demo/DefaultValue.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import NoSelectionDemo from './demo/NoSelection';
import NoSelectionSource from './demo/NoSelection.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';

# Segmented

Segmented single-choice control for switching between a set of options.

## Scenario

Use when you have 2-5 mutually exclusive options and want a more visual alternative to Radio.Group.

## Usage

```jsx
import { Segmented } from '@tiny-design/react';
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
    <Demo>

### Controlled

Use `value` and `onChange` when the selected state is managed externally.

<DemoBlock component={ControlledDemo} source={ControlledSource} />

    </Demo>
    <Demo>

### No Selection

Without `value` or `defaultValue`, the control starts with no selected option.

<DemoBlock component={NoSelectionDemo} source={NoSelectionSource} />

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
    <Demo>

### Default Value

Use `defaultValue` to set the initial selection in uncontrolled mode.

<DemoBlock component={DefaultValueDemo} source={DefaultValueSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property     | Description                                 | Type                                                  | Default |
| ------------ | ------------------------------------------- | ----------------------------------------------------- | ------- |
| options      | segmented options                           | SegmentedOption[]                                     |         |
| name         | shared radio name for the internal inputs   | string                                                | auto    |
| value        | currently selected value (controlled)       | string \| number                                      |         |
| defaultValue | initial selected value                      | string \| number                                      |         |
| onChange     | callback when the value changes             | (value, option, event) => void                        |         |
| block        | fit width to parent                         | boolean                                               | false   |
| disabled     | disable the entire control                  | boolean                                               | false   |
| size         | size of the control                         | 'sm' \| 'md' \| 'lg'                                  | md      |

### SegmentedOption

| Property | Description                             | Type      | Default |
| -------- | --------------------------------------- | --------- | ------- |
| value    | option value                            | string \| number |  |
| label    | display content                         | ReactNode |         |
| disabled | disable this option                     | boolean   | false   |
| icon     | icon node                               | ReactNode |         |
| title    | title and fallback accessible label     | string    |         |
| className| custom class name for the option item   | string    |         |
