import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import HeadingDemo from './demo/Heading';
import HeadingSource from './demo/Heading.tsx?raw';
import TextDemo from './demo/Text';
import TextSource from './demo/Text.tsx?raw';
import AdvancedDemo from './demo/Advanced';
import AdvancedSource from './demo/Advanced.tsx?raw';

# Typography

Basic text writing, including headings, body text, lists, and more.

## Scenario

Display a title or paragraph contents.

## Usage

```jsx
import { Heading, Paragraph, Text } from '@tiny-design/react';
```

Equivalent compatibility usage:

```jsx
import { Typography } from '@tiny-design/react';

const { Heading, Paragraph, Text } = Typography;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Display the document sample.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Heading

Display title in different levels.

<DemoBlock component={HeadingDemo} source={HeadingSource} />

    </Demo>
    <Demo>

### Text

HTML contains several elements for defining text with a special meaning. `Text` component provides a wrapper for them.

<DemoBlock component={TextDemo} source={TextSource} />

    </Demo>
    <Demo>

### Advanced

Use semantic colors, copyable text, and ellipsis for dense interfaces.

<DemoBlock component={AdvancedDemo} source={AdvancedSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Typography

| Property  | Description              | Type          | Default |
| --------- | ------------------------ | ------------- | ------- |
| as        | rendered block tag       | `'p' \| 'div' \| 'blockquote'` | `'p'` |
| ellipsis  | truncate text content    | `boolean \| { rows?: number; tooltip?: boolean \| ReactNode }` | - |
| children  | content                  | ReactNode     | -       |
| style     | style object of container| CSSProperties | -       |
| className | className of container   | string        | -       |

### Heading

| Property  | Description                      | Type          | Default |
| --------- | -------------------------------- | ------------- | ------- |
| level     | heading level, 1 through 6      | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | 1       |
| children  | content                          | ReactNode     | -       |
| style     | style object of container        | CSSProperties | -       |
| className | className of container           | string        | -       |

### Paragraph

| Property  | Description              | Type          | Default |
| --------- | ------------------------ | ------------- | ------- |
| children  | content                  | ReactNode     | -       |
| style     | style object of container| CSSProperties | -       |
| className | className of container   | string        | -       |

### Text

| Property  | Description                     | Type          | Default |
| --------- | ------------------------------- | ------------- | ------- |
| as        | rendered inline tag             | `'span' \| 'label' \| 'small' \| 'strong' \| 'em' \| 'i' \| 'b' \| 'mark' \| 'kbd' \| 'time'` | `'span'` |
| type      | semantic text color            | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| copyable  | copy text content with built-in action | `boolean \| { text?: string; onCopy?: (copied, text) => void; icon?: ReactNode; copiedIcon?: ReactNode; resetDuration?: number }` | - |
| ellipsis  | truncate text content          | `boolean \| { rows?: number; tooltip?: boolean \| ReactNode }` | - |
| code      | code style                      | boolean       | false   |
| del       | deleted (strikethrough) style   | boolean       | false   |
| underline | underline style                 | boolean       | false   |
| strong    | bold style                      | boolean       | false   |
| italic    | italic style                    | boolean       | false   |
| mark      | marked (highlighted) style      | boolean       | false   |
| sub       | subscript style                 | boolean       | false   |
| sup       | superscript style               | boolean       | false   |
| children  | content                         | ReactNode     | -       |
| style     | style object of container       | CSSProperties | -       |
| className | className of container          | string        | -       |
