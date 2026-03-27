import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import NoBorderDemo from './demo/NoBorder';
import NoBorderSource from './demo/NoBorder.tsx?raw';
import SimpleDemo from './demo/Simple';
import SimpleSource from './demo/Simple.tsx?raw';
import HoverableDemo from './demo/Hoverable';
import HoverableSource from './demo/Hoverable.tsx?raw';
import ActiveDemo from './demo/Active';
import ActiveSource from './demo/Active.tsx?raw';
import InnerCardDemo from './demo/InnerCard';
import InnerCardSource from './demo/InnerCard.tsx?raw';
import ImageDemo from './demo/Image';
import ImageSource from './demo/Image.tsx?raw';

# Card 卡片

简洁的矩形容器。

## 使用场景

卡片可用于展示与某一主题相关的内容。内容可以由多种不同类型和大小的元素组成。

## 使用方式

```jsx
import { Card } from 'tiny-design';

const { Content } = Card;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本卡片

包含标题、内容和右上角额外内容的基本卡片。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 无边框

灰色背景上的无边框卡片。

<DemoBlock component={NoBorderDemo} source={NoBorderSource} />

    </Demo>
    <Demo>

### 简洁卡片

只包含内容区域的简洁卡片。

<DemoBlock component={SimpleDemo} source={SimpleSource} />

    </Demo>
    <Demo>

### 悬停效果

设置 `hoverable` 使卡片具有悬停效果。

<DemoBlock component={HoverableDemo} source={HoverableSource} />

    </Demo>
    <Demo>

### 激活状态

设置 `active` 使卡片始终显示阴影效果。

<DemoBlock component={ActiveDemo} source={ActiveSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 内部卡片

可以放置在普通卡片内部来展示多级结构的信息。

<DemoBlock component={InnerCardDemo} source={InnerCardSource} />

    </Demo>
    <Demo>

### 媒体卡片

使用图片来增强内容的卡片。

<DemoBlock component={ImageDemo} source={ImageSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性        | 说明                                         | 类型                     | 默认值  |
| ----------- | -------------------------------------------- | ------------------------ | ------- |
| title       | 卡片标题                                     | ReactNode                | -       |
| extra       | 右上角额外内容                               | ReactNode                | -       |
| hoverable   | 鼠标悬停时浮起                               | boolean                  | false   |
| active      | 显示带有阴影的卡片                           | boolean                  | false   |
| bordered    | 是否显示边框                                 | boolean                  | true    |
| actions     | 卡片底部的操作列表                           | ReactNode[]              | -       |
| header      | 自定义头部内容                               | ReactNode                | -       |
| footer      | 自定义底部内容                               | ReactNode                | -       |
| headerStyle | 头部容器的行内样式                           | CSSProperties            | -       |
| bodyStyle   | 内容容器的行内样式                           | CSSProperties            | -       |
| footerStyle | 底部容器的行内样式                           | CSSProperties            | -       |
| style       | 容器样式对象                                 | CSSProperties            | -       |
| className   | 容器的 className                             | string                   | -       |