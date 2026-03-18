import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import GroupDemo from './demo/Group';
import GroupSource from './demo/Group.tsx?raw';

# Radio

A single entry component. If there are only two options, consider using the `Switch` component.

## Scenario

- Used to select a single state from multiple options.
- The difference from Select is that Radio is visible to the user and can facilitate the comparison of choice, which means there shouldn't be too many of them.

## Usage

```jsx
import { Radio } from 'tiny-design';

const { Group } = Radio;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

The simplest use.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Disabled

Disabled state of Radio.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Radio Group

A group of radio components.

<DemoBlock component={GroupDemo} source={GroupSource} />

    </Demo>
  </Column>
</Layout>

## API

### Radio

| Property       | Description                         | Type                             | Default |
| -------------- | ----------------------------------- | -------------------------------- | ------- |
| value          | value used when in a Radio.Group    | string &#124; number             | -       |
| name           | the name attribute of input         | string                           | -       |
| defaultChecked | initial checked state               | boolean                          | false   |
| checked        | controlled checked state            | boolean                          | -       |
| disabled       | whether disabled                    | boolean                          | false   |
| onChange       | callback when state changes         | (e: ChangeEvent) => void         | -       |
| style          | style object of container           | CSSProperties                    | -       |
| className      | className of container              | string                           | -       |

### Radio.Group

| Property     | Description                       | Type                                      | Default |
| ------------ | --------------------------------- | ----------------------------------------- | ------- |
| name         | the name attribute for all radios | string                                    | -       |
| defaultValue | initial selected value            | string &#124; number                      | -       |
| value        | controlled selected value         | string &#124; number                      | -       |
| onChange     | callback when selection changes   | (value: string &#124; number) => void     | -       |
| disabled     | whether disabled all radios       | boolean                                   | false   |