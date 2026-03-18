import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import LoadingDemo from './demo/Loading';
import LoadingSource from './demo/Loading.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import TextDemo from './demo/Text';
import TextSource from './demo/Text.tsx?raw';

# Switch

Switch is used for switching between two opposing states.

## When To Use

- If you need to represent the switching between two states or on-off state.
- The difference between Switch and Checkbox is that Switch will trigger a state change directly when you toggle it, while Checkbox is generally used for state marking, which should work in conjunction with submit operation.

## Usage

```jsx
import { Switch } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

The most basic usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Text & customise element

With text and customise element.

<DemoBlock component={TextDemo} source={TextSource} />

    </Demo>
    <Demo>

### Different sizes

`size` attribute represents different sized switches.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Loading

Mark a pending state of switch.

<DemoBlock component={LoadingDemo} source={LoadingSource} />

    </Demo>
    <Demo>

### Disabled

Disabled state of Switch.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property       | Description                             | Type                                          | Default |
| -------------- | --------------------------------------- | --------------------------------------------- | ------- |
| defaultChecked | initial checked state                   | boolean                                       | false   |
| checked        | controlled checked state                | boolean                                       | -       |
| disabled       | whether disabled                        | boolean                                       | false   |
| loading        | loading state                           | boolean                                       | false   |
| size           | switch size                             | enum: `sm` &#124; `md` &#124; `lg`            | `md`    |
| checkedText    | content when checked                    | ReactNode                                     | -       |
| uncheckedText  | content when unchecked                  | ReactNode                                     | -       |
| onChange       | callback when state changes             | (checked: boolean, e: MouseEvent) => void     | -       |
| onClick        | click callback                          | (checked: boolean, e: MouseEvent) => void     | -       |
| style          | style object of container               | CSSProperties                                 | -       |
| className      | className of container                  | string                                        | -       |