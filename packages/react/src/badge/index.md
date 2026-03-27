import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomDemo from './demo/Custom';
import CustomSource from './demo/Custom.tsx?raw';
import DotDemo from './demo/Dot';
import DotSource from './demo/Dot.tsx?raw';
import OverflowDemo from './demo/Overflow';
import OverflowSource from './demo/Overflow.tsx?raw';
import StandaloneDemo from './demo/Standalone';
import StandaloneSource from './demo/Standalone.tsx?raw';
import DynamicDemo from './demo/Dynamic';
import DynamicSource from './demo/Dynamic.tsx?raw';

# Badge

Small numerical value or status descriptor for UI elements.

## Scenario

Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.

## Usage

```jsx
import { Badge } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Simplest Usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Overflow

`max` is displayed when count is larger than max count. The default maximum value is **99**.

<DemoBlock component={OverflowDemo} source={OverflowSource} />

    </Demo>
    <Demo>

### Standalone

Used in standalone when children is empty.

<DemoBlock component={StandaloneDemo} source={StandaloneSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Red badge

Display a red badge without a specific count.

<DemoBlock component={DotDemo} source={DotSource} />

    </Demo>
    <Demo>

### Colorful badge

Set `color` to display the dot badge with different colors. `processing` can show an wave animation.

> Only the dot badge has the `processing` effect.

<DemoBlock component={CustomDemo} source={CustomSource} />
    
    </Demo>
    <Demo>

### Dynamic

Increase or decrease the count with buttons, or toggle the dot with a switch.

<DemoBlock component={DynamicDemo} source={DynamicSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property      | Description                                                       | Type              | Default   |
| ------------- | ----------------------------------------------------------------- | ----------------- | --------- |
| count         | the number to show in badge                                       | ReactNode         |           |
| color         | background color                                                  | string            | #f2453d   |
| max           | max count to show                                                 | number            | 99        |
| dot           | display a dot only                                                | boolean           | false     |
| processing    | display wave effect                                               | boolean           | false     |
| showZero      | when value is equal to zero, the badge will be hidden by default  | boolean           | false     |
| title         | text to show when hovering over the badge                         | string            |           |
| badgeStyle    | internal badge style                                              | CSSProperties     |           |