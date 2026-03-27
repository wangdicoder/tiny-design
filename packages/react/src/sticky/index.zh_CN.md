import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ContainerDemo from './demo/Container';
import ContainerSource from './demo/Container.tsx?raw';
import CallbackDemo from './demo/Callback';
import CallbackSource from './demo/Callback.tsx?raw';

# Sticky 粘性布局

包裹其他组件使其固定在视口中。

## 使用场景

在较长的网页中，某些内容固定在视口中会很有帮助。这常见于菜单和操作栏。

## 引入方式

```jsx
import { Sticky } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础

最简单的用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 滚动容器

设置 `Sticky` 的目标元素，它将监听目标元素的滚动事件（默认为 `window`）。

<DemoBlock component={ContainerDemo} source={ContainerSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 回调

固定状态改变时的回调函数。

<DemoBlock component={CallbackDemo} source={CallbackSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性              | 说明                                  | 类型                          | 默认值        |
| ----------------- | ------------------------------------- | ----------------------------- | ------------- |
| offsetBottom      | 距离视口底部的偏移量                  | number                        | 0             |
| offsetTop         | 距离视口顶部的偏移量                  | number                        | -             |
| container         | 指定可滚动区域的 DOM 节点            | () => HTMLElement             | () => window  |
| onChange          | 固定状态改变时的回调                  | (stuck: boolean) => void     | -             |

**注意：** `Sticky` 的子元素不能设置 `position: absolute` 属性。