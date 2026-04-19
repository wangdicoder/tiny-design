import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DirectionDemo from './demo/Direction';
import DirectionSource from './demo/Direction.tsx?raw';
import HoverDemo from './demo/Click';
import HoverSource from './demo/Click.tsx?raw';
import ControlledDemo from './demo/CustomIcon';
import ControlledSource from './demo/CustomIcon.tsx?raw';
import ActionBehaviorDemo from './demo/ActionBehavior';
import ActionBehaviorSource from './demo/ActionBehavior.tsx?raw';

# QuickActions

A floating action launcher for a small set of high-priority tasks.

## Scenario

Use QuickActions when a page or card has a compact cluster of actions that should stay within reach without consuming permanent layout space.

This component is designed for:

- 2 to 5 actions
- short, high-frequency tasks
- action labels that need to stay understandable without relying on tooltips

## Usage

```jsx
import { QuickActions } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Product-grade default

Click to expand a concise action stack with labels and supporting copy.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Hover or focus

`trigger="hover"` still supports keyboard focus, so the launcher is usable beyond pointer-only interaction.

<DemoBlock component={HoverDemo} source={HoverSource} />

    </Demo>

  </Column>
  <Column>
    <Demo>

### Direction

QuickActions can expand in four directions depending on the surrounding layout.

<DemoBlock component={DirectionDemo} source={DirectionSource} />

    </Demo>
    <Demo>

### Controlled

Use `open` and `onOpenChange` when the launcher needs to stay in sync with external product state.

<DemoBlock component={ControlledDemo} source={ControlledSource} />

    </Demo>
    <Demo>

### Action behavior

Use `closeOnActionClick={false}` to keep the full launcher open, or `keepOpen` when only specific actions should persist.

<DemoBlock component={ActionBehaviorDemo} source={ActionBehaviorSource} />

    </Demo>

  </Column>
</Layout>

## Props

### QuickActions

| Property           | Description                                      | Type                                                                                                                                     | Default           |
| ------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| icon               | Icon for the trigger button                      | ReactNode                                                                                                                                | `+`               |
| openIcon           | Icon shown when the launcher is open             | ReactNode                                                                                                                                | -                 |
| label              | Accessible label for the trigger button          | string                                                                                                                                   | `'Quick actions'` |
| direction          | Direction the actions expand                     | enum: `up` \| `down` \| `left` \| `right`                                                                                                | `up`              |
| trigger            | Interaction mode used to open the launcher       | enum: `click` \| `hover`                                                                                                                 | `click`           |
| open               | Controlled open state                            | boolean                                                                                                                                  | -                 |
| defaultOpen        | Initial open state                               | boolean                                                                                                                                  | false             |
| closeOnActionClick | Whether actions close the launcher after a click | boolean                                                                                                                                  | true              |
| disabled           | Whether the launcher is disabled                 | boolean                                                                                                                                  | false             |
| onOpenChange       | Callback when open state changes                 | `(open: boolean, context: { source: 'trigger-click' \| 'trigger-hover' \| 'focus' \| 'outside' \| 'escape' \| 'action-click' }) => void` | -                 |

### QuickActions.Action

| Property    | Description                                         | Type      | Default |
| ----------- | --------------------------------------------------- | --------- | ------- |
| icon        | Leading visual for the action                       | ReactNode | -       |
| label       | Primary action label                                | ReactNode | -       |
| description | Secondary helper text for the action                | ReactNode | -       |
| danger      | Applies destructive styling                         | boolean   | false   |
| loading     | Shows a loading indicator and disables the action   | boolean   | false   |
| disabled    | Whether the action is disabled                      | boolean   | false   |
| keepOpen    | Keeps the launcher open after the action is clicked | boolean   | false   |
