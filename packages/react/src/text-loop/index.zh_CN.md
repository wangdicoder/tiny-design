import BasicDemo from './demo/basic';
import BasicSource from './demo/basic.tsx?raw';
import AlertBannerDemo from './demo/alert-banner';
import AlertBannerSource from './demo/alert-banner.tsx?raw';
import DirectionDemo from './demo/direction';
import DirectionSource from './demo/direction.tsx?raw';
import IntervalDemo from './demo/interval';
import IntervalSource from './demo/interval.tsx?raw';
import OnceDemo from './demo/once';
import OnceSource from './demo/once.tsx?raw';

# TextLoop 文本轮播

逐一循环展示子元素，带有滑动过渡动画。

## Scenario

- 在横幅中循环展示通知消息。
- 轮播展示提示或公告。

## Usage

```jsx
import { TextLoop } from '@tiny-design/react';
```

## 示例

<Layout>
  <Column>
    <Demo>

### 基础用法

每隔3秒垂直循环切换子元素。鼠标悬停时暂停。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 方向

使用 `direction` 控制循环方向：`up` 或 `down`。

<DemoBlock component={DirectionDemo} source={DirectionSource} />

    </Demo>
    <Demo>

### 自定义间隔

设置 `interval` 控制每个项目的展示时长（毫秒）。

<DemoBlock component={IntervalDemo} source={IntervalSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 播放一次

设置 `infinite={false}`，播放完一轮后停在最后一项。

<DemoBlock component={OnceDemo} source={OnceSource} />

    </Demo>
    <Demo>

### 警告横幅

结合 `Alert` 组件循环展示通知消息。

<DemoBlock component={AlertBannerDemo} source={AlertBannerSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property     | Description                              | Type                                          | Default |
| ------------ | ---------------------------------------- | --------------------------------------------- | ------- |
| interval     | time each item stays visible (ms)        | number                                        | 3000    |
| pauseOnHover | pause cycling on hover                   | boolean                                       | true    |
| infinite     | loop infinitely or stop after one cycle  | boolean                                       | true    |
| direction    | cycling direction                        | `up` \| `down`                                | `up`    |
| style        | style object of container                | CSSProperties                                 | -       |
| className    | className of container                   | string                                        | -       |
