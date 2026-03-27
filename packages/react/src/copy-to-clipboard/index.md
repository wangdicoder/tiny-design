import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import UseInputDemo from './demo/UseInput';
import UseInputSource from './demo/UseInput.tsx?raw';

# Copy To Clipboard

## Scenario

A component to handle copying contents to the clipboard.

## Usage

```jsx
import { CopyToClipboard } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Copy from input

<DemoBlock component={UseInputDemo} source={UseInputSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property  | Description                           | Type              | Default   |
| --------- | ------------------------------------- | ----------------- | --------- |
| text      | copied contents                       | string            | -         |
| onClick   | callback when clicking the contents   | React.MouseEvent  | -         |
| style	    | style object of container	object      | CSSProperties     | -         |
| className	| className of container                | string            | -         |