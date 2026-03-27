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

# Dropdown 下拉菜单

下拉列表是一种图形控件元素，类似于列表框。

## 使用场景

当有多个选项可供选择时，可以将它们封装在 `Dropdown` 中。通过悬停或点击触发器，会出现一个下拉菜单，允许你选择一个选项并执行相关操作。

## 使用方式

```jsx
import { Dropdown } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

最简单的下拉菜单。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 其他元素

可以使用其他元素作为触发器。

<DemoBlock component={OtherDemo} source={OtherSource} />

    </Demo>
    <Demo>

### 级联菜单

级联菜单。

<DemoBlock component={CascadeDemo} source={CascadeSource} />

    </Demo>
    <Demo>

### 箭头

显示箭头。

<DemoBlock component={ArrowDemo} source={ArrowSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 位置

弹出菜单位置。

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
    <Demo>

### 触发方式

点击触发。

<DemoBlock component={TriggerDemo} source={TriggerSource} />

    </Demo>
    <Demo>

### 关闭

点击后关闭菜单。

<DemoBlock component={CloseDemo} source={CloseSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性          | 说明                           | 类型                          | 默认值   |
| ----------------- | ------------------------------------- | ----------------------------- | --------- |
| disabled          | 是否禁用下拉菜单 | boolean                       | false     |
| trigger           | 触发方式                          | enum: `click` &#124; `hover`  | `hover`   |
| placement         | 弹出菜单的位置               | enum: `top-start` &#124; `top` &#124; `end` &#124; `bottom-start` &#124; `bottom` &#124; `bottom-end` | `bottom-start`    |
| overlay           | 下拉菜单                         | [Menu](../components/menu)      | -         |
| visible           | 下拉菜单是否可见  | boolean                       | -         |
| arrow             | 是否显示下拉箭头            | boolean                       | false     |
| onVisibleChange   | 可见状态变化时的回调        | (visible: boolean) => void    | -         |