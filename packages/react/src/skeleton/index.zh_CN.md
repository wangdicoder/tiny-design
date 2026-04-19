import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ActiveDemo from './demo/Active';
import ActiveSource from './demo/Active.tsx?raw';
import CombinationDemo from './demo/Combination';
import CombinationSource from './demo/Combination.tsx?raw';

# Skeleton 骨架屏

在内容加载过程中提供占位图形。

## 使用场景

- 当资源需要较长时间加载时。
- 当组件包含大量信息时，如列表或卡片。
- 仅在首次加载数据时使用。

## 使用方式

```jsx
import { Skeleton } from '@tiny-design/react';
```

## 代码示例

<Demo>

### 基础用法

最简单的骨架屏用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

</Demo>
<Demo>

### 动画效果

设置 `active={true}` 开启微光动画效果。

<DemoBlock component={ActiveDemo} source={ActiveSource} />

</Demo>
<Demo>

### 组合使用

一个复杂示例。

> 可以使用 `<ConfigProvider/>` 一次性设置 `shimmer` 属性。

<DemoBlock component={CombinationDemo} source={CombinationSource} />

</Demo>

## Props

| 属性              | 说明                                      | 类型                          | 默认值    |
| ----------------- | ----------------------------------------- | ----------------------------- | --------- |
| active            | 是否开启微光动画效果                      | boolean                       | false     |
| rounded           | 是否显示为圆形骨架屏                      | boolean                       | false     |