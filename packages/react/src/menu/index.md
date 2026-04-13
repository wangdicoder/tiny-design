import HorizontalDemo from './demo/Horizontal';
import HorizontalSource from './demo/Horizontal.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import InlineDemo from './demo/Inline';
import InlineSource from './demo/Inline.tsx?raw';
import VariantsDemo from './demo/Variants';
import VariantsSource from './demo/Variants.tsx?raw';
import ThemeDemo from './demo/Theme';
import ThemeSource from './demo/Theme.tsx?raw';

# Menu

A versatile navigation component with dropdown menu.

## Scenario

An accessible dropdown menu for the common dropdown menu button design pattern. Menu uses roving tabIndex for focus management.

## Usage

```jsx
import { Menu } from 'tiny-design';

const { Item, SubMenu, ItemGroup, Divider } = Menu;
```

`Menu` owns its own navigation and popup styling. Even though `Dropdown` can use `Menu` as `overlay`, dropdown-specific theme tokens do not drive `Menu` styles anymore.

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
<Demo>

### Variants And Selection Styles

Use `variant`, `selectionStyle`, and `size` to adapt the same menu structure to different products.

<DemoBlock component={VariantsDemo} source={VariantsSource} />

</Demo>
<Demo>

### Local Contrast Theme

Use `theme` when the menu needs local contrast against the page, such as a dark navigation island inside a light application shell. This is a component-level surface tone, not a replacement for the app's global light/dark theme.

<DemoBlock component={ThemeDemo} source={ThemeSource} />

</Demo>

## Visual semantics

`Menu` treats visual states as separate layers so variants can stay flexible without collapsing into one another:

- `selected`: the current leaf item, always the strongest emphasis
- `path-selected`: a parent item that contains the current selection, lighter than `selected`
- `open`: structural expansion only, never a substitute for selection
- `hover`: interaction feedback that should not erase `selected` or `path-selected`

`selectionStyle` controls how the selected state is expressed:

- `background`: selected items use surface fill, path items stay lighter
- `border`: selected items use outline emphasis without fill
- `indicator`: selected items rely on the indicator bar and text hierarchy only
- `mixed`: combines indicator with the active variant surface

Popup menus and inline menus share the same semantics, but popup path states intentionally stay lighter so the leaf item remains dominant.

## Notes on `index` keys

When you provide custom `index` values, they are used as-is. If omitted, numeric indices are auto-generated based on position. The menu tracks parent-child relationships through the component tree, so custom keys can use any naming convention freely (e.g., `"my-item"`, `"settings.general"`, `"foo"`).

## Props

### Menu

| Property        | Description                                    | Type                                                                       | Default      |
| --------------- | ---------------------------------------------- | -------------------------------------------------------------------------- | ------------ |
| defaultIndex    | initially selected menu item key               | string                                                                     | -            |
| selectedKeys    | controlled selected menu item keys             | string[]                                                                   | -            |
| defaultSelectedKeys | default selected menu item keys            | string[]                                                                   | -            |
| openKeys        | controlled opened submenu keys                 | string[]                                                                   | -            |
| defaultOpenKeys | default opened submenu keys                    | string[]                                                                   | -            |
| multiple        | whether multiple menu items can be selected    | boolean                                                                    | false        |
| theme           | local surface tone of the menu, useful for contrast sections inside a different global theme. When omitted, the menu follows the global theme | enum: `light` &#124; `dark`                             | follows global theme |
| mode            | type of menu                                   | enum: `horizontal` &#124; `vertical` &#124; `inline`                       | `horizontal` |
| appearance      | menu scene, use `dropdown` for popup/dropdown menus | enum: `navigation` &#124; `dropdown`                                   | `navigation` |
| variant         | built-in visual variant                        | enum: `outline` &#124; `fill` &#124; `ghost`                               | `outline`    |
| selectionStyle  | selected-state presentation                    | enum: `border` &#124; `background` &#124; `indicator` &#124; `mixed`      | `mixed`      |
| size            | menu item size                                 | enum: `sm` &#124; `md` &#124; `lg`                                         | `md`         |
| inlineIndent    | indent pixels of inline menu items per level   | number                                                                     | -            |
| onSelect        | called when a menu item is selected            | `(selectedIndex: string, info: MenuSelectInfo) => void`                    | -            |
| onOpenChange    | called when submenu open keys change           | (openKeys: string[]) => void                                               | -            |
| style           | style object of container                      | CSSProperties                                                              | -            |
| className       | className of container                         | string                                                                     | -            |

### Menu.Item

| Property  | Description                | Type                       | Default |
| --------- | -------------------------- | -------------------------- | ------- |
| index     | unique key of menu item    | string                     | -       |
| disabled  | whether disabled           | boolean                    | false   |
| danger    | whether to use danger tone | boolean                    | false   |
| icon      | icon of the menu item      | ReactNode                  | -       |
| extra     | right-side content         | ReactNode                  | -       |
| onClick   | click callback             | (e: MouseEvent) => void    | -       |

### Menu.SubMenu

| Property  | Description                      | Type      | Default |
| --------- | -------------------------------- | --------- | ------- |
| title     | title of the submenu             | ReactNode | -       |
| index     | unique key of submenu            | string    | -       |
| disabled  | whether disabled                 | boolean   | false   |
| danger    | whether to use danger tone       | boolean   | false   |
| icon      | icon of the submenu              | ReactNode | -       |
| extra     | right-side content               | ReactNode | -       |

### Menu.ItemGroup

| Property | Description             | Type   | Default |
| -------- | ----------------------- | ------ | ------- |
| title    | title of the group      | ReactNode | -    |
