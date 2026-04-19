import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CardDemo from './demo/Card';
import CardSource from './demo/Card.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import ExtraDemo from './demo/Extra';
import ExtraSource from './demo/Extra.tsx?raw';
import PositionDemo from './demo/Position';
import PositionSource from './demo/Position.tsx?raw';
import EditableDemo from './demo/Editable';
import EditableSource from './demo/Editable.tsx?raw';
import AnimatedDemo from './demo/Animated';
import AnimatedSource from './demo/Animated.tsx?raw';

# Tabs

Tabs make it easy to switch between different views.

## Usage

```jsx
import { Tabs } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Basic usage of Tabs with the `items` API.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Card Type

Card style tabs.

<DemoBlock component={CardDemo} source={CardSource} />

    </Demo>
    <Demo>

### Editable Tabs

Add and remove tabs dynamically with the `editable-card` type.

<DemoBlock component={EditableDemo} source={EditableSource} />

    </Demo>
    <Demo>

### No Animation

Disable the tab switching animation by setting `animated` to `false`.

<DemoBlock component={AnimatedDemo} source={AnimatedSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Disabled

A disabled tab.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### Tab Position

Tabs can be placed on the top, bottom, left, or right.

<DemoBlock component={PositionDemo} source={PositionSource} />

    </Demo>
    <Demo>

### Extra Content

Add extra content to the tab bar with `tabBarExtraContent`. Use icons in tab labels via `items`.

<DemoBlock component={ExtraDemo} source={ExtraSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Tabs

| Property              | Description                                 | Type                                                              | Default    |
| --------------------- | ------------------------------------------- | ----------------------------------------------------------------- | ---------- |
| activeKey             | Current active tab key (controlled)         | string                                                            | -          |
| defaultActiveKey      | Initial active tab key                      | string                                                            | first key  |
| items                 | Tab configuration array                     | [TabItem](#tabitem)\[\]                                           | -          |
| type                  | Tab style type                              | `line` &#124; `card` &#124; `editable-card`                       | `line`     |
| tabPosition           | Position of tabs                            | `top` &#124; `bottom` &#124; `left` &#124; `right`                | `top`      |
| size                  | Tab bar size                                | `sm` &#124; `md` &#124; `lg`                                      | `md`       |
| animated              | Whether to animate tab transitions          | boolean                                                           | true       |
| centered              | Center the tab bar                          | boolean                                                           | false      |
| destroyInactiveTabPane| Destroy inactive tab pane content           | boolean                                                           | false      |
| tabBarExtraContent    | Extra content in the tab bar                | ReactNode &#124; \{ left?: ReactNode, right?: ReactNode \}        | -          |
| tabBarGutter          | Gap between tabs in pixels                  | number                                                            | -          |
| tabBarStyle           | Tab bar inline styles                       | CSSProperties                                                     | -          |
| hideAdd               | Hide add button for editable-card           | boolean                                                           | false      |
| onChange              | Callback when active tab changes            | (activeKey: string) => void                                       | -          |
| onTabClick            | Callback when a tab is clicked              | (key: string, event: MouseEvent) => void                          | -          |
| onEdit                | Callback for add/remove (editable-card)     | (targetKey &#124; event, action: 'add' &#124; 'remove') => void   | -          |
| style                 | Style object of container                   | CSSProperties                                                     | -          |
| className             | ClassName of container                      | string                                                            | -          |

### TabItem

| Property   | Description                    | Type        | Default |
| ---------- | ------------------------------ | ----------- | ------- |
| key        | Unique identifier              | string      | -       |
| label      | Tab header content             | ReactNode   | -       |
| children   | Tab body content               | ReactNode   | -       |
| icon       | Tab header icon                | ReactNode   | -       |
| disabled   | Disable the tab                | boolean     | false   |
| closable   | Show close button (editable)   | boolean     | true    |
| forceRender| Pre-render tab content         | boolean     | false   |

### Tabs.Panel (legacy)

| Property  | Description                      | Type            | Default |
| --------- | -------------------------------- | --------------- | ------- |
| tab       | Tab header content               | React.ReactNode | -       |
| tabKey    | Unique key for the tab           | string          | -       |
| disabled  | Whether the tab is disabled      | boolean         | false   |
| closable  | Whether the tab can be closed    | boolean         | false   |