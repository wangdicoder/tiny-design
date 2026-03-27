import HorizontalDemo from './demo/Horizontal';
import HorizontalSource from './demo/Horizontal.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import InlineDemo from './demo/Inline';
import InlineSource from './demo/Inline.tsx?raw';

# Menu 菜单

一个多功能的导航组件，支持下拉菜单。

## 使用场景

一个可访问的下拉菜单组件，适用于常见的下拉菜单按钮设计模式。Menu 使用 roving tabIndex 进行焦点管理。

## 引入方式

```jsx
import { Menu } from 'tiny-design';

const { Item, SubMenu, ItemGroup, Divider } = Menu;
```

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


## API

### Menu

| 属性        | 说明                                    | 类型                                                                       | 默认值      |
| --------------- | ---------------------------------------------- | -------------------------------------------------------------------------- | ------------ |
| defaultIndex    | 初始选中的菜单项 key               | string                                                                     | -            |
| theme           | 菜单的颜色主题                        | enum: `light` &#124; `dark`                                                | `light`      |
| mode            | 菜单类型                                   | enum: `horizontal` &#124; `vertical` &#124; `inline`                       | `horizontal` |
| inlineIndent    | 内联菜单项每层的缩进像素   | number                                                                     | -            |
| onSelect        | 选中菜单项时的回调            | (selectedIndex: string) => void                                            | -            |
| style           | 容器的样式对象                      | CSSProperties                                                              | -            |
| className       | 容器的 className                         | string                                                                     | -            |

### Menu.Item

| 属性  | 说明                | 类型                       | 默认值 |
| --------- | -------------------------- | -------------------------- | ------- |
| index     | 菜单项的唯一标识    | string                     | -       |
| disabled  | 是否禁用           | boolean                    | false   |
| onClick   | 点击回调             | (e: MouseEvent) => void    | -       |

### Menu.SubMenu

| 属性  | 说明                      | 类型      | 默认值 |
| --------- | -------------------------------- | --------- | ------- |
| title     | 子菜单标题             | ReactNode | -       |
| index     | 子菜单的唯一标识            | string    | -       |
| disabled  | 是否禁用                 | boolean   | false   |
| icon      | 子菜单图标              | ReactNode | -       |

### Menu.ItemGroup

| 属性 | 说明             | 类型   | 默认值 |
| -------- | ----------------------- | ------ | ------- |
| title    | 分组标题      | string | -       |
