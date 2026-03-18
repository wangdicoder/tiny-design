import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';

# Split Button

A button with a dropdown menu.

## Scenario

The user can select a default value bound to a primary button, 
or select from a list of mutually exclusive values displayed in a drop-down list bound to a secondary button.

## Usage

```jsx
import { SplitButton } from 'tiny-design';
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

Disabled the button.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Placement

Set the placement of the dropdown menu. The default placement is `bottom-end`.

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property          | Description                            | Type                                                                                | Default   |
| ----------------- | -------------------------------------- | ----------------------------------------------------------------------------------- | --------- |
| onClick           | click handler for the primary button   | (e: MouseEvent) => void                                                             | -         |
| loading           | loading state                          | boolean                                                                             | false     |
| disabled          | whether disabled                       | boolean                                                                             | false     |
| size              | button size                            | enum: `sm` &#124; `md` &#124; `lg`                                                 | `md`      |
| btnType           | button type                            | enum: `default` &#124; `primary` &#124; `outline` &#124; `ghost` &#124; `link` &#124; `info` &#124; `success` &#124; `warning` &#124; `danger` | `default` |
| overlay           | dropdown menu element                  | React.ReactElement&lt;MenuProps&gt;                                                 | -         |
| dropdownTrigger   | dropdown trigger mode                  | enum: `hover` &#124; `click`                                                       | `hover`   |
| dropdownPlacement | dropdown placement                     | enum: `bottom-start` &#124; `bottom` &#124; `bottom-end`                           | `bottom-end` |
| style             | style object of container              | CSSProperties                                                                       | -         |
| className         | className of container                 | string                                                                              | -         |
