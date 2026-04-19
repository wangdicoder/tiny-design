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
import { Dropdown } from '@tiny-design/react';
```

## 推荐模式

`Dropdown` 负责触发、弹层定位和显隐控制，`Menu` 负责菜单结构。

当 `overlay` 传入 `Menu` 时，Dropdown 会将其规范为下拉菜单场景：

- `mode` 会被规范为 `vertical`
- `appearance` 会被规范为 `dropdown`
- 不展示选中态视觉，菜单项仅保留 hover 反馈

这样可以保证下拉菜单的视觉稳定，不会把导航型 `Menu` 的变体直接带进 popup。如果你的目标是页面导航，请直接使用 `Menu appearance="navigation"`，而不是用 `Dropdown` 包裹。

`Dropdown` 复用了 `Menu` 的结构和子菜单行为，但保留了自己独立的弹层样式。调整 dropdown 专属主题变量时，不会再影响 `Menu` 的导航态或 popup 默认样式。

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

| 属性            | 说明                                                                                | 类型                                                                                                  | 默认值         |
| --------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------- |
| disabled        | 是否禁用下拉菜单                                                                    | boolean                                                                                               | false          |
| trigger         | 触发方式                                                                            | enum: `click` &#124; `hover`                                                                          | `hover`        |
| placement       | 弹出菜单的位置                                                                      | enum: `top-start` &#124; `top` &#124; `end` &#124; `bottom-start` &#124; `bottom` &#124; `bottom-end` | `bottom-start` |
| overlay         | 弹层内容。推荐传入 [Menu](../components/menu)；传入后会自动规范为 dropdown 菜单场景 | [Menu](../components/menu) \| ReactNode                                                               | -              |
| visible         | 下拉菜单是否可见                                                                    | boolean                                                                                               | -              |
| arrow           | 是否显示下拉箭头                                                                    | boolean                                                                                               | false          |
| onVisibleChange | 可见状态变化时的回调                                                                | (visible: boolean) => void                                                                            | -              |
