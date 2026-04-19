import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DualDemo from './demo/Dual';
import DualSource from './demo/Dual.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import DotsDemo from './demo/Dots';
import DotsSource from './demo/Dots.tsx?raw';
import MarkerDemo from './demo/Marker';
import MarkerSource from './demo/Marker.tsx?raw';
import CustomisedTooltipDemo from './demo/CustomisedTooltip';
import CustomisedTooltipSource from './demo/CustomisedTooltip.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import TooltipVisibleDemo from './demo/TooltipVisible';
import TooltipVisibleSource from './demo/TooltipVisible.tsx?raw';
import TrackDemo from './demo/Track';
import TrackSource from './demo/Track.tsx?raw';

# Slider 滑块

在固定范围内拖动滑块。

## 使用场景

在一个范围内输入数值时使用。

## 使用方式

```jsx
import { Slider } from '@tiny-design/react';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

一个基本的例子。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 双滑块

传入一个数字数组来显示双滑块。

<DemoBlock component={DualDemo} source={DualSource} />

    </Demo>
    <Demo>

### 点状

在滑块上显示点。

<DemoBlock component={DotsDemo} source={DotsSource} />

    </Demo>
    <Demo>

### 标记

在滑块上显示标记。

<DemoBlock component={MarkerDemo} source={MarkerSource} />

    </Demo>
    <Demo>

### 禁用滑块

禁用滑块。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 垂直模式

使用 `direction` 创建垂直滑块。

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### 自定义提示

使用 `tipFormatter` 来格式化 `Tooltip` 的内容。

<DemoBlock component={CustomisedTooltipDemo} source={CustomisedTooltipSource} />

    </Demo>
    <Demo>

### 控制 ToolTip 的显示

当 `tooltipVisible` 为 true 时，即使拖动或悬停也会始终显示 ToolTip。

<DemoBlock component={TooltipVisibleDemo} source={TooltipVisibleSource} />

    </Demo>
    <Demo>

### 不显示轨道

设置 `track={false}` 隐藏轨道。

<DemoBlock component={TrackDemo} source={TrackSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性              | 说明                                                                                          | 类型                                  | 默认值        |
| ----------------- | --------------------------------------------------------------------------------------------- | ------------------------------------- | ------------- |
| value             | 滑块的值                                                                                      | number &#124; [number, number]        |               |
| defaultValue      | 滑块的默认值                                                                                  | number &#124; [number, number]        |               |
| min               | 滑块可滑动到的最小值                                                                          | number                                | 0             |
| max               | 滑块可滑动到的最大值                                                                          | number                                | 100           |
| marks             | 滑块的刻度标记                                                                                | \{ number: ReactNode \} &#124; \{ number: \{ style: CSSProperty, label: ReactNode \} \}   |     |
| dots              | 是否在轨道上显示圆点                                                                          | boolean                               | false         |
| direction         | 滑块方向                                                                                      | enum: `horizontal` &#124; `verical`   | `horizontal`  |
| step              | 滑块步进的粒度                                                                                | number                                | 1             |
| disabled          | 设为 true 时滑块将不可交互                                                                    | boolean                               | false         |
| track             | 是否显示轨道                                                                                  | boolean                               | false         |
| tooltipVisible    | 设为 true 时始终显示 Tooltip，设为 false 时始终不显示，即使拖动或悬停时也不显示                | boolean                               |               |
| tooltipPlacement  | 设置 Tooltip 显示位置                                                                         | `Placement`                           | `top`         |
| tipFormatter      | Tooltip 中显示值的格式化函数                                                                  | (value) => ReactNode                  |               |
| onChange          | 用户改变滑块值时触发的回调函数                                                                | (value) => void                       |               |
| onAfterChange     | `onmouseup` 触发时的回调                                                                      | (value) => void                       |               |
| style	            | 容器的样式对象                                                                                | CSSProperties                         |               |
| className	        | 容器的类名                                                                                    | string                                |               |