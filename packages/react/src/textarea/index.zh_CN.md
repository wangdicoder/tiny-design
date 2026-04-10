import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CountDemo from './demo/Count';
import CountSource from './demo/Count.tsx?raw';
import ResizeDemo from './demo/Resize';
import ResizeSource from './demo/Resize.tsx?raw';

# Textarea 文本域

用于多行文本输入。

## 使用场景

评论等场景。

## 使用方式

```jsx
import { Textarea } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

简单的文本域。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 缩放

使用 `resizable` 控制文本域是否仅支持垂直方向缩放。使用 `resizeHandle` 可替换默认缩放手柄。

<DemoBlock component={ResizeDemo} source={ResizeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 限制与计数

使用 `limit` 限制字符数量。也可以使用 `counter` 自定义计数节点。

<DemoBlock component={CountDemo} source={CountSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性         | 说明                     | 类型                                         | 默认值  |
| ------------ | -------------------------------- | -------------------------------------------- | ------- |
| defaultValue | 默认值                   | string                                       |         |
| value        | 值                       | string                                       |         |
| onChange     | 文本域 onChange 回调     | function: (value, event) => void             |         |
| rows         | 行数                     | number                                       |         |
| limit        | 字符数量限制             | number                                       | false   |
| counter      | 自定义计数节点           | function: (count: number) => React.ReactNode |         |
| disabled     | 是否禁用组件             | boolean                                      |         |
| resizable    | 是否可缩放               | boolean                                      | true    |
| resizeHandle | 自定义缩放手柄           | React.ReactNode                              |         |
| style	       | 容器的样式对象           |                                              |         |
| className    | 容器的类名               | string                                       |         |
