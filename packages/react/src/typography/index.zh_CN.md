import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import HeadingDemo from './demo/Heading';
import HeadingSource from './demo/Heading.tsx?raw';
import TextDemo from './demo/Text';
import TextSource from './demo/Text.tsx?raw';
import AdvancedDemo from './demo/Advanced';
import AdvancedSource from './demo/Advanced.tsx?raw';

# Typography 文字排版

基本的文字排版，包括标题、正文、列表等。

## 使用场景

展示标题或段落内容。

## 使用方式

```jsx
import { Heading, Paragraph, Text } from 'tiny-design';
```

兼容写法：

```jsx
import { Typography } from 'tiny-design';

const { Heading, Paragraph, Text } = Typography;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本使用

展示文档示例。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 标题

展示不同级别的标题。

<DemoBlock component={HeadingDemo} source={HeadingSource} />

    </Demo>
    <Demo>

### 文本

HTML 包含多个用于定义具有特殊意义的文本的元素。`Text` 组件为它们提供了包装器。

<DemoBlock component={TextDemo} source={TextSource} />

    </Demo>
    <Demo>

### 高级用法

在信息密集场景中使用语义色、复制能力和省略展示。

<DemoBlock component={AdvancedDemo} source={AdvancedSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Typography

| 属性  | 说明              | 类型          | 默认值 |
| --------- | ------------------------ | ------------- | ------- |
| as        | 渲染的块级标签       | `'p' \| 'div' \| 'blockquote'` | `'p'` |
| ellipsis  | 文本省略展示          | `boolean \| { rows?: number; tooltip?: boolean \| ReactNode }` | - |
| children  | 内容                  | ReactNode     | -       |
| style     | 容器的样式对象| CSSProperties | -       |
| className | 容器的 className   | string        | -       |

### Heading

| 属性  | 说明                      | 类型          | 默认值 |
| --------- | -------------------------------- | ------------- | ------- |
| level     | 标题级别，1 到 6      | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | 1       |
| children  | 内容                          | ReactNode     | -       |
| style     | 容器的样式对象        | CSSProperties | -       |
| className | 容器的 className           | string        | -       |

### Paragraph

| 属性  | 说明              | 类型          | 默认值 |
| --------- | ------------------------ | ------------- | ------- |
| children  | 内容                  | ReactNode     | -       |
| style     | 容器的样式对象| CSSProperties | -       |
| className | 容器的 className   | string        | -       |

### Text

| 属性  | 说明                     | 类型          | 默认值 |
| --------- | ------------------------------- | ------------- | ------- |
| as        | 渲染的行内标签                  | `'span' \| 'label' \| 'small' \| 'strong' \| 'em' \| 'i' \| 'b' \| 'mark' \| 'kbd' \| 'time'` | `'span'` |
| type      | 文本语义颜色                    | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| copyable  | 内置复制操作                    | `boolean \| { text?: string; onCopy?: (copied, text) => void; icon?: ReactNode; copiedIcon?: ReactNode; resetDuration?: number }` | - |
| ellipsis  | 文本省略展示                    | `boolean \| { rows?: number; tooltip?: boolean \| ReactNode }` | - |
| code      | 代码样式                      | boolean       | false   |
| del       | 删除线样式   | boolean       | false   |
| underline | 下划线样式                 | boolean       | false   |
| strong    | 加粗样式                      | boolean       | false   |
| italic    | 斜体样式                    | boolean       | false   |
| mark      | 标记（高亮）样式      | boolean       | false   |
| sub       | 下标样式                 | boolean       | false   |
| sup       | 上标样式               | boolean       | false   |
| children  | 内容                         | ReactNode     | -       |
| style     | 容器的样式对象       | CSSProperties | -       |
| className | 容器的 className          | string        | -       |
