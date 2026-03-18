import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';

# Keyboard

A keyboard style button.

## Scenario

- show keyboard operation.

## Usage

```jsx
import { Keyboard } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A simple usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
  <Column>
  </Column>
</Layout>

## API

| Property  | Description              | Type          | Default |
| --------- | ------------------------ | ------------- | ------- |
| children  | keyboard key label       | ReactNode     | -       |
| style     | style object of container| CSSProperties | -       |
| className | className of container   | string        | -       |

