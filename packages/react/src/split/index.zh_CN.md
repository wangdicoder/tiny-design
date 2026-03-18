import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import HorizontalDemo from './demo/Horizontal';
import HorizontalSource from './demo/Horizontal.tsx?raw';
import NestDemo from './demo/Nest';
import NestSource from './demo/Nest.tsx?raw';
import StepDemo from './demo/Step';
import StepSource from './demo/Step.tsx?raw';
import MultipleDemo from './demo/Multiple';
import MultipleSource from './demo/Multiple.tsx?raw';

# Split

将一个面板分割为两部分，可以通过拖拽调整宽度或高度。

## 使用场景

当有多个内容需要同时展示，但其中一些需要更多空间来显示时使用。

## 引入方式

```jsx
import { Split } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 垂直分割

上 & 下。

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### 水平分割

左 & 右。

<DemoBlock component={HorizontalDemo} source={HorizontalSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 嵌套

可以嵌套使用。

<DemoBlock component={NestDemo} source={NestSource} />

    </Demo>
    <Demo>

### 步长

允许按一定距离移动。

<DemoBlock component={StepDemo} source={StepSource} />

    </Demo>
    <Demo>

### 多个面板

多个分割面板。

<DemoBlock component={MultipleDemo} source={MultipleSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性          | 说明                               | 类型                                  | 默认值       |
| ----------------- | ----------------------------------------- | ------------------------------------- | ------------- |
| mode              | 分割模式                                | enum: `horizontal` &#124; `vertical`  | `vertical`    |
| disabled          | 是否禁用	                            | boolean                               | false         |
| min               | 目标面板的最小宽度/高度 | number &#124; string                  | 50            |
| max               | 目标面板的最大宽度/高度 | number &#124; string                  | 50            |
| size              | 目标面板的尺寸                       | number &#124; string                  | -             |
| defaultSize       | 目标面板的默认尺寸               | number &#124; string                  | -             |
| step              | 拖拽步长                                 | number                                | -             |
| resizerProps      | 调整器属性                             | JSX.IntrinsicElements['div']          | -             |
| resizerSize       | 调整器尺寸                              | number                                | 6             |
| onChange          | 尺寸变化时的回调            | (size: number) => void                | -             |
| onDragStarted     | 调整器开始拖拽时的回调 | () => void                            | -             |
| onDragFinished    | 调整器结束拖拽时的回调   | () => void                            | -             |