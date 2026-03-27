import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import BorderDemo from './demo/Border';
import BorderSource from './demo/Border.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import VerticalBorderDemo from './demo/VerticalBorder';
import VerticalBorderSource from './demo/VerticalBorder.tsx?raw';

# Descriptions 描述列表

成组展示多个只读字段。

## 使用场景

常用于详情页的信息展示。

## 使用方式

```jsx
import { Descriptions } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

简单的用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 带边框

带边框的描述列表。

<DemoBlock component={BorderDemo} source={BorderSource} />

    </Demo>
    <Demo>

### 尺寸

适应各种容器的尺寸。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 垂直布局

垂直布局。

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### 垂直带边框

垂直布局带边框。

<DemoBlock component={VerticalBorderDemo} source={VerticalBorderSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Descriptions

| 属性          | 说明                                          | 类型                                  | 默认值        |
| ------------- | --------------------------------------------- | ------------------------------------- | ------------- |
| title         | 描述列表的标题                                | ReactNode                             | -             |
| bordered      | 是否显示边框                                  | boolean                               | false         |
| column        | 每行 `Descriptions.Items` 的数量              | number                                | 3             |
| size	        | 设置 `Descriptions` 的尺寸                    | enum: `sm` &#124; `md` &#124; `lg`    | `md`          |
| layout	    | 描述布局方式                                  | enum: `horizontal` &#124; `vertical`  | `horizontal`  |
| colon	        | 是否显示冒号                                  | boolean                               | -             |

### Descriptions.Item

| 属性          | 说明                                  | 类型              | 默认值    |
| ------------- | ------------------------------------- | ----------------- | --------- |
| label         | 内容的标签描述                        | ReactNode         | -         |
| span          | 包含的列数                            | number            | 1         |