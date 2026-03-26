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

# Chart

Beautiful, theme-aware charts built on [Recharts](https://recharts.org/). Colors automatically adapt to light and dark themes via `--ty-chart-*` design tokens.

## Installation

```bash
pnpm add @tiny-design/charts recharts
```

## Usage

```jsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@tiny-design/charts';
import { Bar, BarChart } from 'recharts';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Bar Chart

A basic bar chart with grid, axis, tooltip, and legend. Colors are referenced using `var(--color-KEY)` which maps to the `ChartConfig`.

<DemoBlock component={BarChartDemo} source={BarChartSource} />

    </Demo>
    <Demo>

### Line Chart

Line chart with two data series and customised stroke colors.

<DemoBlock component={LineChartDemo} source={LineChartSource} />

    </Demo>
    <Demo>

### Area Chart

Area chart with gradient fills. Uses SVG `linearGradient` definitions referencing the chart color tokens.

<DemoBlock component={AreaChartDemo} source={AreaChartSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Pie Chart

A donut chart with 5 data series using all chart color tokens. Uses `nameKey` to map data keys to config labels.

<DemoBlock component={PieChartDemo} source={PieChartSource} />

    </Demo>
    <Demo>

### Radar Chart

Radar chart comparing two data series across multiple dimensions.

<DemoBlock component={RadarChartDemo} source={RadarChartSource} />

    </Demo>
    <Demo>

### Custom Tooltip

Tooltip with `indicator="line"` style and a custom `labelFormatter`.

<DemoBlock component={TooltipDemo} source={TooltipSource} />

    </Demo>
  </Column>
</Layout>

## Chart Config

The chart config maps data keys to labels, icons, and color tokens. Colors can be CSS variables, hex, hsl, or oklch.

```tsx
import { type ChartConfig } from '@tiny-design/charts';

const chartConfig: ChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--ty-chart-1)',   // Uses design token
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',             // Or any CSS color
  },
};
```

## Theming

5 chart color tokens are included in `@tiny-design/tokens`, automatically adapting to light/dark themes:

| Token | Light | Dark |
|-------|-------|------|
| `--ty-chart-1` | `#6e41bf` (Primary) | `#9065d0` |
| `--ty-chart-2` | `#1890ff` (Info)    | `#177ddc` |
| `--ty-chart-3` | `#52c41a` (Success) | `#49aa19` |
| `--ty-chart-4` | `#ff9800` (Warning) | `#d89614` |
| `--ty-chart-5` | `#f44336` (Danger)  | `#d32029` |

### Using Colors

Reference colors in chart elements using `var(--color-KEY)` where `KEY` matches the config key:

```tsx
<Bar dataKey="desktop" fill="var(--color-desktop)" />
```

Or in chart data:

```tsx
const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
];
```

## API

### ChartContainer

| Property  | Description                                    | Type                  | Default |
| --------- | ---------------------------------------------- | --------------------- | ------- |
| config    | Chart configuration object                     | `ChartConfig`         | -       |
| children  | Recharts chart element                         | `React.ReactElement`  | -       |
| className | className of container                         | `string`              | -       |
| style     | style object (must include height or min-height) | `CSSProperties`     | -       |

### ChartTooltipContent

| Property      | Description                         | Type                                          | Default |
| ------------- | ----------------------------------- | --------------------------------------------- | ------- |
| indicator     | indicator style                     | enum: `dot` &#124; `line` &#124; `dashed`     | `dot`   |
| hideLabel     | hide the tooltip label              | `boolean`                                     | `false` |
| hideIndicator | hide the color indicator            | `boolean`                                     | `false` |
| labelKey      | config key for tooltip label        | `string`                                      | -       |
| nameKey       | data key for tooltip item names     | `string`                                      | -       |
| labelFormatter | custom label renderer              | `(label, payload) => ReactNode`               | -       |
| formatter     | custom value renderer               | `(value, name, item, index, payload) => ReactNode` | -  |

### ChartLegendContent

| Property      | Description                         | Type                                          | Default   |
| ------------- | ----------------------------------- | --------------------------------------------- | --------- |
| nameKey       | data key for legend item names      | `string`                                      | -         |
| hideIcon      | hide the color icon                 | `boolean`                                     | `false`   |
| verticalAlign | legend position                     | enum: `top` &#124; `bottom`                   | `bottom`  |
