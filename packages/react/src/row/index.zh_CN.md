import BasicDemo from '../grid/demo/Basic';
import BasicSource from '../grid/demo/Basic.tsx?raw';
import GutterDemo from '../grid/demo/Gutter';
import GutterSource from '../grid/demo/Gutter.tsx?raw';
import OffsetDemo from '../grid/demo/Offset';
import OffsetSource from '../grid/demo/Offset.tsx?raw';
import OrderDemo from '../grid/demo/Order';
import OrderSource from '../grid/demo/Order.tsx?raw';
import AlignmentDemo from '../grid/demo/Alignment';
import AlignmentSource from '../grid/demo/Alignment.tsx?raw';
import ResponsiveDemo from '../grid/demo/Responsive';
import ResponsiveSource from '../grid/demo/Responsive.tsx?raw';

# Grid System 栅格系统

使用 `Row` 和 `Col` 构建经典的 24 列页面栅格布局，并支持响应式断点。

## 使用方式

```jsx
import { Row, Col } from 'tiny-design';
```

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
