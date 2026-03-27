import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import HeadingDemo from './demo/Heading';
import HeadingSource from './demo/Heading.tsx?raw';
import TextDemo from './demo/Text';
import TextSource from './demo/Text.tsx?raw';

# Typography

Basic text writing, including headings, body text, lists, and more.

## Scenario

Display a title or paragraph contents.

## Usage

```jsx
import { Typography } from 'tiny-design';

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
  </Column>
</Layout>

## Props

### Typography

| Property  | Description              | Type          | Default |
| --------- | ------------------------ | ------------- | ------- |
| children  | content                  | ReactNode     | -       |
| style     | style object of container| CSSProperties | -       |
| className | className of container   | string        | -       |

### Typography.Heading

| Property  | Description                      | Type          | Default |
| --------- | -------------------------------- | ------------- | ------- |
| level     | heading level, 1 through 6      | number        | 1       |
| children  | content                          | ReactNode     | -       |
| style     | style object of container        | CSSProperties | -       |
| className | className of container           | string        | -       |

### Typography.Paragraph

| Property  | Description              | Type          | Default |
| --------- | ------------------------ | ------------- | ------- |
| children  | content                  | ReactNode     | -       |
| style     | style object of container| CSSProperties | -       |
| className | className of container   | string        | -       |

### Typography.Text

| Property  | Description                     | Type          | Default |
| --------- | ------------------------------- | ------------- | ------- |
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
