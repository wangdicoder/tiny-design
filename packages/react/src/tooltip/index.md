import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ArrowDemo from './demo/Arrow';
import ArrowSource from './demo/Arrow.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';

# Tooltip

A simple text popup tip.

## Scenario

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a button/text/operation. It's often used instead of the html title attribute.

## Usage

```jsx
import { Tooltip } from '@tiny-design/react';
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

### Disable Arrow

Set `arrow={false}` to hide arrow.

<DemoBlock component={ArrowDemo} source={ArrowSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Placement

There are 12 placement options available.

> The tooltip's arrow is always pointing to the center of the trigger.

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property        | Description                                         | Type                                                                                                                                                                            | Default   |
| --------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| title           | tooltip content                                     | ReactNode                                                                                                                                                                       | -         |
| placement       | position of the tooltip                             | enum: `top` &#124; `top-start` &#124; `top-end` &#124; `bottom` &#124; `bottom-start` &#124; `bottom-end` &#124; `left` &#124; `left-start` &#124; `left-end` &#124; `right` &#124; `right-start` &#124; `right-end` | `top`     |
| trigger         | trigger mode                                        | enum: `hover` &#124; `focus` &#124; `click` &#124; `contextmenu` &#124; `manual`                                                                                               | `hover`   |
| visible         | controlled visibility                               | boolean                                                                                                                                                                         | -         |
| defaultVisible  | initial visibility                                  | boolean                                                                                                                                                                         | false     |
| onVisibleChange | callback when visibility changes                    | (visible: boolean) => void                                                                                                                                                      | -         |
| theme           | background theme                                    | enum: `light` &#124; `dark`                                                                                                                                                     | `dark`    |
| arrow           | whether to display an arrow                         | boolean                                                                                                                                                                         | true      |
| offset          | distance between tooltip and trigger                | number                                                                                                                                                                          | -         |
| mouseEnterDelay | delay before showing on hover (seconds)             | number                                                                                                                                                                          | -         |
| mouseLeaveDelay | delay before hiding on mouse leave (seconds)        | number                                                                                                                                                                          | -         |
| disabled        | whether disabled                                    | boolean                                                                                                                                                                         | false     |