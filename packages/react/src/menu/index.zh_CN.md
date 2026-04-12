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

# Menu 菜单

一个多功能的导航组件，支持下拉菜单。

## 使用场景

一个可访问的下拉菜单组件，适用于常见的下拉菜单按钮设计模式。Menu 使用 roving tabIndex 进行焦点管理。

## 使用方式

```jsx
import { Menu } from 'tiny-design';

const { Item, SubMenu, ItemGroup, Divider } = Menu;
```

`Menu` 现在自己维护导航态和 popup 的样式。即使 `Dropdown` 把 `Menu` 作为 `overlay` 使用，dropdown 专属主题变量也不会再反向驱动 `Menu` 的样式。

## 代码示例

<Demo>

### 顶部导航

水平顶部导航菜单。

<DemoBlock component={HorizontalDemo} source={HorizontalSource} />

</Demo>
<Demo>

### 垂直导航

垂直菜单，内联子菜单。

<DemoBlock component={VerticalDemo} source={VerticalSource} />

</Demo>
<Demo>

### 内联导航

内联导航菜单。

<DemoBlock component={InlineDemo} source={InlineSource} />

</Demo>
<Demo>

### 变体与选中样式

通过 `variant`、`selectionStyle`、`size` 和 `density`，可以在不改结构的前提下适配不同产品风格。

<DemoBlock component={VariantsDemo} source={VariantsSource} />

</Demo>
<Demo>

### 局部反差主题

当菜单需要和当前页面形成局部反差时可以使用 `theme`，例如在浅色应用壳中放一块深色导航区域。这里的 `theme` 是组件级表面基调，不是用来替代应用全局的 light/dark 主题。

<DemoBlock component={ThemeDemo} source={ThemeSource} />

</Demo>


## 关于 `index` 键值

自定义 `index` 值可以使用任意命名方式（如 `"my-item"`、`"settings.general"`、`"foo"`）。如果省略，会根据位置自动生成数字索引。菜单通过组件树结构追踪父子关系，不依赖键值的命名格式。

## Props

### Menu

| 属性        | 说明                                    | 类型                                                                       | 默认值      |
| --------------- | ---------------------------------------------- | -------------------------------------------------------------------------- | ------------ |
| defaultIndex    | 初始选中的菜单项 key               | string                                                                     | -            |
| selectedKeys    | 受控的选中菜单 key 列表               | string[]                                                                   | -            |
| defaultSelectedKeys | 默认选中的菜单 key 列表          | string[]                                                                   | -            |
| openKeys        | 受控的展开子菜单 key 列表             | string[]                                                                   | -            |
| defaultOpenKeys | 默认展开的子菜单 key 列表             | string[]                                                                   | -            |
| multiple        | 是否允许多选                           | boolean                                                                    | false        |
| theme           | 菜单的局部表面基调，适合在与全局主题不同的区域做反差表现 | enum: `light` &#124; `dark`                         | `light`      |
| mode            | 菜单类型                                   | enum: `horizontal` &#124; `vertical` &#124; `inline`                       | `horizontal` |
| appearance      | 菜单场景，弹出/下拉菜单请使用 `dropdown` | enum: `navigation` &#124; `dropdown`                                      | `navigation` |
| variant         | 内建视觉变体                               | enum: `outline` &#124; `fill` &#124; `ghost`                               | `outline`    |
| selectionStyle  | 选中态呈现方式                              | enum: `border` &#124; `background` &#124; `indicator` &#124; `mixed`      | `mixed`      |
| size            | 菜单项尺寸                                  | enum: `sm` &#124; `md` &#124; `lg`                                         | `md`         |
| density         | 菜单项密度                                  | enum: `compact` &#124; `comfortable`                                       | `comfortable`|
| inlineIndent    | 内联菜单项每层的缩进像素   | number                                                                     | -            |
| onSelect        | 选中菜单项时的回调            | `(selectedIndex: string, info: MenuSelectInfo) => void`                   | -            |
| onOpenChange    | 子菜单展开状态变化时的回调      | (openKeys: string[]) => void                                               | -            |
| style           | 容器的样式对象                      | CSSProperties                                                              | -            |
| className       | 容器的 className                         | string                                                                     | -            |

### Menu.Item

| 属性  | 说明                | 类型                       | 默认值 |
| --------- | -------------------------- | -------------------------- | ------- |
| index     | 菜单项的唯一标识    | string                     | -       |
| disabled  | 是否禁用           | boolean                    | false   |
| danger    | 是否使用危险色语义 | boolean                    | false   |
| icon      | 菜单项图标         | ReactNode                  | -       |
| extra     | 右侧扩展内容       | ReactNode                  | -       |
| onClick   | 点击回调             | (e: MouseEvent) => void    | -       |

### Menu.SubMenu

| 属性  | 说明                      | 类型      | 默认值 |
| --------- | -------------------------------- | --------- | ------- |
| title     | 子菜单标题             | ReactNode | -       |
| index     | 子菜单的唯一标识            | string    | -       |
| disabled  | 是否禁用                 | boolean   | false   |
| danger    | 是否使用危险色语义         | boolean   | false   |
| icon      | 子菜单图标              | ReactNode | -       |
| extra     | 右侧扩展内容              | ReactNode | -       |

### Menu.ItemGroup

| 属性 | 说明             | 类型   | 默认值 |
| -------- | ----------------------- | ------ | ------- |
| title    | 分组标题      | ReactNode | -    |
