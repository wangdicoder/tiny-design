import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import FormatterDemo from './demo/Formatter';
import FormatterSource from './demo/Formatter.tsx?raw';
import StyleDemo from './demo/Style';
import StyleSource from './demo/Style.tsx?raw';

# Statistic

Display a statistic number with title, supporting formatted values, prefix/suffix, and custom formatting.

## Scenario

Used in dashboards and data-heavy pages to highlight key performance indicators (KPIs).

## Usage

```jsx
import { Statistic } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Display a statistic with title and formatted value.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Custom Formatter

Use `formatter` to fully customize the value display.

<DemoBlock component={FormatterDemo} source={FormatterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Value Style

Customize value appearance with `valueStyle` and `groupSeparator`.

<DemoBlock component={StyleDemo} source={StyleSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property       | Description                                      | Type                                      | Default |
| -------------- | ------------------------------------------------ | ----------------------------------------- | ------- |
| title          | title of the statistic                           | ReactNode                                 |         |
| value          | the value to display                             | number \| string                          |         |
| precision      | number of decimal places                         | number                                    |         |
| prefix         | prefix node of value                             | ReactNode                                 |         |
| suffix         | suffix node of value                             | ReactNode                                 |         |
| groupSeparator | thousands separator                              | string                                    | ,       |
| valueStyle     | custom style for value                           | CSSProperties                             |         |
| formatter      | custom value formatter                           | (value: number \| string) => ReactNode    |         |