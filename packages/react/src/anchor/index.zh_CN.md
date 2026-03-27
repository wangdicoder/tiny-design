import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import NestedDemo from './demo/Nested';
import NestedSource from './demo/Nested.tsx?raw';
import AffixDemo from './demo/Affix';
import AffixSource from './demo/Affix.tsx?raw';
import OffsetTopDemo from './demo/OffsetTop';
import OffsetTopSource from './demo/OffsetTop.tsx?raw';

# Anchor 锚点

用于跳转到页面指定位置的锚点。

## 使用场景

- 需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。
- 滚动时自动追踪当前可见区域。

## 使用方式

```jsx
import { Anchor } from 'tiny-design';
```

## 示例

<Layout>
  <Column>
    <Demo>

### 基本用法

可滚动的容器上的锚点。点击链接滚动到对应章节；滚动页面可以看到高亮的链接更新。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 固定

设置 `affix` 开启固定定位模式。

<DemoBlock component={AffixDemo} source={AffixSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 嵌套链接

锚点支持嵌套 `Anchor.Link` 用于多级导航。当任何子链接激活时，父链接也会高亮。

<DemoBlock component={NestedDemo} source={NestedSource} />

    </Demo>
    <Demo>

### 偏移量

使用 `offsetTop` 设置距离顶部的像素阈值。只有当章节顶部边缘超过偏移量时，章节才会被标记为激活。

<DemoBlock component={OffsetTopDemo} source={OffsetTopSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Anchor

| 属性         | 说明                               | 类型                                                                       | 默认值       |
| ------------ | ---------------------------------- | -------------------------------------------------------------------------- | ------------ |
| type         | 指示器风格                         | 'dot' \| 'line'                                                            | dot          |
| affix        | 是否使用固钉模式                   | boolean                                                                    | false        |
| offsetTop    | 距离窗口顶部达到指定偏移量后触发   | number                                                                     | 0            |
| offsetBottom | 距离窗口底部达到指定偏移量后触发   | number                                                                     | -            |
| getContainer | 指定滚动的容器                     | () => HTMLElement                                                          | () => window |
| onChange     | 监听锚点链接改变                   | (currentActiveLink: string) => void                                        | -            |
| onClick      | 点击链接时的回调                   | (e: MouseEvent, link: \{ title: string; href: string \}) => void            | -            |

### Anchor.Link

| 属性     | 说明               | 类型            | 默认值  |
| -------- | ------------------ | --------------- | ------- |
| href     | 锚点链接           | string          | -       |
| title    | 文字内容           | string          | -       |
| children | 嵌套的 Anchor.Link | Anchor.Link[]   | -       |