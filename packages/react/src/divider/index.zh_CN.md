import AlignTitleDemo from './demo/AlignTitle';
import AlignTitleSource from './demo/AlignTitle.tsx?raw';
import HorizontalDemo from './demo/Horizontal';
import HorizontalSource from './demo/Horizontal.tsx?raw';
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

分割线默认类型为 `horizontal`。支持在分割线内添加文字。

<DemoBlock component={HorizontalDemo} source={HorizontalSource} />

    </Demo>
    <Demo>

### 垂直分割线

使用 `type="vertical"` 使其垂直。

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 对齐标题

设置分割线标题的位置，默认为 `center`。

<DemoBlock component={AlignTitleDemo} source={AlignTitleSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性  | 说明                      | 类型                                           | 默认值      |
| --------- | -------------------------------- | ---------------------------------------------- | ------------ |
| type      | 分割线方向类型        | enum: `horizontal` &#124; `vertical`           | `horizontal` |
| dashed    | 是否为虚线           | boolean                                        | false        |
| align     | 分割线中标题的位置 | enum: `left` &#124; `right` &#124; `center`    | `center`     |
| style	    | 容器的样式对象 | CSSProperties                                  | -            |
| className	| 容器的 className           | string                                         | -            |