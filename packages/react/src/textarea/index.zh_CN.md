import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CountDemo from './demo/Count';
import CountSource from './demo/Count.tsx?raw';

# Textarea

用于多行文本输入。

## 使用场景

评论等场景。

## 引入方式

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
  </Column>
  <Column>
    <Demo>

### 限制与计数

使用 `limit` 限制字符数量。也可以使用 `counter` 自定义计数节点。

<DemoBlock component={CountDemo} source={CountSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性         | 说明                     | 类型                                         | 默认值  |
| ------------ | -------------------------------- | -------------------------------------------- | ------- |
| defaultValue | 默认值                   | string                                       |         |
| value        | 值                       | string                                       |         |
| onChange     | 文本域 onChange 回调     | function: (value, event) => void             |         |
| rows         | 行数                     | number                                       |         |
| limit        | 字符数量限制             | number                                       | false   |
| counter      | 自定义计数节点           | function: (count: number) => React.ReactNode |         |
| disabled     | 是否禁用组件             | boolean                                      |         |
| style	       | 容器的样式对象           |                                              |         |
| className    | 容器的类名               | string                                       |         |