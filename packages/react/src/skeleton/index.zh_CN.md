import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ActiveDemo from './demo/Active';
import ActiveSource from './demo/Active.tsx?raw';
import CombinationDemo from './demo/Combination';
import CombinationSource from './demo/Combination.tsx?raw';
import LoadingDemo from './demo/Loading';
import LoadingSource from './demo/Loading.tsx?raw';
import ComposedDemo from './demo/Composed';
import ComposedSource from './demo/Composed.tsx?raw';

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

<Layout>
  <Column>
    <Demo>

### 基础用法

最简单的骨架屏用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 动画参数

切换 `shimmer` 和 `pulse`，对比两种动画效果。

<DemoBlock component={ActiveDemo} source={ActiveSource} />

    </Demo>
    <Demo>

### 结构化骨架

一个结构化的加载占位示例。

> 可以使用 `<ConfigProvider skeleton={{ animation: 'shimmer' }} />` 一次性设置骨架屏动画。

<DemoBlock component={CombinationDemo} source={CombinationSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 加载态切换

通过 `loading` 在骨架屏和真实内容之间切换。

<DemoBlock component={LoadingDemo} source={LoadingSource} />

    </Demo>
    <Demo>

### 组合式搭建

使用 `Skeleton.Block`、`Skeleton.Text`、`Skeleton.Avatar` 自定义更复杂的加载结构。

<DemoBlock component={ComposedDemo} source={ComposedSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性              | 说明                                      | 类型                                | 默认值    |
| ----------------- | ----------------------------------------- | ----------------------------------- | --------- |
| loading           | 是否显示骨架屏；为 `false` 时渲染 `children` | boolean                           | true      |
| shape             | 基础骨架形状                              | `rect` \| `round` \| `circle`       | `round`   |
| width             | 基础骨架宽度                              | string \| number                    | -         |
| height            | 基础骨架高度                              | string \| number                    | -         |
| animation         | 动画效果                                  | boolean \| `pulse` \| `shimmer`     | -         |
| avatar            | 是否显示头像骨架，或传入头像配置          | boolean \| object                   | false     |
| title             | 是否显示标题骨架，或传入标题配置          | boolean \| object                   | false     |
| paragraph         | 是否显示段落骨架，或传入段落配置          | boolean \| object                   | false     |

## 子组件

- `Skeleton.Block`: 低层占位块，可单独控制 `shape`、`width`、`height`、`animation`
- `Skeleton.Text`: 文本行骨架，支持 `rows` 和 `widths`
- `Skeleton.Avatar`: 头像骨架，支持 `shape` 和 `size`
