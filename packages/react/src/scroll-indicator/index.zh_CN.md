import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import TargetDemo from './demo/Target';
import TargetSource from './demo/Target.tsx?raw';

# Scroll Indicator

用于显示页面滚动进度的"进度条"。

## 使用场景

当内容过长时使用。

## 引入方式

```jsx
import { ScrollIndicator } from 'tiny-design';
```

## 代码示例

<Demo>

### 基本用法

一个基础示例。

<DemoBlock component={BasicDemo} source={BasicSource} />

</Demo>
<Demo>

### 容器滚动

设置 target 属性，监听目标元素的滚动事件（默认为 `window`）。

<DemoBlock component={TargetDemo} source={TargetSource} />

</Demo>

## API

| 属性      | 说明                                          | 类型              | 默认值        |
| --------- | --------------------------------------------- | ----------------- | ------------- |
| fixed     | 是否固定在窗口顶部                            | boolean           | true          |
| target    | 指定可滚动区域的 DOM 节点                     | () => HTMLElement | () => window  |
| style	    | 容器的样式对象                                | CSSProperties     | -             |
| className	| 容器的类名                                    | string            | -             |
