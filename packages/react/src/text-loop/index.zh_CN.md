import BasicDemo from './demo/basic';
import BasicSource from './demo/basic.tsx?raw';

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
  </Column>
</Layout>

## API

| Property     | Description                              | Type                                          | Default |
| ------------ | ---------------------------------------- | --------------------------------------------- | ------- |
| interval     | time each item stays visible (ms)        | number                                        | 3000    |
| pauseOnHover | pause cycling on hover                   | boolean                                       | true    |
| infinite     | loop infinitely or stop after one cycle  | boolean                                       | true    |
| direction    | cycling direction                        | `up` \| `down` \| `left` \| `right`           | `up`    |
| style        | style object of container                | CSSProperties                                 | -       |
| className    | className of container                   | string                                        | -       |
