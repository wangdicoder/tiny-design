import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DurationDemo from './demo/Duration';
import DurationSource from './demo/Duration.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';
import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';

# Notification

Display a notification message.

## Scenario

To display a notification message at any of the four corners of the viewport. Typically it can be used in the following cases:

- A notification with complex content.

- A notification providing a feedback based on the user interaction. Or it may show some details about upcoming steps the user may have to follow.

- A notification that is pushed by the application.

## Usage

```js
import { Notification } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

The simplest usage that close the notification box after 4.5s.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Control the close time

If set the `duration` value to 0, the notification will never close automatically.

<DemoBlock component={DurationDemo} source={DurationSource} />

    </Demo>
    <Demo>

### Customized Icon

The icon can be customized to any react node.

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Placement

A notification box can appear from the `topRight`, `bottomRight`, `bottomLeft` or `topLeft` of the viewport.

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
    <Demo>

### Different types of notification

A notification box with a icon at the left side.

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
  </Column>
</Layout>

## Props

Notification is called through static methods:

| Method                      | Description                    |
| --------------------------- | ------------------------------ |
| Notification.success(config) | display a success notification |
| Notification.error(config)   | display an error notification  |
| Notification.warning(config) | display a warning notification |
| Notification.info(config)    | display an info notification   |
| Notification.open(config)    | display a plain notification   |

### Config

| Property    | Description                                | Type                              | Default      |
| ----------- | ------------------------------------------ | --------------------------------- | ------------ |
| title       | notification title                         | ReactNode                         | -            |
| description | notification description content           | ReactNode                         | -            |
| footer      | custom footer content                      | ReactNode                         | -            |
| duration    | time before auto-dismiss in seconds, 0 to disable | number                      | 4.5          |
| icon        | custom icon, or false to hide              | ReactNode &#124; boolean          | -            |
| onClick     | click callback                             | (e: MouseEvent) => void           | -            |
| onClose     | close callback                             | (e: MouseEvent) => void           | -            |
| placement   | position of the notification               | enum: `top-right` &#124; `top-left` &#124; `bottom-right` &#124; `bottom-left` | `top-right` |