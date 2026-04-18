import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import FormatterDemo from './demo/Formatter';
import FormatterSource from './demo/Formatter.tsx?raw';
import StyleDemo from './demo/Style';
import StyleSource from './demo/Style.tsx?raw';
import StatesDemo from './demo/States';
import StatesSource from './demo/States.tsx?raw';

# Statistic

Product-grade metric display with internationalized formatting, semantic states, trend indicators, and supporting context.

## Scenario

Use `Statistic` in dashboards, metric cards, review pages, and operational surfaces where a number needs structure around it: title, description, trend, health state, loading, and supporting copy.

## Usage

```jsx
import { Statistic } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Dashboard Metrics

Show the metric itself together with context, trend, and health.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Formatting

Use `format` to switch between currency, percent, compact, and duration displays.

<DemoBlock component={FormatterDemo} source={FormatterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Product Composition

Compose `Statistic` inside cards with tooltip, footer, and operational context.

<DemoBlock component={StyleDemo} source={StyleSource} />

    </Demo>
    <Demo>

### States

Compare loading, empty, error, and resolved value states with a consistent card layout.

<DemoBlock component={StatesDemo} source={StatesSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Metric title | `ReactNode` | - |
| description | Supporting copy shown under the title | `ReactNode` | - |
| tooltip | Tooltip content shown beside the title | `ReactNode` | - |
| value | Metric value | `number \| string \| null` | - |
| format | Declarative formatting options for numeric values | `StatisticFormatOptions` | `{ type: 'number' }` |
| prefix | Content before the value | `ReactNode` | - |
| suffix | Content after the value | `ReactNode` | - |
| formatter | Full custom renderer for the value area | `(value, info) => ReactNode` | - |
| trend | Trend indicator with direction, value, label, and sentiment | `StatisticTrend` | - |
| status | Semantic health state | `StatisticStatus` | - |
| extra | Auxiliary content shown next to trend/status | `ReactNode` | - |
| footer | Footer content below the metric | `ReactNode` | - |
| loading | Whether to show the loading skeleton | `boolean` | `false` |
| skeleton | Custom loading placeholder | `ReactNode` | - |
| empty | Empty-state content when value is missing or invalid | `ReactNode` | `--` |
| error | Error-state content. When provided it overrides value rendering | `ReactNode` | - |
| size | Metric scale | `'sm' \| 'md' \| 'lg'` | `'md'` |
| emphasis | Value font emphasis | `'normal' \| 'strong'` | `'strong'` |
| align | Horizontal alignment | `'start' \| 'center' \| 'end'` | `'start'` |
| monospace | Apply tabular numbers to the value | `boolean` | `true` |
| valueClassName | Custom class for the value container | `string` | - |
| titleClassName | Custom class for the title | `string` | - |
| trendClassName | Custom class for the trend container | `string` | - |
| valueStyle | Inline style for the value container | `CSSProperties` | - |
| titleStyle | Inline style for the title | `CSSProperties` | - |
| trendStyle | Inline style for the trend container | `CSSProperties` | - |

## StatisticFormatOptions

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| type | Format mode | `'number' \| 'decimal' \| 'percent' \| 'currency' \| 'compact' \| 'duration' \| 'custom'` | `'number'` |
| locale | BCP 47 locale for `Intl.NumberFormat` | `string` | `'en-US'` |
| currency | Currency code used when `type='currency'` | `string` | - |
| minimumFractionDigits | Minimum fraction digits | `number` | - |
| maximumFractionDigits | Maximum fraction digits | `number` | - |
| useGrouping | Whether to group thousands | `boolean` | - |
| notation | Number notation | `'standard' \| 'compact'` | - |
| compactDisplay | Compact display style | `'short' \| 'long'` | `'short'` |
| unit | `Intl` unit name for decimal values | `Intl.NumberFormatOptions['unit']` | - |
| unitDisplay | Unit display style | `'short' \| 'long' \| 'narrow'` | - |
| signDisplay | Sign display mode | `'auto' \| 'always' \| 'never' \| 'exceptZero'` | - |
| durationUnit | Input unit when `type='duration'` | `'ms' \| 's'` | `'ms'` |

## StatisticTrend

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| direction | Visual direction of the trend indicator | `'up' \| 'down' \| 'flat'` | - |
| value | Main trend content, usually a delta such as `+12.4%` | `ReactNode` | - |
| label | Secondary context for the trend, such as `vs last month` | `ReactNode` | - |
| sentiment | Semantic meaning of the trend color. Keep this separate from direction because a downward trend can be good in some products | `'positive' \| 'negative' \| 'neutral'` | - |
| icon | Custom icon used instead of the built-in arrow/flat marker | `ReactNode` | - |

Example:

```tsx
trend={{
  direction: 'up',
  value: '+12.4%',
  label: 'vs last month',
  sentiment: 'positive',
}}
```

## StatisticStatus

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| type | Semantic state used for status color | `'default' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| text | Status copy shown next to the status dot | `ReactNode` | - |

Example:

```tsx
status={{
  type: 'warning',
  text: 'Above weekly target',
}}
```

## StatisticRenderInfo

This object is passed as the second argument to `formatter`.

| Property | Description | Type |
| --- | --- | --- |
| rawValue | Original `value` passed into the component | `number \| string \| null \| undefined` |
| formattedValue | Value formatted by the built-in formatter | `string` |
| locale | Resolved locale used during formatting | `string` |
| isEmpty | Whether the value is considered empty and would fall back to `empty` | `boolean` |
| isNumeric | Whether the original value is a finite number | `boolean` |
| parts | Optional `Intl.NumberFormat#formatToParts` result for advanced rendering | `Intl.NumberFormatPart[] \| undefined` |

Example:

```tsx
<Statistic
  value={128430.5}
  format={{ type: 'currency', currency: 'USD' }}
  formatter={(_, info) => (
    <span>
      {info.formattedValue}
      {info.isNumeric ? ' ARR' : ''}
    </span>
  )}
/>
```

## Rendering Priority

`Statistic` resolves display states in the following order:

1. `loading`
2. `error`
3. `empty`
4. `value`

That means:

- When `loading` is `true`, the component shows the skeleton placeholder and does not render the value.
- When `error` is provided, it overrides normal value rendering.
- When `value` is empty or invalid (`null`, `undefined`, `''`, `NaN`, `Infinity`), the component falls back to `empty`.
- Only when none of the above apply does the component render the formatted value or `formatter` result.

## Design Guidance

- Use `title` for the metric label only. Keep it short and scannable.
- Use `description` for contextual explanation, source, or time window. It should read as supporting copy, not as a second title.
- Use `trend` for directional change such as growth, decline, or stability. Keep it compact.
- Use `status` for semantic health or operational state such as `Healthy`, `Delayed`, or `Data unavailable`.
- Keep `direction` and `sentiment` separate. For example, a complaint rate going down is usually `direction: 'down'` and `sentiment: 'positive'`.
- Prefer short primary error states such as `Unavailable` or `Sync failed`, and move details into `status`, `description`, or `footer`.
- Keep empty states concise. They should not visually overpower a valid metric value.
- Use `formatter` for advanced display logic, but prefer `format` whenever standard number, percent, currency, compact, or duration formatting is sufficient.

## Common Patterns

### KPI Card

Use when a dashboard needs to highlight a core business number with a short trend summary.

```tsx
<Statistic
  title="Monthly Revenue"
  description="Booked revenue across all active subscriptions."
  value={128430.5}
  format={{ type: 'currency', currency: 'USD', maximumFractionDigits: 2 }}
  trend={{
    direction: 'up',
    value: '+12.4%',
    label: 'vs last month',
    sentiment: 'positive',
  }}
  status={{ type: 'success', text: 'Healthy growth' }}
/>
```

### Operational Status

Use when the primary message is whether a system or feed is healthy, delayed, or unavailable.

```tsx
<Statistic
  title="Warehouse Feed"
  description="Most recent ETL job"
  error="Unavailable"
  status={{ type: 'danger', text: 'Connection timeout while reading the warehouse feed' }}
  footer="Data quality checks are paused until the next successful sync."
/>
```

### Financial Metric

Use when currency, locale, and semantic health all matter.

```tsx
<Statistic
  title="Gross Margin"
  description="Trailing 30 days"
  value={0.472}
  format={{ type: 'percent', maximumFractionDigits: 1 }}
  trend={{
    direction: 'up',
    value: '+1.8%',
    label: 'vs prior period',
    sentiment: 'positive',
  }}
  extra="Target: above 45%"
/>
```

### SLA or Performance Metric

Use when the metric is duration-based and should be paired with a compact operational status.

```tsx
<Statistic
  title="Incident Response"
  description="Median time from alert open to first owner action."
  value={8 * 60 + 24}
  format={{ type: 'duration', durationUnit: 's' }}
  status={{ type: 'warning', text: 'Above weekly target' }}
  extra="Target: under 7m"
/>
```
