import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import GutterDemo from './demo/Gutter';
import GutterSource from './demo/Gutter.tsx?raw';
import OffsetDemo from './demo/Offset';
import OffsetSource from './demo/Offset.tsx?raw';
import OrderDemo from './demo/Order';
import OrderSource from './demo/Order.tsx?raw';
import AlignmentDemo from './demo/Alignment';
import AlignmentSource from './demo/Alignment.tsx?raw';
import ResponsiveDemo from './demo/Responsive';
import ResponsiveSource from './demo/Responsive.tsx?raw';

# Grid 栅格

通过基础的 24 列栅格系统，快速简便地创建布局。

## 引入方式

```jsx
import { Row, Col } from 'tiny-design';
```

## 代码示例

<Demo>

### 基本栅格

使用列创建基本栅格布局。

<DemoBlock component={BasicDemo} source={BasicSource} />

</Demo>
<Demo>

### 栅格间距

使用 `Row` 的 `gutter` 属性设置栅格间距。建议设为 `8n` px。（`n` 为正整数。）

<DemoBlock component={GutterDemo} source={GutterSource} />

</Demo>
<Demo>

### 栅格偏移

使用 `offset` 可以将列向右移动。

<DemoBlock component={OffsetDemo} source={OffsetSource} />

</Demo>
<Demo>

### 排序

使用 `order` 改变元素的排列顺序。

<DemoBlock component={OrderDemo} source={OrderSource} />

</Demo>
<Demo>

### 对齐

子元素垂直对齐。

<DemoBlock component={AlignmentDemo} source={AlignmentSource} />

</Demo>
<Demo>

### 响应式

列使用 `xs`、`sm`、`md`、`lg`、`xl`、`xxl` 响应视口宽度。调整浏览器大小以查看列重新排列。

<DemoBlock component={ResponsiveDemo} source={ResponsiveSource} />

</Demo>

## API

### Row

| 属性   | 说明                                                     | 类型                                                                                         | 默认值 |
| ---------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------- |
| gutter     | 栅格间隔                                           | number &#124; [number, number]                                                               | 0       |
| gutterSide | 间距包含首尾子元素                     | boolean                                                                                      | false   |
| align      | 垂直对齐方式                                              | enum: `top` &#124; `center` &#124; `bottom`                                                  | -       |
| justify    | 水平排列方式                                          | enum: `start` &#124; `end` &#124; `center` &#124; `space-around` &#124; `space-between`      | -       |
| style      | 容器的样式对象                                       | CSSProperties                                                                                | -       |
| className  | 容器的 className                                          | string                                                                                       | -       |

### Col

| 属性  | 说明                                      | 类型                                          | 默认值 |
| --------- | ------------------------------------------------ | --------------------------------------------- | ------- |
| span      | 栅格占位格数（共 24 格）            | number                                        | -       |
| offset    | 栅格左侧的偏移格数          | number                                        | 0       |
| order     | 栅格排列顺序                                  | number                                        | 0       |
| xs        | 屏幕 < 480px 时的配置或对象               | number &#124; \{ span, offset, order \}         | -       |
| sm        | 屏幕 >= 600px 时的配置或对象              | number &#124; \{ span, offset, order \}         | -       |
| md        | 屏幕 >= 840px 时的配置或对象              | number &#124; \{ span, offset, order \}         | -       |
| lg        | 屏幕 >= 960px 时的配置或对象              | number &#124; \{ span, offset, order \}         | -       |
| xl        | 屏幕 >= 1280px 时的配置或对象             | number &#124; \{ span, offset, order \}         | -       |
| xxl       | 屏幕 >= 1440px 时的配置或对象             | number &#124; \{ span, offset, order \}         | -       |
| style     | 容器的样式对象                        | CSSProperties                                 | -       |
| className | 容器的 className                           | string                                        | -       |