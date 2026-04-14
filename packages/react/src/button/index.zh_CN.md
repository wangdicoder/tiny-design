import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';
import MoreTypesDemo from './demo/MoreTypes';
import MoreTypesSource from './demo/MoreTypes.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import IconPositionDemo from './demo/IconPosition';
import IconPositionSource from './demo/IconPosition.tsx?raw';
import LoadingDemo from './demo/Loading';
import LoadingSource from './demo/Loading.tsx?raw';
import LoadingIconDemo from './demo/LoadingIcon';
import LoadingIconSource from './demo/LoadingIcon.tsx?raw';
import BlockDemo from './demo/Block';
import BlockSource from './demo/Block.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import GroupDemo from './demo/Group';
import GroupSource from './demo/Group.tsx?raw';
import ShapeDemo from './demo/Shape';
import ShapeSource from './demo/Shape.tsx?raw';
import GroupInheritanceDemo from './demo/GroupInheritance';
import GroupInheritanceSource from './demo/GroupInheritance.tsx?raw';

# Button 按钮

用于触发一个操作。

## 使用场景

按钮表示一个操作（或一系列操作）。点击按钮将触发对应的业务逻辑。

## 使用方式

```jsx
import { Button } from '@tiny-design/react';

const { Group } = Button;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 变体

通过 `variant` 和 `color` 组合描述按钮的外观。

> `variant="link"` 只改变样式，它仍然是一个 `<button>` 标签。如果需要表示带有 `href` 属性的超链接，建议使用 `<Link />` 组件。

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
    <Demo>

### 语义颜色

不同的颜色代表不同的含义。

<DemoBlock component={MoreTypesDemo} source={MoreTypesSource} />

    </Demo>
    <Demo>

### 尺寸

有三种不同的尺寸：`lg`、`md`、`sm`。默认尺寸为 `md`。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### 按钮组

通过将多个 `Button` 组件放入 `Button.Group` 中来对按钮进行分组。

<DemoBlock component={GroupDemo} source={GroupSource} />

    </Demo>
    <Demo>

### 加载按钮

点击按钮加载数据后，按钮会显示加载状态。

<DemoBlock component={LoadingDemo} source={LoadingSource} />

    </Demo>

  </Column>
  <Column>
    <Demo>

### 图标按钮

使用图标为按钮添加更多含义。可以单独使用图标以节省空间，也可以与文本一起使用。

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
    <Demo>

### 图标位置

通过 `iconPosition="end"` 可以将图标渲染在文本后面。

<DemoBlock component={IconPositionDemo} source={IconPositionSource} />

    </Demo>
    <Demo>

### 禁用状态

添加 `disabled` 属性来禁用按钮。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### 块级按钮

block 属性会使按钮宽度适应其父元素宽度。

<DemoBlock component={BlockDemo} source={BlockSource} />

    </Demo>
    <Demo>

### 按钮形状

通过 `shape` 切换 `default`、`round` 和 `circle` 三种形状。

<DemoBlock component={ShapeDemo} source={ShapeSource} />

    </Demo>
    <Demo>

### 自定义加载图标

通过 `loadingIcon` 替换默认的加载指示器。

<DemoBlock component={LoadingIconDemo} source={LoadingIconSource} />

    </Demo>
    <Demo>

### 按钮组继承策略

`Button.Group` 默认只填充子按钮未显式传入的属性。使用 `inheritMode="override"` 可以强制覆盖子项。

<DemoBlock component={GroupInheritanceDemo} source={GroupInheritanceSource} />

    </Demo>

  </Column>
</Layout>

## Props

| 属性         | 说明                       | 类型                                                                                             | 默认值    |
| ------------ | -------------------------- | ------------------------------------------------------------------------------------------------ | --------- |
| variant      | 视觉变体                   | enum: `solid` &#124; `outline` &#124; `ghost` &#124; `link`                                      | `solid`   |
| color        | 语义颜色                   | enum: `default` &#124; `primary` &#124; `info` &#124; `success` &#124; `warning` &#124; `danger` | `default` |
| loading      | 设置按钮的加载状态         | boolean                                                                                          | false     |
| loadingIcon  | 自定义加载图标             | React.ReactNode                                                                                  | -         |
| block        | 使按钮宽度适应其父元素宽度 | boolean                                                                                          | false     |
| size         | 按钮尺寸                   | enum: `sm` &#124; `md` &#124; `lg`                                                               | `md`      |
| disabled     | 按钮的禁用状态             | boolean                                                                                          | false     |
| shape        | 按钮形状                   | enum: `default` &#124; `round` &#124; `circle`                                                   | `default` |
| round        | 圆角按钮，兼容旧用法       | boolean                                                                                          | false     |
| icon         | 在按钮中渲染一个图标       | React.ReactNode                                                                                  | -         |
| iconPosition | 图标位置                   | enum: `start` &#124; `end`                                                                       | `start`   |
| style        | 容器的样式对象             | CSSProperties                                                                                    | -         |
| className    | 容器的 className           | string                                                                                           | -         |

纯图标按钮需要提供 `aria-label`、`aria-labelledby` 或 `title` 作为可访问名称。

## Button.Group Props

| 属性        | 说明                   | 类型                                                                                             | 默认值    |
| ----------- | ---------------------- | ------------------------------------------------------------------------------------------------ | --------- |
| variant     | 按钮组变体             | enum: `solid` &#124; `outline` &#124; `ghost` &#124; `link`                                      | `solid`   |
| color       | 按钮组颜色             | enum: `default` &#124; `primary` &#124; `info` &#124; `success` &#124; `warning` &#124; `danger` | `default` |
| size        | 按钮组尺寸             | enum: `sm` &#124; `md` &#124; `lg`                                                               | `md`      |
| shape       | 按钮组形状             | enum: `default` &#124; `round` &#124; `circle`                                                   | `default` |
| round       | 圆角按钮组，兼容旧用法 | boolean                                                                                          | false     |
| disabled    | 应用于子按钮的禁用状态 | boolean                                                                                          | false     |
| inheritMode | 子按钮属性继承策略     | enum: `fill` &#124; `override` &#124; `none`                                                     | `fill`    |
