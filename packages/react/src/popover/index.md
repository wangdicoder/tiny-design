import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';
import TriggerDemo from './demo/Trigger';
import TriggerSource from './demo/Trigger.tsx?raw';
import ControlledDemo from './demo/Controlled';
import ControlledSource from './demo/Controlled.tsx?raw';

# Popover

The floating card popped by clicking or hovering.

## Scenario

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` can also provide action elements like links and buttons.

## Usage

```jsx
import { Popover } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

The simplest usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Placement

There are 12 placement options available.

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Four ways to trigger

Mouse to click, right click, focus and move in.

<DemoBlock component={TriggerDemo} source={TriggerSource} />

    </Demo>
    <Demo>

### Controlled dialog

Use `visible` prop to control the display of the card.

<DemoBlock component={ControlledDemo} source={ControlledSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property        | Description                                         | Type                                                                                                                                                                            | Default   |
| --------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| title           | title of the popover                                | ReactNode                                                                                                                                                                       | -         |
| content         | content of the popover                              | ReactNode                                                                                                                                                                       | -         |
| placement       | position of the popover                             | enum: `top` &#124; `top-start` &#124; `top-end` &#124; `bottom` &#124; `bottom-start` &#124; `bottom-end` &#124; `left` &#124; `left-start` &#124; `left-end` &#124; `right` &#124; `right-start` &#124; `right-end` | `top`     |
| trigger         | trigger mode                                        | enum: `hover` &#124; `focus` &#124; `click` &#124; `contextmenu` &#124; `manual`                                                                                               | `hover`   |
| visible         | controlled visibility                               | boolean                                                                                                                                                                         | -         |
| defaultVisible  | initial visibility                                  | boolean                                                                                                                                                                         | false     |
| onVisibleChange | callback when visibility changes                    | (visible: boolean) => void                                                                                                                                                      | -         |
| theme           | background theme                                    | enum: `light` &#124; `dark`                                                                                                                                                     | `light`   |
| arrow           | whether to display an arrow                         | boolean                                                                                                                                                                         | true      |
| offset          | distance between popup and trigger                  | number                                                                                                                                                                          | -         |
| mouseEnterDelay | delay before showing on hover (seconds)             | number                                                                                                                                                                          | -         |
| mouseLeaveDelay | delay before hiding on mouse leave (seconds)        | number                                                                                                                                                                          | -         |
| disabled        | whether disabled                                    | boolean                                                                                                                                                                         | false     |
| style           | style object of container                           | CSSProperties                                                                                                                                                                   | -         |
| className       | className of container                              | string                                                                                                                                                                          | -         |