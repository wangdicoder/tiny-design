import AlignTitleDemo from './demo/AlignTitle';
import AlignTitleSource from './demo/AlignTitle.tsx?raw';
import ContentSectionDemo from './demo/ContentSection';
import ContentSectionSource from './demo/ContentSection.tsx?raw';
import HorizontalDemo from './demo/Horizontal';
import HorizontalSource from './demo/Horizontal.tsx?raw';
import PlainAndGapDemo from './demo/PlainAndGap';
import PlainAndGapSource from './demo/PlainAndGap.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';

# Divider 分割线

分割线用于区隔不同的内容。

## 使用场景

- 对文章的不同章节进行分隔。
- 对行内文字和链接进行分隔，例如表格的操作列。

## 使用方式

```jsx
import { Divider } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 水平分割线

分割线默认为水平。水平分割线支持中间文字、线型变体和弱化标题样式。

<DemoBlock component={HorizontalDemo} source={HorizontalSource} />

    </Demo>
    <Demo>

### 垂直分割线

使用 `orientation="vertical"` 使其垂直。

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### 弱化标题与间距

使用 `plain` 降低标题强调度，使用 `titleGap` 调整标题与线之间的间距。

<DemoBlock component={PlainAndGapDemo} source={PlainAndGapSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 对齐标题

设置分割线标题的位置，可选 `start`、`center`、`end`，默认为 `center`。仅对带文本的水平分割线生效。

<DemoBlock component={AlignTitleDemo} source={AlignTitleSource} />

    </Demo>
    <Demo>

### 内容分组

在卡片、设置面板或摘要信息中，分割线也可以作为轻量级分组标题使用。

<DemoBlock component={ContentSectionDemo} source={ContentSectionSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性           | 说明                                           | 类型                                          | 默认值        |
| -------------- | ---------------------------------------------- | --------------------------------------------- | ------------- |
| orientation    | 分割线方向                                     | enum: `horizontal` &#124; `vertical`          | `horizontal`  |
| variant        | 分割线样式变体                                 | enum: `solid` &#124; `dashed` &#124; `dotted` | `solid`       |
| titlePlacement | 带文本的水平分割线中标题的位置                 | enum: `start` &#124; `center` &#124; `end`    | `center`      |
| plain          | 是否使用弱化的标题样式                         | boolean                                       | false         |
| titleGap       | 分割线标题与线之间的水平间距                   | string &#124; number                          | token 值      |
| style          | 容器的样式对象                                 | CSSProperties                                 | -             |
| className      | 容器的 className                               | string                                        | -             |
