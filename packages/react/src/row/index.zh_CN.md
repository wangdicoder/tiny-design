import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import GutterDemo from './demo/Gutter';
import GutterSource from './demo/Gutter.tsx?raw';
import OffsetDemo from './demo/Offset';
import OffsetSource from './demo/Offset.tsx?raw';
import OrderDemo from './demo/Order';
import OrderSource from './demo/Order.tsx?raw';
import AlignmentDemo from './demo/Alignment';
import AlignmentSource from './demo/Alignment.tsx?raw';
import ResponsiveDemo from './demo/Responsive';
import ResponsiveSource from './demo/Responsive.tsx?raw';

# Grid System 栅格系统

使用 `Row` 和 `Col` 构建经典的 24 列页面栅格布局，并支持响应式断点。

## 使用方式

```jsx
import { Row, Col } from 'tiny-design';
```

## 使用场景

Grid System 提供基于 Flexbox 的 24 栏栅格系统，与 Bootstrap 和 Ant Design 的心智模型一致。

- **页面级内容分栏** — 将页面拆分为侧边栏（6 栏）和主内容区（18 栏），通过 `gutter` 统一控制间距。
- **表单布局** — 将标签和输入框对齐到一致的列中，保证不同表单区域的视觉统一。
- **营销 / 落地页** — 创建 Hero 区域、功能网格和价格表，列数计算直观可预测。
- **响应式列变化** — 在 `Col` 上使用断点属性（`xs` 到 `xxl`），实现移动端堆叠、桌面端展开。
- **列偏移与重排** — 使用 `offset` 创建留白，使用 `order` 在不改变 DOM 顺序的情况下调整视觉排列。

### 布局组件选择指南

| 场景 | 推荐组件 |
|---|---|
| 工具栏、按钮组、内联标签 | **Flex** |
| 页面分栏、表单栅格、营销页 | **Grid System**（Row / Col） |
| Dashboard 壳层、卡片墙、命名区域、跨行布局 | **Grid** |

## 代码示例

<Demo>

### 基本栅格

使用 `Row` 和 `Col` 创建基础 24 列布局。

<DemoBlock component={BasicDemo} source={BasicSource} />

</Demo>
<Demo>

### 间距

使用 `Row.gutter` 控制列之间的横向和纵向间距。

<DemoBlock component={GutterDemo} source={GutterSource} />

</Demo>
<Demo>

### 偏移

使用 `offset` 将列向右偏移。

<DemoBlock component={OffsetDemo} source={OffsetSource} />

</Demo>
<Demo>

### 排序

使用 `order` 调整列的视觉顺序。

<DemoBlock component={OrderDemo} source={OrderSource} />

</Demo>
<Demo>

### 对齐

使用 `Row` 的 `align` 和 `justify` 控制交叉轴与主轴对齐。

<DemoBlock component={AlignmentDemo} source={AlignmentSource} />

</Demo>
<Demo>

### 响应式

使用 `xs`、`sm`、`md`、`lg`、`xl`、`xxl` 定义响应式 span 和 offset。

<DemoBlock component={ResponsiveDemo} source={ResponsiveSource} />

</Demo>

## Props

### Row

| 属性       | 说明                     | 类型                                                                                  | 默认值 |
| ---------- | ------------------------ | ------------------------------------------------------------------------------------- | ------ |
| gutter     | 列之间的间距             | number \| [number, number]                                                           | 0      |
| gutterSide | 是否包含首尾两侧间距     | boolean                                                                               | false  |
| align      | 垂直对齐方式             | `top` \| `center` \| `bottom` \| `baseline`                                          | -      |
| justify    | 水平排列方式             | `start` \| `end` \| `center` \| `space-around` \| `space-between` \| `space-evenly` | -      |
| style      | 容器样式                 | CSSProperties                                                                         | -      |
| className  | 容器 className           | string                                                                                | -      |

### Col

| 属性      | 说明                         | 类型                              | 默认值 |
| --------- | ---------------------------- | --------------------------------- | ------ |
| span      | 占据的栅格数，总计 24 格     | number                            | -      |
| offset    | 左侧偏移的栅格数             | number                            | 0      |
| order     | 视觉顺序                     | number                            | 0      |
| xs        | 小于 480px 的配置            | number \| `{ span, offset, order }` | -      |
| sm        | 大于等于 600px 的配置        | number \| `{ span, offset, order }` | -      |
| md        | 大于等于 840px 的配置        | number \| `{ span, offset, order }` | -      |
| lg        | 大于等于 960px 的配置        | number \| `{ span, offset, order }` | -      |
| xl        | 大于等于 1280px 的配置       | number \| `{ span, offset, order }` | -      |
| xxl       | 大于等于 1440px 的配置       | number \| `{ span, offset, order }` | -      |
| style     | 容器样式                     | CSSProperties                     | -      |
| className | 容器 className               | string                            | -      |
