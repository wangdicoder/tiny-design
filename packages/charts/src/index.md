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

# Chart

Theme-aware chart primitives built on [Recharts](https://recharts.org/). This package does not replace Recharts. It standardises sizing, color tokens, tooltip/legend UI, and theme-aware chart config for Tiny Design.

## Installation

```bash
pnpm add @tiny-design/charts recharts
```

## Usage

```jsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@tiny-design/charts';
import { Bar, BarChart } from 'recharts';
```

`ChartContainer` measures its own size and injects `width` / `height` into the chart element, so pass the chart element directly.

Import styles once at the app entry if your bundler does not automatically include package CSS side effects:

```tsx
import '@tiny-design/charts/style';
```

## At A Glance

- `@tiny-design/charts` is a presentation layer on top of Recharts, not a replacement for it.
- It standardises sizing, chart color variables, tooltip/legend UI, and theme-aware chart config.
- It does not abstract chart semantics such as axes, series composition, domains, or data transforms.
- Use it when you want Tiny Design visual consistency without giving up direct Recharts control.

## Basic Charts

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

## Config And Presentation

<Layout>
  <Column>
    <Demo>

### Payload Mapping

Shows `labelKey` resolving the tooltip title from the underlying payload while series labels still come from `ChartConfig`.

<DemoBlock component={MappedTooltipLegendDemo} source={MappedTooltipLegendSource} />

    </Demo>
    <Demo>

### Theme Colors

Uses `theme.light` and `theme.dark` to provide explicit chart colors outside the default token palette.

<DemoBlock component={ThemeColorsDemo} source={ThemeColorsSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Fallback Size

Uses `fallbackSize` so the chart has deterministic initial dimensions before runtime measurement completes.

<DemoBlock component={FallbackSizeDemo} source={FallbackSizeSource} />

    </Demo>
  </Column>
</Layout>

## Business Patterns

<Layout>
  <Column>
    <Demo>

### Icons And Formatter

Adds custom config icons and a value formatter for tooltip content while keeping legend and tooltip labels aligned.

<DemoBlock component={IconsAndFormatterDemo} source={IconsAndFormatterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Empty State

Recommended business pattern: guard empty data before rendering `ChartContainer` and show a proper placeholder instead.

<DemoBlock component={EmptyStateDemo} source={EmptyStateSource} />

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

Use data keys that are safe for CSS custom properties: letters, numbers, `_`, and `-`.

If you need light and dark colors that do not map directly to Tiny tokens, use `theme`. You can provide both `light` and `dark`, or only one — the missing side falls back to `color`:

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
    color: '#6366f1',        // fallback when a theme side is missing
    theme: { dark: '#a5b4fc' },
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

## Props

### ChartContainer

| Property  | Description                                    | Type                  | Default |
| --------- | ---------------------------------------------- | --------------------- | ------- |
| config    | Chart configuration object                     | `ChartConfig`         | -       |
| children  | Recharts chart element                         | `React.ReactElement`  | -       |
| className | className of container                         | `string`              | -       |
| style     | style object. Set `height` or `minHeight` for predictable layout. | `CSSProperties` | - |
| fallbackSize | optional initial width and height used before runtime measurement. Useful for SSR or deterministic tests. | `{ width: number; height: number }` | - |

Do not nest another `ResponsiveContainer` inside `ChartContainer`.

### ChartTooltipContent

| Property      | Description                         | Type                                          | Default |
| ------------- | ----------------------------------- | --------------------------------------------- | ------- |
| indicator     | indicator style                     | enum: `dot` &#124; `line` &#124; `dashed`     | `dot`   |
| hideLabel     | hide the tooltip label              | `boolean`                                     | `false` |
| hideIndicator | hide the color indicator            | `boolean`                                     | `false` |
| labelKey      | field read from the first payload item to resolve the tooltip label via `ChartConfig` | `string` | - |
| nameKey       | field read from each payload item to resolve series labels via `ChartConfig` | `string` | - |
| labelFormatter | custom label renderer              | `(label, payload) => ReactNode`               | -       |
| formatter     | custom value renderer               | `(value, name, item, index, payload) => ReactNode` | -  |

### ChartLegendContent

| Property      | Description                         | Type                                          | Default   |
| ------------- | ----------------------------------- | --------------------------------------------- | --------- |
| nameKey       | field read from each legend payload item to resolve labels via `ChartConfig` | `string` | - |
| hideIcon      | hide the color icon                 | `boolean`                                     | `false`   |
| verticalAlign | legend position                     | enum: `top` &#124; `bottom`                   | `bottom`  |

## Best Practices

- Handle loading and empty states before rendering `ChartContainer`.
- Keep `ChartConfig` keys stable and CSS-variable-safe: letters, numbers, `_`, and `-`.
- Use `fallbackSize` when first paint needs deterministic dimensions, especially in SSR or docs examples.
- Use `nameKey` and `labelKey` only when the original Recharts payload exposes the fields you need.
- Keep chart-specific logic in Recharts and use this package for presentation concerns.

## Anti-Patterns

- Do not nest `ResponsiveContainer` inside `ChartContainer`.
- Do not treat this package as a new chart DSL or expect it to hide Recharts concepts.
- Do not store unstable or user-generated strings directly as chart config keys without normalising them first.

## Constraints

- `ChartContainer` only manages sizing and token injection. All chart semantics still come from Recharts.
- Chart config keys must stay stable across renders because they are used as CSS variable names.
- `labelKey` and `nameKey` only work when the original Recharts payload exposes those fields on `payload`.
