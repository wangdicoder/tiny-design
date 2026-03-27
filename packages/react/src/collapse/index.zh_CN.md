import AccordionDemo from './demo/Accordion';
import AccordionSource from './demo/Accordion.tsx?raw';
import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import BorderlessDemo from './demo/Borderless';
import BorderlessSource from './demo/Borderless.tsx?raw';
import DeletableDemo from './demo/Deletable';
import DeletableSource from './demo/Deletable.tsx?raw';
import ExtraDemo from './demo/Extra';
import ExtraSource from './demo/Extra.tsx?raw';
import NestedDemo from './demo/Nested';
import NestedSource from './demo/Nested.tsx?raw';

# Collapse 折叠面板

可以折叠/展开的内容区域。

## 使用场景

可用于对复杂区域进行分组或隐藏，保持页面简洁。

`Accordion`（手风琴）是一种特殊的 `Collapse`，同一时间只允许展开一个面板。

## 使用方式

```jsx
import { Collapse } from 'tiny-design';

const { Panel } = Collapse;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本折叠

默认情况下，可以同时展开任意数量的面板。此示例中第一个面板是展开的。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 手风琴

同一时间只能展开一个面板。

<DemoBlock component={AccordionDemo} source={AccordionSource} />

    </Demo>
    <Demo>

### 嵌套面板

`Collapse` 可以嵌套在 `Collapse` 内部。

<DemoBlock component={NestedDemo} source={NestedSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 无边框

无边框样式的折叠面板。

<DemoBlock component={BorderlessDemo} source={BorderlessSource} />

    </Demo>
    <Demo>

### 可删除

面板可以被删除。

<DemoBlock component={DeletableDemo} source={DeletableSource} />

    </Demo>
    <Demo>

### 额外内容

使用 `extra` 属性在面板头部角落添加额外元素。

<DemoBlock component={ExtraDemo} source={ExtraSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Collapse

| 属性              | 说明                                                  | 类型                              | 默认值    |
| ----------------- | ----------------------------------------------------- | --------------------------------- | --------- |
| defaultActiveKey  | 初始展开的面板                                        | string &#124; string[]            | []        |
| activeKey         | 当前展开面板的 key                                    | string &#124; string[]            | -         |
| accordion         | 手风琴模式                                            | boolean                           | false     |
| deletable         | 面板可删除                                            | boolean                           | false     |
| showArrow         | 显示箭头图标                                          | boolean                           | true      |
| bordered          | 在折叠区域周围渲染边框                                | boolean                           | true      |
| onChange          | 展开面板变化时的回调函数                              | (keys: string | string[]) => void | -         |

### Collapse.Panel

| 属性              | 说明                                          | 类型                              | 默认值    |
| ----------------- | --------------------------------------------- | --------------------------------- | --------- |
| itemKey           | 面板的唯一标识 key                            | string                            | -         |
| header            | 面板标题                                      | ReactNode                         | -         |
| disabled          | 设为 true 时面板无法展开或折叠                | boolean                           | -         |
| extra             | 角落的额外元素                                | ReactNode                         | -         |
| deletable         | 面板是否可删除                                | boolean                           | -         |
| showArrow         | 显示箭头图标                                  | boolean                           | -         |
| onHeaderOnClick   | 点击头部时的回调                              | (e: React.MouseEvent) => void     | -         |