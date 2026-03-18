import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import SeparatorDemo from './demo/Separator';
import SeparatorSource from './demo/Separator.tsx?raw';

# Breadcrumb

面包屑导航显示当前页面在层级结构中的位置。它允许用户返回到层级中更高的级别。

## 使用场景

- 当系统的层级结构超过两层时。
- 当需要告知用户当前所在位置时。
- 当用户可能需要导航回上一层级时。
- 当应用具有多层架构时。

## 引入方式

```js
import { Breadcrumb } from 'tiny-design';

const { Item } = Breadcrumb;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

最简单的用法

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 分隔符

自定义分隔符符号。

<DemoBlock component={SeparatorDemo} source={SeparatorSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 带图标

使用图标替换文本或组合。

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性          | 说明                                               | 类型              | 默认值       |
| ----------------- | --------------------------------------------------------- | ----------------- | ------------- |
| separator         | 自定义分隔符                                      | ReactNode         | '/'           |