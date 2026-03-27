import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';

# Keyboard 键盘按键

键盘样式按钮。

## 使用场景

- 展示键盘操作。

## 引入方式

```jsx
import { Keyboard } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

简单的用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
  <Column>
  </Column>
</Layout>

## API

| 属性      | 说明                 | 类型          | 默认值  |
| --------- | -------------------- | ------------- | ------- |
| children  | 键盘按键标签         | ReactNode     | -       |
| style     | 容器的样式对象       | CSSProperties | -       |
| className | 容器的类名           | string        | -       |
