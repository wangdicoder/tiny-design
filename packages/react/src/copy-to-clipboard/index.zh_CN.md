import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import UseInputDemo from './demo/UseInput';
import UseInputSource from './demo/UseInput.tsx?raw';

# Copy To Clipboard

## 使用场景

用于处理将内容复制到剪贴板的组件。

## 引入方式

```jsx
import { CopyToClipboard } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 从输入框复制

<DemoBlock component={UseInputDemo} source={UseInputSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性      | 说明                          | 类型              | 默认值    |
| --------- | ----------------------------- | ----------------- | --------- |
| text      | 复制的内容                    | string            | -         |
| onClick   | 点击内容时的回调              | React.MouseEvent  | -         |
| style	    | 容器的样式对象                | CSSProperties     | -         |
| className	| 容器的类名                    | string            | -         |