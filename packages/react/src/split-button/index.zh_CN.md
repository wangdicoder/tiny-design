import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';

# Split Button

带有下拉菜单的按钮。

## 使用场景

用户可以选择绑定到主按钮的默认值，
或从绑定到副按钮的下拉列表中选择互斥的值。

## 使用方式

```jsx
import { SplitButton } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

简单的使用方式。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 禁用状态

禁用该按钮。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 位置

设置下拉菜单的弹出位置。默认位置是 `bottom-end`。

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性              | 说明                           | 类型                                                                                | 默认值    |
| ----------------- | -------------------------------------- | ----------------------------------------------------------------------------------- | --------- |
| onClick           | 主按钮的点击处理函数           | (e: MouseEvent) => void                                                             | -         |
| loading           | 加载状态                       | boolean                                                                             | false     |
| disabled          | 是否禁用                       | boolean                                                                             | false     |
| size              | 按钮尺寸                       | enum: `sm` &#124; `md` &#124; `lg`                                                 | `md`      |
| btnType           | 按钮类型                       | enum: `default` &#124; `primary` &#124; `outline` &#124; `ghost` &#124; `link` &#124; `info` &#124; `success` &#124; `warning` &#124; `danger` | `default` |
| overlay           | 下拉菜单元素                   | React.ReactElement&lt;MenuProps&gt;                                                 | -         |
| dropdownTrigger   | 下拉菜单触发方式               | enum: `hover` &#124; `click`                                                       | `hover`   |
| dropdownPlacement | 下拉菜单弹出位置               | enum: `bottom-start` &#124; `bottom` &#124; `bottom-end`                           | `bottom-end` |
| style             | 容器的样式对象                 | CSSProperties                                                                       | -         |
| className         | 容器的类名                     | string                                                                              | -         |
