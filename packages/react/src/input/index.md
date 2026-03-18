import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import AddonDemo from './demo/Addon';
import AddonSource from './demo/Addon.tsx?raw';
import AddonButtonDemo from './demo/AddonButton';
import AddonButtonSource from './demo/AddonButton.tsx?raw';
import PreSufFixDemo from './demo/PreSufFix';
import PreSufFixSource from './demo/PreSufFix.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import ClearableDemo from './demo/Clearable';
import ClearableSource from './demo/Clearable.tsx?raw';

# Input

A basic widget for getting the user input is a text field. Keyboard and mouse can be used for providing or changing data.

## Scenario

A user input in a form field is needed.

## Usage

```js
import { Input } from 'tiny-design';

const { Group, Addon } = Input;
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

### Addon

Using `Addon` example.

<DemoBlock component={AddonDemo} source={AddonSource} />

    </Demo>
    <Demo>

### Addon with Button

Add a button in `Addon` component to compose an input form, like search function.

> Pass `noBorder` prop to `Addon` component.

<DemoBlock component={AddonButtonDemo} source={AddonButtonSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Prefix & Suffix

Add prefix or suffix icons inside input.

<DemoBlock component={PreSufFixDemo} source={PreSufFixSource} />

    </Demo>
    <Demo>

### Three sizes of Input

There are three sizes of an Input box: `lg`, `md` and `sm`.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### With clear icon

Allow to clear all content.

<DemoBlock component={ClearableDemo} source={ClearableSource} />

    </Demo>
  </Column>
</Layout>

## API

### Input

| Property     | Description                              | Type                                        | Default |
| ------------ | ---------------------------------------- | ------------------------------------------- | ------- |
| value        | input content value                      | string                                      | -       |
| defaultValue | initial input value                      | string                                      | -       |
| size         | input size                               | enum: `sm` &#124; `md` &#124; `lg`          | `md`    |
| clearable    | allow to remove input content            | boolean                                     | false   |
| prefix       | prefix icon or element                   | ReactNode                                   | -       |
| suffix       | suffix icon or element                   | ReactNode                                   | -       |
| disabled     | whether disabled                         | boolean                                     | false   |
| onChange     | callback when value changes              | (e: ChangeEvent) => void                    | -       |
| onEnterPress | callback when Enter key is pressed       | (e: KeyboardEvent) => void                  | -       |
| onClearClick | callback when clear button is clicked    | (e: MouseEvent) => void                     | -       |
| style        | style object of container                | CSSProperties                               | -       |
| className    | className of container                   | string                                      | -       |

### Input.Group

| Property  | Description                   | Type                                | Default |
| --------- | ----------------------------- | ----------------------------------- | ------- |
| size      | group size                    | enum: `sm` &#124; `md` &#124; `lg` | `md`    |
| disabled  | whether disabled all inputs   | boolean                             | false   |

### Input.Addon

| Property  | Description                    | Type      | Default |
| --------- | ------------------------------ | --------- | ------- |
| noBorder  | remove border from addon       | boolean   | false   |