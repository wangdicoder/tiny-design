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
import MappedTooltipLegendDemo from './demo/MappedTooltipLegend';
import MappedTooltipLegendSource from './demo/MappedTooltipLegend.tsx?raw';
import ThemeColorsDemo from './demo/ThemeColors';
import ThemeColorsSource from './demo/ThemeColors.tsx?raw';
import FallbackSizeDemo from './demo/FallbackSize';
import FallbackSizeSource from './demo/FallbackSize.tsx?raw';
import EmptyStateDemo from './demo/EmptyState';
import EmptyStateSource from './demo/EmptyState.tsx?raw';
import IconsAndFormatterDemo from './demo/IconsAndFormatter';
import IconsAndFormatterSource from './demo/IconsAndFormatter.tsx?raw';

# Chart 图表

基于 [Recharts](https://recharts.org/) 构建的主题感知图表基础能力。它不是对 Recharts 的替代，而是为 Tiny Design 统一尺寸管理、颜色令牌、提示框/图例样式和主题配置。

## 安装

```bash
pnpm add @tiny-design/charts recharts
```

## 使用方式

```jsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@tiny-design/charts';
import { Bar, BarChart } from 'recharts';
```

`ChartContainer` 会测量自身尺寸，并把 `width` / `height` 注入到图表元素中，直接传入图表组件即可。

如果你的打包器不会自动带上包内样式，请在应用入口显式引入：

```tsx
import '@tiny-design/charts/style';
```

## 一眼看懂

- `@tiny-design/charts` 是构建在 Recharts 之上的表现层，不是替代 Recharts 的新图表库。
- 它主要统一尺寸管理、图表颜色变量、tooltip/legend 样式，以及主题化的图表配置。
- 它不抽象坐标轴、系列组合、数据域、数据转换等图表语义。
- 当你想保留 Recharts 灵活性的同时获得 Tiny Design 一致视觉时，用它最合适。

## 基础图形

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

## 配置与表现

<Layout>
  <Column>
    <Demo>

### Payload 映射

展示 `labelKey` 如何从底层 payload 中解析提示框标题，同时系列名称仍通过 `ChartConfig` 统一映射。

<DemoBlock component={MappedTooltipLegendDemo} source={MappedTooltipLegendSource} />

    </Demo>
    <Demo>

### 主题颜色

通过 `theme.light` 和 `theme.dark` 为图表显式指定亮色/暗色值，不依赖默认 token 调色板。

<DemoBlock component={ThemeColorsDemo} source={ThemeColorsSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Fallback Size

通过 `fallbackSize` 在运行时测量完成前提供稳定的初始尺寸。

<DemoBlock component={FallbackSizeDemo} source={FallbackSizeSource} />

    </Demo>
  </Column>
</Layout>

## 业务模式

<Layout>
  <Column>
    <Demo>

### 图标与格式化

通过 `ChartConfig.icon` 和 tooltip `formatter` 展示更完整的业务标签与数值文案。

<DemoBlock component={IconsAndFormatterDemo} source={IconsAndFormatterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Empty State

更推荐的业务写法是先判断空数据，再决定是否渲染 `ChartContainer`，而不是让图表自己承担空状态展示。

<DemoBlock component={EmptyStateDemo} source={EmptyStateSource} />

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

配置键名需要能安全用于 CSS 自定义属性，建议只使用字母、数字、`_` 和 `-`。

如果你需要独立的亮色/暗色值，而不是直接复用 Tiny token，可以使用 `theme`。`light` 和 `dark` 可以只提供一侧，缺失的一侧会回退到 `color`：

```tsx
const chartConfig: ChartConfig = {
  revenue: {
    label: 'Revenue',
    theme: {
      light: '#0f172a',
      dark: '#e2e8f0',
    },
  },
  cost: {
    label: 'Cost',
    color: '#6366f1',        // 缺失的 theme 侧会回退到此值
    theme: { dark: '#a5b4fc' },
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

## Props

### ChartContainer

| 属性      | 说明                                   | 类型                  | 默认值  |
| --------- | -------------------------------------- | --------------------- | ------- |
| config    | 图表配置对象                           | `ChartConfig`         | -       |
| children  | Recharts 图表元素                      | `React.ReactElement`  | -       |
| className | 容器类名                               | `string`              | -       |
| style     | 样式对象。建议设置 `height` 或 `minHeight` 以获得稳定布局 | `CSSProperties` | - |
| fallbackSize | 运行时测量完成前使用的初始宽高，适合 SSR 或确定性测试 | `{ width: number; height: number }` | - |

不要在 `ChartContainer` 内再嵌套一层 `ResponsiveContainer`。

### ChartTooltipContent

| 属性           | 说明                      | 类型                                          | 默认值  |
| -------------- | ------------------------- | --------------------------------------------- | ------- |
| indicator      | 指示器样式                | enum: `dot` &#124; `line` &#124; `dashed`     | `dot`   |
| hideLabel      | 隐藏提示框标签            | `boolean`                                     | `false` |
| hideIndicator  | 隐藏颜色指示器            | `boolean`                                     | `false` |
| labelKey       | 从第一条 payload 数据里读取字段，并通过 `ChartConfig` 解析提示框标题 | `string` | - |
| nameKey        | 从每条 payload 数据里读取字段，并通过 `ChartConfig` 解析系列名称 | `string` | - |
| labelFormatter | 自定义标签渲染函数        | `(label, payload) => ReactNode`               | -       |
| formatter      | 自定义值渲染函数          | `(value, name, item, index, payload) => ReactNode` | -  |

### ChartLegendContent

| 属性          | 说明                      | 类型                                          | 默认值    |
| ------------- | ------------------------- | --------------------------------------------- | --------- |
| nameKey       | 从每条 legend payload 里读取字段，并通过 `ChartConfig` 解析标签 | `string` | - |
| hideIcon      | 隐藏颜色图标              | `boolean`                                     | `false`   |
| verticalAlign | 图例位置                  | enum: `top` &#124; `bottom`                   | `bottom`  |

## 最佳实践

- 在渲染 `ChartContainer` 之前，先在业务层处理 loading 和 empty state。
- 保持 `ChartConfig` 键名稳定，并确保它们能安全作为 CSS 变量名使用：字母、数字、`_`、`-`。
- 在 SSR 或文档示例等需要稳定首屏尺寸的场景下使用 `fallbackSize`。
- 只有在原始 Recharts payload 中确实存在对应字段时，再使用 `nameKey` 和 `labelKey`。
- 图表语义和复杂逻辑继续交给 Recharts，这个包只负责表现层。

## 反模式

- 不要在 `ChartContainer` 内再嵌套 `ResponsiveContainer`。
- 不要把这个包当作新的图表 DSL，或期待它屏蔽 Recharts 的概念。
- 不要直接把不稳定或用户输入的字符串当作 chart config key，而不先做归一化。

## 约束说明

- `ChartContainer` 只负责尺寸管理和颜色令牌注入，图表语义仍然来自 Recharts。
- 配置键名会被用作 CSS 变量名，渲染过程中应保持稳定。
- `labelKey` 和 `nameKey` 依赖 Recharts 原始 payload 中存在对应字段。
