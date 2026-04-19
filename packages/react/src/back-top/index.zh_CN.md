import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomDemo from './demo/Custom';
import CustomSource from './demo/Custom.tsx?raw';

# BackTop 返回顶部

返回页面顶部。

## 使用场景

- 当页面内容很长时。
- 当需要频繁返回顶部查看内容时。

## 使用方式

```jsx
import { BackTop } from '@tiny-design/react';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

基本示例。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 自定义触发器

使用自定义子元素替换默认按钮。

<DemoBlock component={CustomDemo} source={CustomSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性              | 说明                                                                      | 类型              | 默认值        |
| ----------------- | ------------------------------------------------------------------------- | ----------------- | ------------- |
| target            | 指定可滚动区域的 DOM 节点；未设置时会优先使用 `ConfigProvider.getTargetContainer()` | () => HTMLElement &#124; Window | provider target container |
| visibilityHeight  | 滚动高度达到此值时才出现 `BackTop` 按钮                                   | number            | 300           |
| onClick           | 点击按钮时的回调                                                          | () => void        | -             |
| style	            | 容器的样式对象                                                            | CSSProperties     | -             |
| className	        | 容器的类名                                                                | string            | -             |
