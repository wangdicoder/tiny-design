import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import FormatterDemo from './demo/Formatter';
import FormatterSource from './demo/Formatter.tsx?raw';
import StyleDemo from './demo/Style';
import StyleSource from './demo/Style.tsx?raw';

# Statistic 统计数值

展示统计数值，支持格式化数值、前后缀和自定义格式。

## 使用场景

用于仪表盘和数据密集页面，突出展示关键绩效指标（KPI）。

## 使用方式

```jsx
import { Statistic } from 'tiny-design';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 基本用法

展示带标题和格式化数值的统计组件。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 自定义格式化

使用 `formatter` 来自定义数值显示。

<DemoBlock component={FormatterDemo} source={FormatterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 数值样式

通过 `valueStyle` 和 `groupSeparator` 自定义数值外观。

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
| valueStyle     | 数值样式                 | CSSProperties                             |         |
| formatter      | 自定义格式化函数         | (value: number \| string) => ReactNode    |         |