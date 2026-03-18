import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ClosableDemo from './demo/Closable';
import ClosableSource from './demo/Closable.tsx?raw';
import CloseBtnDemo from './demo/CloseBtn';
import CloseBtnSource from './demo/CloseBtn.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import TitleDemo from './demo/Title';
import TitleSource from './demo/Title.tsx?raw';
import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';

# Alert

警告提示组件，用于页面中展示重要的提示信息。

## 使用场景

- 当需要向用户显示警告提示信息时。
- 当需要一个持久的静态容器，且用户可以手动关闭时。

## 引入方式

```jsx
import { Alert } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

最简单的用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 可关闭

显示关闭按钮，允许用户关闭警报。关闭时会有平滑的卸载动画。

<DemoBlock component={ClosableDemo} source={ClosableSource} />

    </Demo>
    <Demo>

### 图标

使用图标可以使信息更清晰、更友好。使用 `iconSize` 设置默认图标大小。也可以通过传入元素来自定义图标。

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 类型

警报有四种类型：`success`、`info`、`warning`、`error`。默认类型是 **`info`**。

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
    <Demo>

### 标题

添加标题。

<DemoBlock component={TitleDemo} source={TitleSource} />

    </Demo>
    <Demo>

### 自定义关闭文字

用自定义文字替换默认图标。

<DemoBlock component={CloseBtnDemo} source={CloseBtnSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性       | 说明                                           | 类型                                                                     | 默认值  |
| ---------- | ---------------------------------------------- | ------------------------------------------------------------------------ | ------- |
| title      | 警告提示标题                                   | string &#124; ReactNode                                                  | -       |
| type       | 警告提示类型                                   | enum: `success` &#124; `info` &#124; `warning` &#124; `error`           | `info`  |
| icon       | 是否显示图标或自定义图标                       | boolean &#124; ReactNode                                                 | -       |
| iconSize   | 图标大小                                       | number                                                                   | -       |
| closable   | 是否可关闭                                     | boolean                                                                  | false   |
| closeText  | 自定义关闭按钮文本                             | ReactNode                                                                | -       |
| afterClose | 关闭动画结束后的回调                           | () => void                                                               | -       |
| onClose    | 关闭按钮的回调                                 | (e: MouseEvent) => void                                                  | -       |
| style      | 容器的样式对象                                 | CSSProperties                                                            | -       |
| className  | 容器的类名                                     | string                                                                   | -       |