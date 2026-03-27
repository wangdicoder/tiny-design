import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import AlignDemo from './demo/Align';
import AlignSource from './demo/Align.tsx?raw';

# Space 间距

设置组件之间的间距。

## 使用场景

避免组件紧贴在一起，设置统一的间距。

## 使用方式

```jsx
import { Space } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础用法

水平排列组件。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 间距大小

预设三种间距大小。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 垂直方向

垂直排列组件。

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### 对齐方式

设置对齐方式。

<DemoBlock component={AlignDemo} source={AlignSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性  | 说明       | 类型                                                          | 默认值       |
| --------- | ----------------- | ------------------------------------------------------------- | ------------- |
| align     | 对齐方式       | enum: `start` &#124; `end` &#124; `center` &#124; `baseline`  | `center`      |
| direction | 间距方向	| enum: `horizontal` &#124; `vertical`                          | `horizontal`  |
| size      | 间距大小        | enum: `sm` &#124; `md` &#124; `lg` &#124; `number`            | `sm`          |