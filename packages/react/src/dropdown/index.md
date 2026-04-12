import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import OtherDemo from './demo/Other';
import OtherSource from './demo/Other.tsx?raw';
import CascadeDemo from './demo/Cascade';
import CascadeSource from './demo/Cascade.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';
import ArrowDemo from './demo/Arrow';
import ArrowSource from './demo/Arrow.tsx?raw';
import TriggerDemo from './demo/Trigger';
import TriggerSource from './demo/Trigger.tsx?raw';
import CloseDemo from './demo/Close';
import CloseSource from './demo/Close.tsx?raw';

# Dropdown

A drop-down list is a graphical control element, similar to a list box.

## Scenario

When there are more than a few options to choose from, you can wrap them in a `Dropdown`. By hovering or clicking on the trigger, a dropdown menu will appear, which allows you to choose an option and execute the relevant action.

## Usage

```jsx
import { Dropdown } from 'tiny-design';
```

## Recommended Pattern

`Dropdown` is responsible for trigger, popup positioning, and visibility. `Menu` is responsible for menu structure.

When `overlay` is a `Menu`, Dropdown will normalize it to a dropdown-menu scene:

- `mode` is normalized to `vertical`
- `appearance` is normalized to `dropdown`

This keeps dropdown menus visually stable and avoids leaking navigation-style `Menu` variants into popup menus. If you need page navigation, use `Menu appearance="navigation"` directly instead of wrapping it in `Dropdown`.

`Dropdown` reuses `Menu` for structure and submenu behavior, but keeps its popup styling independent. Updating dropdown-specific theme tokens will not change `Menu` navigation or popup defaults.

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A very simple dropdown.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Other elements

You can use other elements as the trigger.

<DemoBlock component={OtherDemo} source={OtherSource} />

    </Demo>
    <Demo>

### Cascade

Cascading menu.

<DemoBlock component={CascadeDemo} source={CascadeSource} />

    </Demo>
    <Demo>

### Arrow

Show arrow.

<DemoBlock component={ArrowDemo} source={ArrowSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Placement

Placement of popup menu.

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
    <Demo>

### Trigger mode

Open the menu by clicking.

<DemoBlock component={TriggerDemo} source={TriggerSource} />

    </Demo>
    <Demo>

### Close

Close menu on click.

<DemoBlock component={CloseDemo} source={CloseSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property          | Description                           | Type                          | Default   |
| ----------------- | ------------------------------------- | ----------------------------- | --------- |
| disabled          | whether the dropdown menu is disabled | boolean                       | false     |
| trigger           | trigger mode                          | enum: `click` &#124; `hover`  | `hover`   |
| placement         | placement of popup menu               | enum: `top-start` &#124; `top` &#124; `end` &#124; `bottom-start` &#124; `bottom` &#124; `bottom-end` | `bottom-start`    |
| overlay           | popup content. `Menu` is the recommended overlay; when used, it is normalized to dropdown menu appearance | [Menu](../components/menu) \| ReactNode | -         |
| visible           | whether the dropdown menu is visible  | boolean                       | -         |
| arrow             | display the dropdown arrow            | boolean                       | false     |
| onVisibleChange   | allow to get millisecond value        | (visible: boolean) => void    | -         |
