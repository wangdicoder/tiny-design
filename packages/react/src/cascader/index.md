import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ChangeOnSelectDemo from './demo/ChangeOnSelect';
import ChangeOnSelectSource from './demo/ChangeOnSelect.tsx?raw';
import DefaultValueDemo from './demo/DefaultValue';
import DefaultValueSource from './demo/DefaultValue.tsx?raw';
import HoverDemo from './demo/Hover';
import HoverSource from './demo/Hover.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import SizesDemo from './demo/Sizes';
import SizesSource from './demo/Sizes.tsx?raw';

# Cascader

A multi-level dropdown for selecting hierarchical data.

## Scenario

Used to select data from a hierarchy such as location (country > state > city) or category trees.

## Usage

```jsx
import { Cascader } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Select a location from a country > state/province > city hierarchy.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Hover Expand

Expand sub-menus on hover instead of click for faster navigation.

<DemoBlock component={HoverDemo} source={HoverSource} />

    </Demo>
    <Demo>

### Sizes

Three sizes to match different form densities.

<DemoBlock component={SizesDemo} source={SizesSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Default Value

Pre-select a value and customize how the selection is displayed.

<DemoBlock component={DefaultValueDemo} source={DefaultValueSource} />

    </Demo>
    <Demo>

### Disabled Options

Disable specific options or the entire cascader.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### Change On Select

By default, only selecting a leaf node triggers `onChange`. Set `changeOnSelect` to fire `onChange` at every level, allowing partial selections. Use `displayRender` to customize how the selected path is shown.

<DemoBlock component={ChangeOnSelectDemo} source={ChangeOnSelectSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property               | Description                         | Type                                                      | Default        |
| ---------------------- | ----------------------------------- | --------------------------------------------------------- | -------------- |
| options                | hierarchical data options           | CascaderOption[]                                          |                |
| value                  | selected value (controlled)         | (string \| number)[]                                      |                |
| defaultValue           | default selected value              | (string \| number)[]                                      |                |
| onChange               | callback when selection changes     | (value, selectedOptions) => void                          |                |
| placeholder            | placeholder text                    | string                                                    | Please select  |
| disabled               | disable the cascader                | boolean                                                   | false          |
| allowClear             | show clear button                   | boolean                                                   | true           |
| size                   | input size                          | 'sm' \| 'md' \| 'lg'                                    | md             |
| expandTrigger          | sub-menu expand trigger             | 'click' \| 'hover'                                      | click          |
| displayRender          | custom selected display             | (labels, options) => ReactNode                            |                |
| changeOnSelect         | change value on each level select   | boolean                                                   | false          |

### CascaderOption

| Property | Description           | Type              | Default |
| -------- | --------------------- | ----------------- | ------- |
| value    | option value          | string \| number  |         |
| label    | option label          | ReactNode         |         |
| disabled | disable this option   | boolean           | false   |
| children | child options         | CascaderOption[]  |         |
| isLeaf   | mark as leaf node     | boolean           |         |