import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CheckAllDemo from './demo/CheckAll';
import CheckAllSource from './demo/CheckAll.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import GroupDemo from './demo/Group';
import GroupSource from './demo/Group.tsx?raw';

# Checkbox

A multiple entry component.

## Scenario

- Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.

## Usage

```jsx
import { Checkbox } from '@tiny-design/react';

const { Group } = Checkbox;
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

### Checkbox Group

A group of checkbox components.

<DemoBlock component={GroupDemo} source={GroupSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Check all

The `indeterminate` property can help you to achieve a **check all** effect.

<DemoBlock component={CheckAllDemo} source={CheckAllSource} />

    </Demo>
    <Demo>

### Disabled

Disabled state of Checkbox.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Checkbox

| Property       | Description                              | Type                                     | Default |
| -------------- | ---------------------------------------- | ---------------------------------------- | ------- |
| value          | only required when used with Group       | string                                   | -       |
| defaultChecked | initial checked state                    | boolean                                  | false   |
| checked        | controlled checked state                 | boolean                                  | -       |
| indeterminate  | half-checked (visual only) state         | boolean                                  | false   |
| disabled       | whether disabled                         | boolean                                  | false   |
| onChange       | callback when state changes              | (e: ChangeEvent) => void                 | -       |
| style          | style object of container                | CSSProperties                            | -       |
| className      | className of container                   | string                                   | -       |

### Checkbox.Group

| Property     | Description                        | Type                             | Default |
| ------------ | ---------------------------------- | -------------------------------- | ------- |
| defaultValue | default selected values            | string[]                         | -       |
| value        | controlled selected values         | string[]                         | -       |
| onChange     | callback when selection changes    | (checkedValues: string[]) => void| -       |
| disabled     | whether disabled all checkboxes    | boolean                          | false   |