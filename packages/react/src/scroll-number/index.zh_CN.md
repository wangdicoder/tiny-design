import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import TitlePrefixSuffixDemo from './demo/TitlePrefixSuffix';
import TitlePrefixSuffixSource from './demo/TitlePrefixSuffix.tsx?raw';
import DurationDemo from './demo/Duration';
import DurationSource from './demo/Duration.tsx?raw';
import CustomStyleDemo from './demo/CustomStyle';
import CustomStyleSource from './demo/CustomStyle.tsx?raw';

# ScrollNumber 滚动数字

通过垂直滚动效果展示数字变化。每个数字位独立滚动，形成机械计数器效果。

## 使用场景

适用于仪表盘、统计计数、徽标等需要动态数字变化且需要视觉吸引力的场景。

## 使用方式

```jsx
import { ScrollNumber } from '@tiny-design/react';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 基本用法

点击按钮改变数值，查看滚动动画效果。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 动画时长

对比不同动画速度的效果。

<DemoBlock component={DurationDemo} source={DurationSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 标题、前缀和后缀

搭配标题、前缀、后缀和精度使用，类似 Statistic 组件。

<DemoBlock component={TitlePrefixSuffixDemo} source={TitlePrefixSuffixSource} />

    </Demo>
    <Demo>

### 自定义样式

通过 `valueStyle`、`valueClassName` 和 `groupSeparator` 自定义字号、颜色、类名和分隔符。

<DemoBlock component={CustomStyleDemo} source={CustomStyleSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 显示的数值 | `number \| string` | - |
| title | 数值上方显示的标题 | `ReactNode` | - |
| duration | 动画持续时间（毫秒） | `number` | `300` |
| precision | 小数位数 | `number` | - |
| groupSeparator | 千位分隔符 | `string` | `','` |
| prefix | 数值前缀内容 | `ReactNode` | - |
| suffix | 数值后缀内容 | `ReactNode` | - |
| valueClassName | 数值容器的自定义类名 | `string` | - |
| valueStyle | 数值容器的自定义样式 | `CSSProperties` | - |
