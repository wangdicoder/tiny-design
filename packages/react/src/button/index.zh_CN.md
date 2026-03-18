import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';
import MoreTypesDemo from './demo/MoreTypes';
import MoreTypesSource from './demo/MoreTypes.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import LoadingDemo from './demo/Loading';
import LoadingSource from './demo/Loading.tsx?raw';
import BlockDemo from './demo/Block';
import BlockSource from './demo/Block.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import GroupDemo from './demo/Group';
import GroupSource from './demo/Group.tsx?raw';

# Button

用于触发一个操作。

## 使用场景

按钮表示一个操作（或一系列操作）。点击按钮将触发对应的业务逻辑。

## 引入方式

```jsx
import { Button } from 'tiny-design';

const { Group } = Button;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 类型

按钮有 `default`、`primary`、`outline`、`ghost` 和 `link` 五种类型。

> link 类型按钮仅改变样式，它仍然是一个 `<button>` 标签。如果需要表示带有 `href` 属性的超链接，建议使用 `<Link />` 组件。

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
    <Demo>

### 更多类型

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

### 禁用状态

添加 `disabled` 属性来禁用按钮。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### 块级按钮

block 属性会使按钮宽度适应其父元素宽度。

<DemoBlock component={BlockDemo} source={BlockSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性  | 说明                               | 类型                                  | 默认值   |
| --------- | ----------------------------------------- | ------------------------------------- | --------- |
| btnType   | 按钮类型                               | enum: `default` &#124; `primary` &#124; `outline` &#124; `ghost` &#124; `link` &#124; `info` &#124; `successs` &#124; `warning` &#124; `danger` | `default`    |
| loading   | 设置按钮的加载状态          | boolean                               | false     |
| block     | 使按钮宽度适应其父元素宽度      | boolean                               | false     |
| size      | 按钮尺寸                               | enum: `sm` &#124; `md` &#124; `lg`    | `md`      |
| disabled  | 按钮的禁用状态                  | boolean                               | false     |
| round     | 圆角按钮                            | boolean                               | false     |
| icon      | 在文本左侧渲染一个图标    | React.ReactNode                       | -         |
| style	    | 容器的样式对象          | CSSProperties                         | -         |
| className	| 容器的 className                    | string                                | -         |