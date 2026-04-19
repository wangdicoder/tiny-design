import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DirectionDemo from './demo/Direction';
import DirectionSource from './demo/Direction.tsx?raw';

# Flip 翻转

一个可以展示正反两面内容的翻转盒子。

## 使用场景

如果某个内容附带次要信息，可以将主要内容展示在正面，辅助信息展示在背面。

## 使用方式

```jsx
import { Flip } from '@tiny-design/react';

const { Item } = Flip;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础用法

基础翻转盒

> **翻转盒的宽度和高度必须设置**

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 方向

通过 `direction` 和 `reverse` 可以控制翻转方向。

<DemoBlock component={DirectionDemo} source={DirectionSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性      | 说明                  | 类型                                    | 默认值       |
| --------- | --------------------- | --------------------------------------- | ------------ |
| width     | 容器宽度              | number &#124; string                    |              |
| height    | 容器高度              | number &#124; string                    |              |
| direction | 翻转方向              | enum: `horizontal` &#124; `vertical`    | `horizontal` |
| reverse   | 反转方向              | boolean                                 | false        |