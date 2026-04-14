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

Grid 是一个基于 CSS Grid 的二维布局组件，适合同时控制行**和**列的场景。

- **Dashboard 壳层** — 使用 `areas` 定义命名区域，如 `"sidebar header" "sidebar main"`，构建应用级页面骨架。
- **自适应块布局** — 使用 `minColumnWidth` 配合 `autoFit`，创建无需手动断点即可自动回流的响应式区块网格。
- **数据密集型界面** — 使用显式 `columns` 和 `rows`，构建类似表格或日历的布局，子项可跨越多行多列。
- **非对称布局** — 使用 `Grid.Item` 的 `colSpan` 和 `rowSpan`，创建跨轨道的重点区域。
- **响应式重排** — 向 `columns`、`gap`、`areas` 传入响应式对象，在不同断点下彻底改变布局（如移动端将侧边栏堆叠到内容下方）。

### Grid 与 Grid System（Row / Col）对比

| | Grid | Grid System（Row / Col） |
|---|---|---|
| CSS 技术 | CSS Grid | Flexbox + 24 栏数学计算 |
| 布局维度 | 二维（行 + 列） | 一维（仅列） |
| 最佳场景 | Dashboard、自适应区块、命名区域、跨行布局 | 经典页面分栏、表单布局、营销页 |
| 响应式方式 | 任意属性均支持响应式对象 | Col 上的断点属性（`xs`–`xxl`） |

- 如果你是从 **MUI Grid** 迁移过来，可以先使用 `spacing`、`rowSpacing`、`columnSpacing`、`size`、`offset`，再逐步使用 `areas` 和 `rowSpan` 这些更强的 CSS Grid 能力。

## 代码示例

<Demo>

### 显式列定义

使用 `columns` 直接定义固定轨道和弹性轨道。

<DemoBlock component={ExplicitColumnsDemo} source={ExplicitColumnsSource} />

</Demo>
<Demo>

### 自动适配列

使用 `minColumnWidth` 创建无需手动断点的自适应区块布局。

<DemoBlock component={AutoFitDemo} source={AutoFitSource} />

</Demo>
<Demo>

### 子项对齐

使用 `justify` 和 `align` 控制单元格内部内容的对齐方式。

<DemoBlock component={AlignmentGridDemo} source={AlignmentGridSource} />

</Demo>
<Demo>

### 响应式布局

使用断点驱动的 `columns`、`gap` 和 `Grid.Item size`，展示不同屏宽下的跨度变化。

<DemoBlock component={ResponsiveLayoutDemo} source={ResponsiveLayoutSource} />

</Demo>
<Demo>

### 命名区域

使用 `areas` 和 `Grid.Item area`，直接展示不同区域之间的布局关系。

<DemoBlock component={NamedAreasDemo} source={NamedAreasSource} />

</Demo>
<Demo>

### 自动偏移

使用 `offset="auto"` 将子项推到最右侧，和 MUI Grid 的用法一致。

<DemoBlock component={OffsetAutoDemo} source={OffsetAutoSource} />

</Demo>
<Demo>

### Dashboard 壳层

使用 `areas` 配合嵌套 `Grid`，用更清晰的区块结构展示壳层布局。

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
