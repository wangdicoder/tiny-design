import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomisedDemo from './demo/Customised';
import CustomisedSource from './demo/Customised.tsx?raw';
import NoDescDemo from './demo/NoDesc';
import NoDescSource from './demo/NoDesc.tsx?raw';

# Empty 空状态

空状态占位符。

## 使用场景

- 当没有数据时，展示友好的提示信息。
- 在全新的场景中，引导用户创建内容。

## 使用方式

```jsx
import { Empty } from '@tiny-design/react';
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

### 自定义

自定义图片、尺寸、描述和额外内容。

<DemoBlock component={CustomisedDemo} source={CustomisedSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 无描述

设置 `description={false}` 隐藏描述。

<DemoBlock component={NoDescDemo} source={NoDescSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性        | 说明                 | 类型                                         | 默认值  |
| ----------- | -------------------- | -------------------------------------------- | ------- |
| image       | 自定义图片           | string &#124; ReactNode                      | -       |
| imageStyle  | 图片样式             | CSSProperties                                | -       |
| description | 自定义描述内容       | boolean &#124; string &#124; React.ReactNode | -       |
| descStyle	  | 描述文本的样式       | CSSProperties                                | -       |