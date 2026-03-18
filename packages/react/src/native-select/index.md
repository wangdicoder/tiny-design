import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import GroupDemo from './demo/Group';
import GroupSource from './demo/Group.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';

# Native Select

Select component to select value from options.

## Scenario
- It is a light weight select component which wraps native `<select>` element.
- A dropdown menu for displaying choices
- Group options - an elegant alternative to the native `<optgroup>`

## Usage

```js
import { NativeSelect } from 'tiny-design';

const { Group, Option } = NativeSelect;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Size

Use `size` to set different size of select

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Group

<DemoBlock component={GroupDemo} source={GroupSource} />

    </Demo>
    <Demo>

### Disabled

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property  | Description                      | Type                          | Default |
| --------- | -------------------------------- | ----------------------------- | ------- |
| size      | selection size                   | enum: `sm` `md` `lg`          | `md`    |
| disabled  | disable to select                | boolean                       | false   |
| style	    | style object of container	object |                               | -       |
| className	| className of container           | string                        | -       |
