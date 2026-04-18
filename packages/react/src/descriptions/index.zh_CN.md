import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import BorderDemo from './demo/Border';
import BorderSource from './demo/Border.tsx?raw';
import EmptyHiddenDemo from './demo/EmptyHidden';
import EmptyHiddenSource from './demo/EmptyHidden.tsx?raw';
import RenderAlignDemo from './demo/RenderAlign';
import RenderAlignSource from './demo/RenderAlign.tsx?raw';
import SemanticDemo from './demo/Semantic';
import SemanticSource from './demo/Semantic.tsx?raw';
import SeparatorDemo from './demo/Separator';
import SeparatorSource from './demo/Separator.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import VerticalBorderDemo from './demo/VerticalBorder';
import VerticalBorderSource from './demo/VerticalBorder.tsx?raw';

# Descriptions 描述列表

以响应式列布局展示成组只读字段。

## 使用场景

适合元数据、发布信息、系统详情等需要稳定节奏的只读信息展示。

## 使用方式

```jsx
import { Descriptions } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

使用 children API，并带有标题、操作区和底部信息。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 带边框

带边框且使用 table 语义的对齐详情展示。

<DemoBlock component={BorderDemo} source={BorderSource} />

    </Demo>
    <Demo>

### 尺寸

使用 `items` 数据驱动，并根据断点自动调整列数。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### 分隔符

当默认冒号不够明显时，可以用 `separator` 自定义标签与内容之间的关系。

<DemoBlock component={SeparatorDemo} source={SeparatorSource} />

    </Demo>
    <Demo>

### 空值与隐藏

使用 `empty` 统一空值占位，使用 `hidden` 移除不应展示的行。

<DemoBlock component={EmptyHiddenDemo} source={EmptyHiddenSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 垂直布局

适合编辑性更强的摘要信息展示。

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### 垂直带边框

适合审计、审批等结构化信息。

<DemoBlock component={VerticalBorderDemo} source={VerticalBorderSource} />

    </Demo>
    <Demo>

### 语义模式

对比 `semantic="list"` 和 `semantic="table"` 的展示差异。

<DemoBlock component={SemanticDemo} source={SemanticSource} />

    </Demo>
    <Demo>

### 渲染与对齐

使用 `labelRender`、`contentRender`、`labelAlign`、`contentAlign` 控制呈现方式。

<DemoBlock component={RenderAlignDemo} source={RenderAlignSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Descriptions

| 属性          | 说明                                          | 类型                                  | 默认值        |
| ------------- | --------------------------------------------- | ------------------------------------- | ------------- |
| title         | 头部标题                                      | ReactNode                             | -             |
| extra         | 头部操作区                                    | ReactNode                             | -             |
| footer        | 底部内容                                      | ReactNode                             | -             |
| bordered      | 是否显示边框                                  | boolean                               | false         |
| columns       | 逻辑列数或响应式列数配置                      | `number` &#124; `{ xs?; sm?; md?; lg?; xl?; xxl? }` | `3` |
| size	        | 组件尺寸                                      | enum: `sm` &#124; `md` &#124; `lg`    | `md`          |
| layout	    | 描述布局方式                                  | enum: `horizontal` &#124; `vertical`  | `horizontal`  |
| colon	        | 是否显示冒号                                  | boolean                               | `!bordered`   |
| separator     | 自定义标签与内容之间的分隔符                  | ReactNode                             | `:` 或无      |
| items         | 数据驱动项                                    | `DescriptionsItemType[]`              | -             |
| empty         | 空内容占位                                    | ReactNode                             | `-`           |
| semantic      | 语义渲染方式                                  | enum: `auto` &#124; `table` &#124; `list` | `auto` |
| labelAlign    | 标签对齐方式                                  | enum: `start` &#124; `center` &#124; `end` | `start` |
| contentAlign  | 内容对齐方式                                  | enum: `start` &#124; `center` &#124; `end` | `start` |
| labelRender   | 自定义标签渲染                                | `(item, index) => ReactNode`          | -             |
| contentRender | 自定义内容渲染                                | `(item, index) => ReactNode`          | -             |

### Descriptions.Item

| 属性          | 说明                                  | 类型              | 默认值    |
| ------------- | ------------------------------------- | ----------------- | --------- |
| label         | 标签内容                              | ReactNode         | -         |
| span          | 跨越的逻辑列数                        | `number` &#124; `'fill'` | `1` |
| hidden        | 是否隐藏该项                          | boolean           | false     |
| extra         | 标签旁的补充内容                      | ReactNode         | -         |

## 说明

- `columns` 表示逻辑列数，不是最终渲染出来的 DOM 单元格数量。
- `span="fill"` 会占满当前行剩余空间。
- 同时传入 `items` 和 `children` 时，优先使用 `items`。
- `semantic="auto"` 会在 `bordered` 时使用 `table`，其他情况使用 `list`。
