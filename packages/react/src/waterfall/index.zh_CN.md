import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ResponsiveDemo from './demo/Responsive';
import ResponsiveSource from './demo/Responsive.tsx?raw';
import ImageDemo from './demo/Image';
import ImageSource from './demo/Image.tsx?raw';
import DynamicDemo from './demo/Dynamic';
import DynamicSource from './demo/Dynamic.tsx?raw';

# Waterfall 瀑布流

瀑布流布局组件，用于展示高度不等的内容，将元素均匀分配到多列中。

## 使用场景

当需要以多列布局展示高度不等的图片或卡片时使用，元素会自动填充到最短的列中。

## 用法

```jsx
import { Waterfall } from '@tiny-design/react';
```

## 示例

<Layout>
  <Column>
    <Demo>

### 基础用法

基础瀑布流布局，4 列展示不同高度的卡片。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 图片画廊

瀑布流布局非常适合展示不同宽高比的图片画廊。

<DemoBlock component={ImageDemo} source={ImageSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 响应式列数

通过滑块交互式调整列数。

<DemoBlock component={ResponsiveDemo} source={ResponsiveSource} />

    </Demo>
    <Demo>

### 动态增删

动态添加和删除元素。

<DemoBlock component={DynamicDemo} source={DynamicSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Waterfall

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列数，或响应式断点配置 | `number` &#124; `{ xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number }` | `3` |
| gutter | 元素间距 | `number` &#124; `[number, number]` | `0` |
| items | 渲染的数据项数组 | `WaterfallItem[]` | - |
| itemRender | 自定义渲染函数 | `(item: WaterfallItem & { index: number; column: number }) => ReactNode` | - |
| onLayoutChange | 布局变化时的回调 | `(sortInfo: { key: Key; column: number }[]) => void` | - |

### WaterfallItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识 | `React.Key` | - |
| column | 固定到指定列 | `number` | - |
| children | 直接内容（优先于 itemRender） | `ReactNode` | - |
| data | 传递给 itemRender 的自定义数据 | `any` | - |
