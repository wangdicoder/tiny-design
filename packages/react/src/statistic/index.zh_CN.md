import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import FormatterDemo from './demo/Formatter';
import FormatterSource from './demo/Formatter.tsx?raw';
import StyleDemo from './demo/Style';
import StyleSource from './demo/Style.tsx?raw';

# Statistic 统计数值

展示关键统计数值，支持数值格式化、前后缀和自定义渲染。

## 使用场景

用于仪表盘和数据密集页面，突出展示 KPI、财务数字和进度指标。

## 使用方式

```jsx
import { Statistic } from 'tiny-design';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 基本用法

展示带标题、数值格式化和前后缀的统计组件。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 自定义格式化

使用 `formatter` 自定义数值显示，同时复用内置格式化结果。

<DemoBlock component={FormatterDemo} source={FormatterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 数值样式

通过分隔符、空态占位和样式来自定义数值外观。

<DemoBlock component={StyleDemo} source={StyleSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性           | 说明                     | 类型                                      | 默认值  |
| -------------- | ------------------------ | ----------------------------------------- | ------- |
| title          | 统计标题                 | ReactNode                                 |         |
| value          | 展示的数值               | number \| string                          |         |
| precision      | 小数点精度               | number                                    |         |
| prefix         | 数值前缀                 | ReactNode                                 |         |
| suffix         | 数值后缀                 | ReactNode                                 |         |
| groupSeparator | 千分位分隔符             | string                                    | ,       |
| decimalSeparator | 小数分隔符             | string                                    | .       |
| valueStyle     | 数值样式                 | CSSProperties                             |         |
| valueClassName | 数值容器自定义类名       | string                                    |         |
| empty          | 空值或非法数值占位内容   | ReactNode                                 | --      |
| formatter      | 自定义格式化函数         | (value: number \| string, info: StatisticFormatterInfo) => ReactNode |         |

`formatter` 的第二个参数会提供 `formattedValue`、`groupSeparator`、`decimalSeparator`、`precision` 和 `isNumeric`，方便在自定义渲染时复用组件内置格式化逻辑。
