import ExplicitColumnsDemo from './demo/ExplicitColumns';
import ExplicitColumnsSource from './demo/ExplicitColumns.tsx?raw';
import AutoFitDemo from './demo/AutoFit';
import AutoFitSource from './demo/AutoFit.tsx?raw';
import AlignmentGridDemo from './demo/AlignmentGrid';
import AlignmentGridSource from './demo/AlignmentGrid.tsx?raw';
import ResponsiveLayoutDemo from './demo/ResponsiveLayout';
import ResponsiveLayoutSource from './demo/ResponsiveLayout.tsx?raw';
import NamedAreasDemo from './demo/NamedAreas';
import NamedAreasSource from './demo/NamedAreas.tsx?raw';
import OffsetAutoDemo from './demo/OffsetAuto';
import OffsetAutoSource from './demo/OffsetAuto.tsx?raw';
import DashboardShellDemo from './demo/DashboardShell';
import DashboardShellSource from './demo/DashboardShell.tsx?raw';

# Grid 栅格

使用 CSS Grid 语义构建现代二维布局。

## 使用方式

```jsx
import { Grid } from 'tiny-design';
```

## 适用场景

- `Grid System`（`Row` / `Col`）更适合经典页面分栏、营销页和 24 栅格结构。
- `Grid` 更适合 dashboard 壳层、编辑器工作台、卡片墙、命名区域、跨行布局和二维组合。
- 如果你是从 MUI `Grid` 迁移过来，可以先使用 `spacing`、`rowSpacing`、`columnSpacing`、`size`、`offset`，再逐步使用 `areas` 和 `rowSpan` 这些更强的 CSS Grid 能力。

## 代码示例

<Demo>

### 显式列定义

使用 `columns` 直接定义网格轨道。

<DemoBlock component={ExplicitColumnsDemo} source={ExplicitColumnsSource} />

</Demo>
<Demo>

### 自动适配列

使用 `minColumnWidth` 创建无需手动断点的自适应卡片布局。

<DemoBlock component={AutoFitDemo} source={AutoFitSource} />

</Demo>
<Demo>

### 子项对齐

使用 `justify` 和 `align` 控制单元格内部内容的对齐方式。

<DemoBlock component={AlignmentGridDemo} source={AlignmentGridSource} />

</Demo>
<Demo>

### 响应式布局

像 MUI Grid 一样使用断点驱动的 `columns`、`gap` 和 `Grid.Item size`。

<DemoBlock component={ResponsiveLayoutDemo} source={ResponsiveLayoutSource} />

</Demo>
<Demo>

### 命名区域

使用 `areas` 和 `Grid.Item area` 构建 dashboard 壳层，这也是 CSS Grid 相比 MUI Flex Grid 更强的地方。

<DemoBlock component={NamedAreasDemo} source={NamedAreasSource} />

</Demo>
<Demo>

### 自动偏移

使用 `offset="auto"` 将子项推到最右侧，和 MUI Grid 的用法一致。

<DemoBlock component={OffsetAutoDemo} source={OffsetAutoSource} />

</Demo>
<Demo>

### Dashboard 壳层

使用 `areas` 配合嵌套 `Grid` 构建真实应用壳层，而不是简单的堆叠示例。

<DemoBlock component={DashboardShellDemo} source={DashboardShellSource} />

</Demo>

## Props

| 属性           | 说明                                   | 类型                                              | 默认值 |
| -------------- | -------------------------------------- | ------------------------------------------------- | ------ |
| columns        | 网格列模板，或平均列数                 | 响应式 `number \| CSSProperties['gridTemplateColumns']` | - |
| rows           | 网格行模板                             | 响应式 `CSSProperties['gridTemplateRows']`        | -      |
| spacing        | `gap` 的 MUI 风格别名                  | 响应式 ``sm` \| `md` \| `lg` \| CSSProperties['gap']`` | - |
| gap            | 行列统一间距                           | 响应式 ``sm` \| `md` \| `lg` \| CSSProperties['gap']`` | - |
| columnSpacing  | `columnGap` 的 MUI 风格别名            | 响应式 ``sm` \| `md` \| `lg` \| CSSProperties['columnGap']`` | - |
| columnGap      | 列间距                                 | 响应式 ``sm` \| `md` \| `lg` \| CSSProperties['columnGap']`` | - |
| rowSpacing     | `rowGap` 的 MUI 风格别名               | 响应式 ``sm` \| `md` \| `lg` \| CSSProperties['rowGap']`` | - |
| rowGap         | 行间距                                 | 响应式 ``sm` \| `md` \| `lg` \| CSSProperties['rowGap']`` | - |
| minColumnWidth | 自动列布局时的最小列宽                 | 响应式 `number \| string`                         | -      |
| autoFlow       | CSS grid auto-flow                     | 响应式 `CSSProperties['gridAutoFlow']`            | -      |
| autoFit        | 自动列布局时使用 `auto-fit`            | boolean                                           | true   |
| justify        | 单元格内横向对齐                       | 响应式 `CSSProperties['justifyItems']`            | -      |
| align          | 单元格内纵向对齐                       | 响应式 `CSSProperties['alignItems']`              | -      |
| justifyContent | 整个网格在容器内的横向分布             | 响应式 `CSSProperties['justifyContent']`          | -      |
| alignContent   | 整个网格在容器内的纵向分布             | 响应式 `CSSProperties['alignContent']`            | -      |
| placeItems     | `alignItems` 和 `justifyItems` 简写     | 响应式 `CSSProperties['placeItems']`              | -      |
| placeContent   | `alignContent` 和 `justifyContent` 简写 | 响应式 `CSSProperties['placeContent']`            | -      |
| areas          | 命名区域模板                           | 响应式 `string \| string[]`                       | -      |
| component      | 根节点渲染元素                         | React.ElementType                                 | `div`  |
| style          | 容器样式                               | CSSProperties                                     | -      |
| className      | 容器 className                         | string                                            | -      |

## Grid.Item Props

| 属性        | 说明                         | 类型                                              | 默认值 |
| ----------- | ---------------------------- | ------------------------------------------------- | ------ |
| size        | 子项列跨度                   | 响应式 `number \| 'auto' \| 'grow' \| 'full'`     | -      |
| offset      | 将子项向右偏移               | 响应式 `number \| 'auto'`                         | -      |
| column      | 原始 `grid-column` 值        | 响应式 `CSSProperties['gridColumn']`              | -      |
| row         | 原始 `grid-row` 值           | 响应式 `CSSProperties['gridRow']`                 | -      |
| colSpan     | 显式列跨度                   | 响应式 `number \| 'full'`                         | -      |
| rowSpan     | 显式行跨度                   | 响应式 `number \| 'full'`                         | -      |
| area        | 命名区域                     | 响应式 `CSSProperties['gridArea']`                | -      |
| justifySelf | 子项在单元格内的横向对齐     | 响应式 `CSSProperties['justifySelf']`             | -      |
| alignSelf   | 子项在单元格内的纵向对齐     | 响应式 `CSSProperties['alignSelf']`               | -      |
| component   | 子项渲染元素                 | React.ElementType                                 | `div`  |
