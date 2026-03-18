import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomisedFooterDemo from './demo/CustomisedFooter';
import CustomisedFooterSource from './demo/CustomisedFooter.tsx?raw';
import PositionDemo from './demo/Position';
import PositionSource from './demo/Position.tsx?raw';
import AnimationDemo from './demo/Animation';
import AnimationSource from './demo/Animation.tsx?raw';

# Modal

模态对话框。

## 使用场景

当需要用户与应用进行交互，但又不希望跳转到新页面打断用户工作流程时，可以使用 **Modal** 在当前页面上创建一个新的浮层，以获取用户反馈或展示信息。

## 引入方式

```jsx
import { Modal } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

简单的模态对话框。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 自定义底部

更复杂的例子，自定义底部按钮栏，点击提交按钮后对话框会进入加载状态，加载完成后自动关闭。
如果不需要默认的底部按钮，可以设置 `footer={null}`。

<DemoBlock component={CustomisedFooterDemo} source={CustomisedFooterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 自定义位置

使用 `centered` 或 `top` 等属性设置对话框位置。

<DemoBlock component={PositionDemo} source={PositionSource} />

    </Demo>
    <Demo>

### 动画

使用 `animation` 设置不同的弹出动画。

<DemoBlock component={AnimationDemo} source={AnimationSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性               | 说明                                       | 类型                                              | 默认值    |
| ------------------ | ------------------------------------------ | ------------------------------------------------- | --------- |
| visible            | 对话框是否可见                             | boolean                                           | false     |
| header             | 对话框头部内容                             | ReactNode                                         | -         |
| footer             | 对话框底部内容                             | ReactNode                                         | -         |
| width              | 对话框宽度                                 | number &#124; string                              | 520       |
| centered           | 是否垂直居中显示                           | boolean                                           | false     |
| closable           | 是否显示关闭按钮                           | boolean                                           | true      |
| unmountOnClose     | 关闭时是否卸载子组件                       | boolean                                           | true      |
| afterClose         | 关闭动画结束后的回调                       | () => void                                        | -         |
| maskType           | 遮罩层类型                                 | enum: `default` &#124; `blurred` &#124; `inverted` &#124; `none` | `default` |
| maskClosable       | 点击遮罩层是否关闭对话框                   | boolean                                           | true      |
| confirmLoading     | 确认按钮是否处于加载状态                   | boolean                                           | false     |
| onConfirm          | 确认按钮的回调                             | (e: MouseEvent) => void                           | -         |
| onCancel           | 取消按钮的回调                             | (e: MouseEvent) => void                           | -         |
| onClose            | 关闭按钮的回调                             | (e: MouseEvent) => void                           | -         |
| confirmText        | 确认按钮文本                               | string                                            | `OK`      |
| cancelText         | 取消按钮文本                               | string                                            | `Cancel`  |
| confirmButtonProps | 传递给确认按钮的属性                       | ButtonProps                                       | -         |
| cancelButtonProps  | 传递给取消按钮的属性                       | ButtonProps                                       | -         |
| animation          | 动画类型                                   | enum: `slide` &#124; `scale`                      | `slide`   |
| top                | 距离视口顶部的距离                         | number                                            | 100       |
| zIndex             | 对话框的 z-index                           | number                                            | -         |
| headerStyle        | 头部的内联样式                             | CSSProperties                                     | -         |
| bodyStyle          | 主体的内联样式                             | CSSProperties                                     | -         |
| footerStyle        | 底部的内联样式                             | CSSProperties                                     | -         |
| maskStyle          | 遮罩层的内联样式                           | CSSProperties                                     | -         |
| style              | 容器的样式对象                             | CSSProperties                                     | -         |
| className          | 容器的类名                                 | string                                            | -         |