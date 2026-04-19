import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DirectionDemo from './demo/Direction';
import DirectionSource from './demo/Direction.tsx?raw';
import ClickDemo from './demo/Click';
import ClickSource from './demo/Click.tsx?raw';
import CustomIconDemo from './demo/CustomIcon';
import CustomIconSource from './demo/CustomIcon.tsx?raw';

# QuickActions

A compact action launcher that expands to reveal a set of quick actions.

## Scenario

When you need a floating action button that can reveal multiple related actions. Commonly used for quick-access actions in the bottom corner of a page.

## Usage

```jsx
import { QuickActions } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic QuickActions that expands on hover.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Click Trigger

Use `trigger="click"` to open QuickActions on click instead of hover.

<DemoBlock component={ClickDemo} source={ClickSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Direction

QuickActions supports four directions: `up`, `down`, `left`, and `right`.

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

### QuickActions

| Property  | Description                          | Type                                                   | Default  |
| --------- | ------------------------------------ | ------------------------------------------------------ | -------- |
| icon      | icon for the main trigger button     | ReactNode                                              | `+`      |
| openIcon  | icon shown when QuickActions is open | ReactNode                                              | -        |
| direction | direction the actions expand         | enum: `up` &#124; `down` &#124; `left` &#124; `right` | `up`     |
| open      | controlled open state                | boolean                                                | -        |
| trigger   | how QuickActions is activated        | enum: `hover` &#124; `click`                           | `hover`  |
| onOpen    | callback when QuickActions opens     | () => void                                             | -        |
| onClose   | callback when QuickActions closes    | () => void                                             | -        |
| disabled  | whether QuickActions is disabled     | boolean                                                | false    |

### QuickActions.Action

| Property          | Description                       | Type                                                    | Default |
| ----------------- | --------------------------------- | ------------------------------------------------------- | ------- |
| icon              | icon for the action button        | ReactNode                                               | -       |
| tooltip           | tooltip text                      | string                                                  | -       |
| tooltipPlacement  | tooltip position                  | enum: `left` &#124; `right` &#124; `top` &#124; `bottom` | -       |
| disabled          | whether the action is disabled    | boolean                                                 | false   |
