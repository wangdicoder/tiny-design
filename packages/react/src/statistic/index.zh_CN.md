import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import FormatterDemo from './demo/Formatter';
import FormatterSource from './demo/Formatter.tsx?raw';
import StyleDemo from './demo/Style';
import StyleSource from './demo/Style.tsx?raw';
import StatesDemo from './demo/States';
import StatesSource from './demo/States.tsx?raw';

# Statistic 统计数值

面向产品场景的指标展示组件，支持国际化格式化、状态表达、趋势信息和辅助上下文。

## 使用场景

适用于仪表盘、经营分析、指标卡片、运维面板等场景。除了显示数值本身，还可以统一承载标题、说明、趋势、健康状态、加载态和补充信息。

## 使用方式

```jsx
import { Statistic } from 'tiny-design';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 仪表盘指标

同时展示指标数值、背景说明、趋势和健康状态。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 数值格式化

通过 `format` 在货币、百分比、紧凑数值和时长等模式之间切换。

<DemoBlock component={FormatterDemo} source={FormatterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 产品化组合

在卡片中组合 `Statistic`，展示 Tooltip、页脚说明和业务上下文。

<DemoBlock component={StyleDemo} source={StyleSource} />

    </Demo>
    <Demo>

### 状态表达

用统一的卡片结构对比 loading、empty、error 和正常值状态。

<DemoBlock component={StatesDemo} source={StatesSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 指标标题 | `ReactNode` | - |
| description | 标题下方的辅助说明 | `ReactNode` | - |
| tooltip | 标题旁的提示内容 | `ReactNode` | - |
| value | 指标值 | `number \| string \| null` | - |
| format | 数值格式化配置 | `StatisticFormatOptions` | `{ type: 'number' }` |
| prefix | 数值前缀内容 | `ReactNode` | - |
| suffix | 数值后缀内容 | `ReactNode` | - |
| formatter | 完全自定义数值渲染 | `(value, info) => ReactNode` | - |
| trend | 趋势信息，包含方向、数值、标签和语义倾向 | `StatisticTrend` | - |
| status | 指标健康状态 | `StatisticStatus` | - |
| extra | 趋势/状态旁边的辅助信息 | `ReactNode` | - |
| footer | 数值下方页脚内容 | `ReactNode` | - |
| loading | 是否显示骨架屏 | `boolean` | `false` |
| skeleton | 自定义加载占位 | `ReactNode` | - |
| empty | 空值或非法值时的占位内容 | `ReactNode` | `--` |
| error | 错误态内容，存在时优先于数值显示 | `ReactNode` | - |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| emphasis | 主数值字重层级 | `'normal' \| 'strong'` | `'strong'` |
| align | 水平对齐方式 | `'start' \| 'center' \| 'end'` | `'start'` |
| monospace | 是否对主数值启用等宽数字 | `boolean` | `true` |
| valueClassName | 数值区域自定义类名 | `string` | - |
| titleClassName | 标题自定义类名 | `string` | - |
| trendClassName | 趋势区域自定义类名 | `string` | - |
| valueStyle | 数值区域样式 | `CSSProperties` | - |
| titleStyle | 标题样式 | `CSSProperties` | - |
| trendStyle | 趋势区域样式 | `CSSProperties` | - |

## StatisticFormatOptions

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 格式化模式 | `'number' \| 'decimal' \| 'percent' \| 'currency' \| 'compact' \| 'duration' \| 'custom'` | `'number'` |
| locale | `Intl.NumberFormat` 使用的 locale | `string` | `'en-US'` |
| currency | `type='currency'` 时的货币代码 | `string` | - |
| minimumFractionDigits | 最小小数位数 | `number` | - |
| maximumFractionDigits | 最大小数位数 | `number` | - |
| useGrouping | 是否启用千分位分组 | `boolean` | - |
| notation | 数字记数法 | `'standard' \| 'compact'` | - |
| compactDisplay | 紧凑格式展示方式 | `'short' \| 'long'` | `'short'` |
| unit | 十进制数值的 `Intl` 单位名 | `Intl.NumberFormatOptions['unit']` | - |
| unitDisplay | 单位显示方式 | `'short' \| 'long' \| 'narrow'` | - |
| signDisplay | 正负号展示策略 | `'auto' \| 'always' \| 'never' \| 'exceptZero'` | - |
| durationUnit | `type='duration'` 时输入值的单位 | `'ms' \| 's'` | `'ms'` |

## StatisticTrend

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 趋势图标方向 | `'up' \| 'down' \| 'flat'` | - |
| value | 趋势主内容，通常是 `+12.4%` 这样的变化值 | `ReactNode` | - |
| label | 趋势辅助说明，例如 `vs last month` | `ReactNode` | - |
| sentiment | 趋势语义颜色。它应与 direction 解耦，因为有些业务里下降反而是正向结果 | `'positive' \| 'negative' \| 'neutral'` | - |
| icon | 自定义趋势图标，会替代内置箭头/横线图标 | `ReactNode` | - |

示例：

```tsx
trend={{
  direction: 'up',
  value: '+12.4%',
  label: 'vs last month',
  sentiment: 'positive',
}}
```

## StatisticStatus

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 状态语义颜色 | `'default' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| text | 状态圆点旁边的说明文案 | `ReactNode` | - |

示例：

```tsx
status={{
  type: 'warning',
  text: 'Above weekly target',
}}
```

## StatisticRenderInfo

该对象会作为 `formatter` 的第二个参数传入。

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| rawValue | 传入组件的原始 `value` | `number \| string \| null \| undefined` |
| formattedValue | 经过内置格式化后的值 | `string` |
| locale | 实际用于格式化的 locale | `string` |
| isEmpty | 当前值是否会被判定为空并回退到 `empty` | `boolean` |
| isNumeric | 原始值是否为有限数字 | `boolean` |
| parts | 可选的 `Intl.NumberFormat#formatToParts` 结果，适合做高级自定义渲染 | `Intl.NumberFormatPart[] \| undefined` |

示例：

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

## 渲染优先级

`Statistic` 会按以下顺序决定当前显示状态：

1. `loading`
2. `error`
3. `empty`
4. `value`

也就是说：

- 当 `loading` 为 `true` 时，组件显示骨架屏，不渲染数值。
- 当传入 `error` 时，错误态会覆盖正常数值显示。
- 当 `value` 为空或非法（`null`、`undefined`、`''`、`NaN`、`Infinity`）时，组件会回退到 `empty`。
- 只有以上情况都不满足时，组件才会渲染格式化后的数值或 `formatter` 的结果。

## 设计建议

- `title` 只用于指标名称，尽量短、易扫读。
- `description` 用于补充上下文、口径来源或时间范围，它应当是辅助说明，而不是第二个标题。
- `trend` 适合表达涨跌、变化和稳定趋势，内容应尽量紧凑。
- `status` 适合表达健康状态或运营状态，例如 `Healthy`、`Delayed`、`Data unavailable`。
- `direction` 和 `sentiment` 应当解耦。例如投诉率下降通常应写成 `direction: 'down'`，但 `sentiment: 'positive'`。
- 错误态主文案建议简短，如 `Unavailable`、`Sync failed`，详细原因可以放在 `status`、`description` 或 `footer`。
- 空态文案应当克制，不要在视觉上压过正常指标值。
- 需要复杂展示时使用 `formatter`，但如果只是标准数值、百分比、货币、紧凑数值或时长格式，优先使用 `format`。

## 常见模式

### KPI 卡片

适用于仪表盘中需要突出展示核心业务指标，并附带简短趋势信息的场景。

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

### 运营状态指标

适用于核心信息是系统、数据流或任务是否健康、延迟或不可用的场景。

```tsx
<Statistic
  title="Warehouse Feed"
  description="Most recent ETL job"
  error="Unavailable"
  status={{ type: 'danger', text: 'Connection timeout while reading the warehouse feed' }}
  footer="Data quality checks are paused until the next successful sync."
/>
```

### 财务指标

适用于需要同时关注货币/百分比格式、趋势变化和健康状态的财务场景。

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

### SLA / 性能指标

适用于时长类指标，并且需要搭配简洁运营状态说明的场景。

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
