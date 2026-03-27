import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DirectionDemo from './demo/Direction';
import DirectionSource from './demo/Direction.tsx?raw';
import ClickDemo from './demo/Click';
import ClickSource from './demo/Click.tsx?raw';
import CustomIconDemo from './demo/CustomIcon';
import CustomIconSource from './demo/CustomIcon.tsx?raw';

# SpeedDial

A floating action button that expands to reveal a set of actions.

## Scenario

When you need a floating action button that can reveal multiple related actions. Commonly used for quick-access actions in the bottom corner of a page.

## Usage

```jsx
import { SpeedDial } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic SpeedDial that expands on hover.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Click Trigger

Use `trigger="click"` to open the SpeedDial on click instead of hover.

<DemoBlock component={ClickDemo} source={ClickSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Direction

SpeedDial supports four directions: `up`, `down`, `left`, and `right`.

<DemoBlock component={DirectionDemo} source={DirectionSource} />

    </Demo>
    <Demo>

### Custom Icon

Customize the FAB icon and the open icon.

<DemoBlock component={CustomIconDemo} source={CustomIconSource} />

    </Demo>
  </Column>
</Layout>

## Props

### SpeedDial

| Property  | Description                          | Type                                           | Default  |
| --------- | ------------------------------------ | ---------------------------------------------- | -------- |
| icon      | icon for the main FAB button         | ReactNode                                      | `+`      |
| openIcon  | icon shown when the SpeedDial is open | ReactNode                                     | -        |
| direction | direction the actions expand         | enum: `up` &#124; `down` &#124; `left` &#124; `right` | `up`     |
| open      | controlled open state                | boolean                                        | -        |
| trigger   | how the SpeedDial is activated       | enum: `hover` &#124; `click`                   | `hover`  |
| onOpen    | callback when SpeedDial opens        | () => void                                     | -        |
| onClose   | callback when SpeedDial closes       | () => void                                     | -        |
| disabled  | whether the SpeedDial is disabled    | boolean                                        | false    |

### SpeedDial.Action

| Property          | Description                       | Type                                                    | Default |
| ----------------- | --------------------------------- | ------------------------------------------------------- | ------- |
| icon              | icon for the action button        | ReactNode                                               | -       |
| tooltip           | tooltip text                      | string                                                  | -       |
| tooltipPlacement  | tooltip position                  | enum: `left` &#124; `right` &#124; `top` &#124; `bottom` | -       |
| disabled          | whether the action is disabled    | boolean                                                 | false   |