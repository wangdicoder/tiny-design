import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import BlurredDemo from './demo/Blurred';
import BlurredSource from './demo/Blurred.tsx?raw';
import MaskTypesDemo from './demo/MaskTypes';
import MaskTypesSource from './demo/MaskTypes.tsx?raw';
import CustomContentDemo from './demo/CustomContent';
import CustomContentSource from './demo/CustomContent.tsx?raw';

# Overlay 遮罩层

覆盖页面内容的遮罩层。

## 使用场景

当你需要一个遮罩层来覆盖页面内容时，例如显示模态对话框、抽屉或任何需要背景遮罩的浮层。**Overlay** 提供了一个低级构建块，具有淡入淡出动画、滚动锁定和多种遮罩类型。

## 引入方式

```jsx
import { Overlay } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础用法

带有默认遮罩的基础遮罩层。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 遮罩类型

遮罩层支持三种类型：`default`、`inverted` 和 `none`。

<DemoBlock component={MaskTypesDemo} source={MaskTypesSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 模糊背景

带有模糊背景效果的遮罩层。

<DemoBlock component={BlurredDemo} source={BlurredSource} />

    </Demo>
    <Demo>

### 自定义内容

遮罩层可以包裹任意自定义内容并显示在遮罩上方。

<DemoBlock component={CustomContentDemo} source={CustomContentSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性           | 说明                                       | 类型                                                          | 默认值    |
| -------------- | ------------------------------------------ | ------------------------------------------------------------- | --------- |
| isShow         | 遮罩层是否可见                             | boolean                                                       | false     |
| blurred        | 是否应用模糊背景效果                       | boolean                                                       | false     |
| unmountOnExit  | 隐藏时是否卸载                             | boolean                                                       | true      |
| zIndex         | 遮罩层的 z-index                           | number                                                        | 1000      |
| type           | 遮罩类型                                   | enum: `default` &#124; `inverted` &#124; `none`               | `default` |
| clickCallback  | 点击遮罩层时的回调                         | (e: MouseEvent) => void                                       | -         |
| onEnter        | 进入过渡开始前的回调                       | () => void                                                    | -         |
| onEntered      | 进入过渡结束后的回调                       | () => void                                                    | -         |
| onExit         | 退出过渡开始前的回调                       | () => void                                                    | -         |
| onExited       | 退出过渡结束后的回调                       | () => void                                                    | -         |
| children       | 遮罩层内渲染的内容                         | ReactNode                                                     | -         |
| style          | 容器的样式对象                             | CSSProperties                                                 | -         |
| className      | 容器的类名                                 | string                                                        | -         |