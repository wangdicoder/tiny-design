import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import FormatterDemo from './demo/Formatter';
import FormatterSource from './demo/Formatter.tsx?raw';
import StyleDemo from './demo/Style';
import StyleSource from './demo/Style.tsx?raw';

# Statistic

Display key figures with clear formatting, prefix/suffix content, and customizable rendering.

## Scenario

Used in dashboards and data-heavy pages to highlight key performance indicators (KPIs), financial numbers, and progress metrics.

## Usage

```jsx
import { Statistic } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Display a statistic with title, numeric formatting, and prefix/suffix content.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Custom Formatter

Use `formatter` to customize rendering while still receiving the formatted value.

<DemoBlock component={FormatterDemo} source={FormatterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Value Style

Customize separators, empty state, and value appearance.

<DemoBlock component={StyleDemo} source={StyleSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property       | Description                                      | Type                                      | Default |
| -------------- | ------------------------------------------------ | ----------------------------------------- | ------- |
| title          | title of the statistic                           | ReactNode                                 |         |
| value          | the value to display                             | number \| string                          |         |
| precision      | number of decimal places                         | number                                    |         |
| prefix         | prefix node of value                             | ReactNode                                 |         |
| suffix         | suffix node of value                             | ReactNode                                 |         |
| groupSeparator | thousands separator                              | string                                    | ,       |
| decimalSeparator | decimal separator                              | string                                    | .       |
| valueStyle     | custom style for value                           | CSSProperties                             |         |
| valueClassName | custom class name for value container            | string                                    |         |
| empty          | placeholder content for empty or invalid values  | ReactNode                                 | --      |
| formatter      | custom value formatter                           | (value: number \| string, info: StatisticFormatterInfo) => ReactNode |         |

`formatter` receives a second argument with `formattedValue`, `groupSeparator`, `decimalSeparator`, `precision`, and `isNumeric`, so custom rendering can reuse the component's built-in formatting rules.
