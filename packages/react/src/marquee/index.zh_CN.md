import BasicDemo from './demo/basic';
import BasicSource from './demo/basic.tsx?raw';
import DirectionDemo from './demo/direction';
import DirectionSource from './demo/direction.tsx?raw';
import SpeedDemo from './demo/speed';
import SpeedSource from './demo/speed.tsx?raw';
import CardsDemo from './demo/cards';
import CardsSource from './demo/cards.tsx?raw';

# Marquee 跑马灯

一个自动循环滚动内容的无限滚动组件。

## 使用场景

当你需要展示一组连续滚动的内容（如 Logo、卡片、标签）时使用，支持自动滚动和悬停暂停。

## 使用方式

```jsx
import { Marquee } from '@tiny-design/react';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础用法

基础跑马灯，带边缘渐隐效果。悬停时暂停。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 速度

通过 `duration` 控制滚动速度。值越小，滚动越快。

<DemoBlock component={SpeedDemo} source={SpeedSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 方向

使用 `direction="right"` 反转滚动方向。组合两行可实现交错效果。

<DemoBlock component={DirectionDemo} source={DirectionSource} />

    </Demo>
    <Demo>

### 卡片

跑马灯适用于任意内容，例如富布局卡片。

<DemoBlock component={CardsDemo} source={CardsSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性         | 说明                  | 类型                             | 默认值  |
| ------------ | --------------------- | -------------------------------- | ------- |
| direction    | 滚动方向              | enum: `left` &#124; `right`      | `left`  |
| duration     | 动画持续时间（秒）     | number                           | 50      |
| pauseOnHover | 悬停时暂停动画         | boolean                          | true    |
| gap          | 项目间距（像素）       | number                           | 16      |
| fade         | 应用边缘渐隐遮罩       | boolean                          | false   |
| infinite     | 无限循环动画           | boolean                          | true    |
