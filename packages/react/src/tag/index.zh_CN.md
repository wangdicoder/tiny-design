import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CheckableDemo from './demo/Checkable';
import CheckableSource from './demo/Checkable.tsx?raw';
import ColorDemo from './demo/Color';
import ColorSource from './demo/Color.tsx?raw';
import ControlledDemo from './demo/Controlled';
import ControlledSource from './demo/Controlled.tsx?raw';
import DynamicDemo from './demo/Dynamic';
import DynamicSource from './demo/Dynamic.tsx?raw';
import StatusDemo from './demo/Status';
import StatusSource from './demo/Status.tsx?raw';
import VariantDemo from './demo/Variant';
import VariantSource from './demo/Variant.tsx?raw';

# Tag 标签

用于分类或标记的标签。

## 使用场景

- 可用于按维度或属性进行标记。

- 用于分类时。

## 引入方式

```js
import { Tag } from 'tiny-design';

const { CheckableTag } = Tag;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础用法

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 动态添加和删除

动态添加和删除标签。

<DemoBlock component={DynamicDemo} source={DynamicSource} />

    </Demo>
    <Demo>

### 可选择

`CheckableTag` 类似于 Checkbox，点击可切换选中状态。

> 同时支持受控和非受控模式。

<DemoBlock component={CheckableDemo} source={CheckableSource} />

    </Demo>
    <Demo>

### 状态标签

状态标签使用与按钮组件状态类型一致的语义化颜色。

<DemoBlock component={StatusDemo} source={StatusSource} />

    </Demo>
    <Demo>

### 受控显示

通过 `visible` 属性控制标签的显示与隐藏。

<DemoBlock component={ControlledDemo} source={ControlledSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 多彩标签

我们提供了一系列预设的彩色标签样式，适用于不同场景。你也可以自定义十六进制颜色值。

<DemoBlock component={ColorDemo} source={ColorSource} />

    </Demo>
    <Demo>

### 变体

标签支持四种变体样式：`filled`（默认）、`soft`、`solid` 和 `outlined`。

<DemoBlock component={VariantDemo} source={VariantSource} />

    </Demo>
  </Column>
</Layout>

## API

### Tag

| 属性           | 说明                                           | 类型                                                  | 默认值     |
| -------------- | ---------------------------------------------- | ----------------------------------------------------- | ---------- |
| color          | 标签颜色（预设颜色或自定义十六进制值）         | string                                                | -          |
| variant        | 标签的变体样式                                 | `'filled'` \| `'soft'` \| `'solid'` \| `'outlined'`   | `'filled'` |
| closable       | 标签是否可关闭                                 | boolean                                               | false      |
| defaultVisible | 初始显示状态                                   | boolean                                               | true       |
| visible        | 受控的显示状态                                 | boolean                                               | -          |
| onClose        | 关闭标签时的回调                               | (e: MouseEvent) => void                               | -          |
| onClick        | 点击回调                                       | (e: MouseEvent) => void                               | -          |
| style          | 容器样式对象                                   | CSSProperties                                         | -          |
| className      | 容器的 className                               | string                                                | -          |

预设颜色：`magenta`、`red`、`volcano`、`orange`、`gold`、`lime`、`green`、`cyan`、`blue`、`geekblue`、`purple`。

状态颜色：`success`、`info`、`warning`、`danger`。

### Tag.CheckableTag

| 属性           | 说明                              | 类型                                        | 默认值  |
| -------------- | --------------------------------- | ------------------------------------------- | ------- |
| defaultChecked | 初始选中状态                      | boolean                                     | false   |
| checked        | 受控的选中状态                    | boolean                                     | -       |
| onChange       | 选中状态变化时的回调              | (checked: boolean, e: MouseEvent) => void   | -       |