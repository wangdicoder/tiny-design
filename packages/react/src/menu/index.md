import HorizontalDemo from './demo/Horizontal';
import HorizontalSource from './demo/Horizontal.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import InlineDemo from './demo/Inline';
import InlineSource from './demo/Inline.tsx?raw';

# Menu

A versatile navigation component with dropdown menu.

## Scenario

An accessible dropdown menu for the common dropdown menu button design pattern. Menu uses roving tabIndex for focus management.

## Usage

```jsx
import { Menu } from 'tiny-design';

const { Item, SubMenu, ItemGroup, Divider } = Menu;
```

## Examples

<Demo>

### Top Navigation

Horizontal top navigation menu.

<DemoBlock component={HorizontalDemo} source={HorizontalSource} />

</Demo>
<Demo>

### Vertical Navigation

A vertical menu with inline submenus.

<DemoBlock component={VerticalDemo} source={VerticalSource} />

</Demo>
<Demo>

### Inline Navigation

Inline navigation menu.

<DemoBlock component={InlineDemo} source={InlineSource} />

</Demo>


## API

### Menu

| Property        | Description                                    | Type                                                                       | Default      |
| --------------- | ---------------------------------------------- | -------------------------------------------------------------------------- | ------------ |
| defaultIndex    | initially selected menu item key               | string                                                                     | -            |
| theme           | color theme of the menu                        | enum: `light` &#124; `dark`                                                | `light`      |
| mode            | type of menu                                   | enum: `horizontal` &#124; `vertical` &#124; `inline`                       | `horizontal` |
| inlineIndent    | indent pixels of inline menu items per level   | number                                                                     | -            |
| onSelect        | called when a menu item is selected            | (selectedIndex: string) => void                                            | -            |
| style           | style object of container                      | CSSProperties                                                              | -            |
| className       | className of container                         | string                                                                     | -            |

### Menu.Item

| Property  | Description                | Type                       | Default |
| --------- | -------------------------- | -------------------------- | ------- |
| index     | unique key of menu item    | string                     | -       |
| disabled  | whether disabled           | boolean                    | false   |
| onClick   | click callback             | (e: MouseEvent) => void    | -       |

### Menu.SubMenu

| Property  | Description                      | Type      | Default |
| --------- | -------------------------------- | --------- | ------- |
| title     | title of the submenu             | ReactNode | -       |
| index     | unique key of submenu            | string    | -       |
| disabled  | whether disabled                 | boolean   | false   |
| icon      | icon of the submenu              | ReactNode | -       |

### Menu.ItemGroup

| Property | Description             | Type   | Default |
| -------- | ----------------------- | ------ | ------- |
| title    | title of the group      | string | -       |
