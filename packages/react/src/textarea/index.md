import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CountDemo from './demo/Count';
import CountSource from './demo/Count.tsx?raw';
import ResizeDemo from './demo/Resize';
import ResizeSource from './demo/Resize.tsx?raw';

# Textarea

For multi-line input.

## Scenario

Comments, etc.

## Usage

```jsx
import { Textarea } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A simple textarea.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Resize

Use `resizable` to control whether the textarea can be resized vertically. Use `resizeHandle` to replace the default resize handle.

<DemoBlock component={ResizeDemo} source={ResizeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Limit & count

Use `limit` to limit the word amount. Also you can use `counter` to customise limit node.

<DemoBlock component={CountDemo} source={CountSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property     | Description                      | Type                                         | Default |
| ------------ | -------------------------------- | -------------------------------------------- | ------- |
| defaultValue | default value                    | string                                       |         |
| value        | value                            | string                                       |         |
| onChange     | textarea onChange callback       | function: (value, event) => void             |         |
| rows         | rows                             | number                                       |         |
| limit        | limit the number of character    | number                                       | false   |
| counter      | customise the count node         | function: (count: number) => React.ReactNode |         |
| disabled     | disabled the component           | boolean                                      |         |
| resizable    | whether the textarea is resizable | boolean                                    | true    |
| resizeHandle | custom resize handle element     | React.ReactNode                              |         |
| style	       | style object of container object |                                              |         |
| className    | className of container           | string                                       |         |
