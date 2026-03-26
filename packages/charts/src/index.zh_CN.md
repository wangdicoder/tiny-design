import BarChartDemo from './demo/BarChart';
import BarChartSource from './demo/BarChart.tsx?raw';
import LineChartDemo from './demo/LineChart';
import LineChartSource from './demo/LineChart.tsx?raw';
import AreaChartDemo from './demo/AreaChart';
import AreaChartSource from './demo/AreaChart.tsx?raw';
import PieChartDemo from './demo/PieChart';
import PieChartSource from './demo/PieChart.tsx?raw';
import RadarChartDemo from './demo/RadarChart';
import RadarChartSource from './demo/RadarChart.tsx?raw';
import TooltipDemo from './demo/Tooltip';
import TooltipSource from './demo/Tooltip.tsx?raw';

# 图表 Chart

基于 [Recharts](https://recharts.org/) 构建的主题感知图表组件。颜色通过 `--ty-chart-*` 设计令牌自动适配亮色和暗色主题。

## 安装

```bash
pnpm add @tiny-design/charts recharts
```

## 使用方式

```jsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@tiny-design/charts';
import { Bar, BarChart } from 'recharts';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 柱状图

基本柱状图，包含网格、坐标轴、提示框和图例。通过 `var(--color-KEY)` 引用 `ChartConfig` 中映射的颜色。

<DemoBlock component={BarChartDemo} source={BarChartSource} />

    </Demo>
    <Demo>

### 折线图

包含两组数据系列的折线图，使用自定义描边颜色。

<DemoBlock component={LineChartDemo} source={LineChartSource} />

    </Demo>
    <Demo>

### 面积图

带渐变填充的面积图。使用 SVG `linearGradient` 引用图表颜色令牌。

<DemoBlock component={AreaChartDemo} source={AreaChartSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 饼图

使用全部 5 个图表颜色令牌的环形图。通过 `nameKey` 将数据键映射到配置标签。

<DemoBlock component={PieChartDemo} source={PieChartSource} />

    </Demo>
    <Demo>

### 雷达图

在多个维度上比较两组数据系列的雷达图。

<DemoBlock component={RadarChartDemo} source={RadarChartSource} />

    </Demo>
    <Demo>

### 自定义提示框

使用 `indicator="line"` 样式和自定义 `labelFormatter` 的提示框。

<DemoBlock component={TooltipDemo} source={TooltipSource} />

    </Demo>
  </Column>
</Layout>

## 图表配置

图表配置将数据键映射到标签、图标和颜色令牌。颜色可以是 CSS 变量、十六进制、HSL 或 OKLCH。

```tsx
import { type ChartConfig } from '@tiny-design/charts';

const chartConfig: ChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--ty-chart-1)',   // 使用设计令牌
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',             // 或任何 CSS 颜色
  },
};
```

## 主题

`@tiny-design/tokens` 中包含 5 个图表颜色令牌，自动适配亮色/暗色主题：

| 令牌 | 亮色 | 暗色 |
|------|------|------|
| `--ty-chart-1` | `#6e41bf`（主色） | `#9065d0` |
| `--ty-chart-2` | `#1890ff`（信息色） | `#177ddc` |
| `--ty-chart-3` | `#52c41a`（成功色） | `#49aa19` |
| `--ty-chart-4` | `#ff9800`（警告色） | `#d89614` |
| `--ty-chart-5` | `#f44336`（危险色） | `#d32029` |

### 使用颜色

在图表元素中通过 `var(--color-KEY)` 引用颜色，其中 `KEY` 对应配置键名：

```tsx
<Bar dataKey="desktop" fill="var(--color-desktop)" />
```

或在图表数据中使用：

```tsx
const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
];
```

## API

### ChartContainer

| 属性      | 说明                                   | 类型                  | 默认值  |
| --------- | -------------------------------------- | --------------------- | ------- |
| config    | 图表配置对象                           | `ChartConfig`         | -       |
| children  | Recharts 图表元素                      | `React.ReactElement`  | -       |
| className | 容器类名                               | `string`              | -       |
| style     | 样式对象（必须包含 height 或 min-height） | `CSSProperties`     | -       |

### ChartTooltipContent

| 属性           | 说明                      | 类型                                          | 默认值  |
| -------------- | ------------------------- | --------------------------------------------- | ------- |
| indicator      | 指示器样式                | enum: `dot` &#124; `line` &#124; `dashed`     | `dot`   |
| hideLabel      | 隐藏提示框标签            | `boolean`                                     | `false` |
| hideIndicator  | 隐藏颜色指示器            | `boolean`                                     | `false` |
| labelKey       | 提示框标签的配置键        | `string`                                      | -       |
| nameKey        | 提示框项名称的数据键      | `string`                                      | -       |
| labelFormatter | 自定义标签渲染函数        | `(label, payload) => ReactNode`               | -       |
| formatter      | 自定义值渲染函数          | `(value, name, item, index, payload) => ReactNode` | -  |

### ChartLegendContent

| 属性          | 说明                      | 类型                                          | 默认值    |
| ------------- | ------------------------- | --------------------------------------------- | --------- |
| nameKey       | 图例项名称的数据键        | `string`                                      | -         |
| hideIcon      | 隐藏颜色图标              | `boolean`                                     | `false`   |
| verticalAlign | 图例位置                  | enum: `top` &#124; `bottom`                   | `bottom`  |
