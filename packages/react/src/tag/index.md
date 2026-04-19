import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CheckableDemo from './demo/Checkable';
import CheckableSource from './demo/Checkable.tsx?raw';
import ColorDemo from './demo/Color';
import ColorSource from './demo/Color.tsx?raw';
import ControlledDemo from './demo/Controlled';
import ControlledSource from './demo/Controlled.tsx?raw';
import DynamicDemo from './demo/Dynamic';
import DynamicSource from './demo/Dynamic.tsx?raw';
import StatusDemo from './demo/Status';
import StatusSource from './demo/Status.tsx?raw';
import VariantDemo from './demo/Variant';
import VariantSource from './demo/Variant.tsx?raw';

# Tag

Tag for categorizing or markup.

## Scenario

- It can be used to tag by dimension or property.

- When categorizing.

## Usage

```js
import { Tag } from '@tiny-design/react';

const { CheckableTag } = Tag;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Add & Remove Dynamically

Adding or removing a set of tags dynamically.

<DemoBlock component={DynamicDemo} source={DynamicSource} />

    </Demo>
    <Demo>

### Checkable

`CheckableTag` works like Checkbox, click it to toggle checked state.

> It also has controlled & uncontrolled mode.

<DemoBlock component={CheckableDemo} source={CheckableSource} />

    </Demo>
    <Demo>

### Status

Status tags use semantic colors that match the button component's status types.

<DemoBlock component={StatusDemo} source={StatusSource} />

    </Demo>
    <Demo>

### Controlled

By using the `visible` prop, you can control the close state of Tag.

<DemoBlock component={ControlledDemo} source={ControlledSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Colorful Tag

We preset a series of colorful tag styles for use in different situations. You can also set it to a hex color string for custom color.

<DemoBlock component={ColorDemo} source={ColorSource} />

    </Demo>
    <Demo>

### Variant

Tags support four variants: `filled` (default), `soft`, `solid`, and `outlined`.

<DemoBlock component={VariantDemo} source={VariantSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Tag

| Property       | Description                                    | Type                                    | Default   |
| -------------- | ---------------------------------------------- | --------------------------------------- | --------- |
| color          | color of the tag (preset or custom hex)        | string                                  | -         |
| variant        | variant style of the tag                       | `'filled'` \| `'soft'` \| `'solid'` \| `'outlined'` | `'filled'` |
| closable       | whether the tag can be closed                  | boolean                                 | false     |
| defaultVisible | initial visibility                             | boolean                                 | true      |
| visible        | controlled visibility                          | boolean                                 | -         |
| onClose        | callback when tag is closed                    | (e: MouseEvent) => void                 | -         |
| onClick        | click callback                                 | (e: MouseEvent) => void                 | -         |
| style          | style object of container                      | CSSProperties                           | -         |
| className      | className of container                         | string                                  | -         |

Preset colors: `magenta`, `red`, `volcano`, `orange`, `gold`, `lime`, `green`, `cyan`, `blue`, `geekblue`, `purple`.

Status colors: `success`, `info`, `warning`, `danger`.

### Tag.CheckableTag

| Property       | Description                       | Type                                        | Default |
| -------------- | --------------------------------- | ------------------------------------------- | ------- |
| defaultChecked | initial checked state             | boolean                                     | false   |
| checked        | controlled checked state          | boolean                                     | -       |
| onChange       | callback when checked changes     | (checked: boolean, e: MouseEvent) => void   | -       |