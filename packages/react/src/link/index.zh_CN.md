import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import UnderlineDemo from './demo/Underline';
import UnderlineSource from './demo/Underline.tsx?raw';
import ExternalDemo from './demo/External';
import ExternalSource from './demo/External.tsx?raw';

# Link 链接

## 使用场景

展示一个超链接。该组件样式上类似超链接，语义上渲染为 `<a>` 标签。

## 使用方式

```jsx
import { Link } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础用法

简单用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 下划线

默认情况下，鼠标悬停时会有下划线样式，可以设置为不显示。

<DemoBlock component={UnderlineDemo} source={UnderlineSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 禁用

禁用状态。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### 外链

默认点击会在新窗口打开。设置 `external={false}` 可以在当前窗口打开。

<DemoBlock component={ExternalDemo} source={ExternalSource} />

    </Demo>
  </Column>
</Layout>

## Props

`Link` 组件继承了所有 `<a>` 标签的属性，以下是额外的属性。

| 属性          | 说明                                                               | 类型          | 默认值 |
| ----------------- | ------------------------------------------------------------------------- | ------------- | ------- |
| disabled          | 禁用超链接操作                                              | boolean       | false   |
| underline         | 鼠标悬停时是否显示下划线样式    | boolean       | true    |
| external          | 点击后是否在新窗口中打开                 | boolean       | true    |
| style	            | 容器的样式对象                                          |               | -       |
| className	        | 容器的 className                                                    | string        | -       |