import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomDemo from './demo/Custom';
import CustomSource from './demo/Custom.tsx?raw';
import DotDemo from './demo/Dot';
import DotSource from './demo/Dot.tsx?raw';
import OverflowDemo from './demo/Overflow';
import OverflowSource from './demo/Overflow.tsx?raw';
import StandaloneDemo from './demo/Standalone';
import StandaloneSource from './demo/Standalone.tsx?raw';
import DynamicDemo from './demo/Dynamic';
import DynamicSource from './demo/Dynamic.tsx?raw';

# Badge 徽标

UI 元素的小型数值或状态描述符。

## 使用场景

徽标通常出现在通知或用户头像附近，醒目地展示未读消息数量。

## 引入方式

```jsx
import { Badge } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

最简单的用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 溢出

当 count 大于 max 时，会显示 `max+`。默认最大值是 **99**。

<DemoBlock component={OverflowDemo} source={OverflowSource} />

    </Demo>
    <Demo>

### 独立使用

在子元素为空时独立使用。

<DemoBlock component={StandaloneDemo} source={StandaloneSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 红点徽标

不显示具体数字，只显示红点。

<DemoBlock component={DotDemo} source={DotSource} />

    </Demo>
    <Demo>

### 多彩徽标

设置 `color` 以不同颜色显示小圆点徽标。`processing` 可以显示波纹动画。

> 只有小圆点徽标才有 `processing` 效果。

<DemoBlock component={CustomDemo} source={CustomSource} />
    
    </Demo>
    <Demo>

### 动态变化

通过按钮增减数字，或通过开关切换小圆点。

<DemoBlock component={DynamicDemo} source={DynamicSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性          | 说明                                                          | 类型              | 默认值    |
| ------------- | ------------------------------------------------------------- | ----------------- | --------- |
| count         | 徽标中显示的数字                                              | ReactNode         |           |
| color         | 背景颜色                                                      | string            | #f2453d   |
| max           | 显示的最大数值                                                | number            | 99        |
| dot           | 仅显示一个小圆点                                              | boolean           | false     |
| processing    | 显示波纹动画效果                                              | boolean           | false     |
| showZero      | 当值为零时，默认隐藏徽标                                      | boolean           | false     |
| title         | 鼠标悬停在徽标上时显示的文本                                  | string            |           |
| badgeStyle    | 内部徽标样式                                                  | CSSProperties     |           |