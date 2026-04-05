import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomDemo from './demo/Custom';
import CustomSource from './demo/Custom.tsx?raw';

# BackTop

Go back to the top of the page.

## When To Use

- When the page content is very long.
- When you need to go back to the top very frequently in order to view the contents.

## Usage

```jsx
import { BackTop } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic example.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Custom Trigger

Use custom children to replace the default button.

<DemoBlock component={CustomDemo} source={CustomSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property          | Description                                                                   | Type              | Default       |
| ----------------- | ----------------------------------------------------------------------------- | ----------------- | ------------- |
| target            | Specifies the scrollable area dom node. Defaults to `ConfigProvider.getTargetContainer()` when available. | () => HTMLElement &#124; Window | provider target container |
| visibilityHeight  | The `BackTop` button will not show until the scroll height reaches this value | number            | 300           |
| onClick           | A callback function, which can be executed when you click the button          | () => void        | -             |
| style	            | Style object of container	object                                              | CSSProperties     | -             |
| className	        | ClassName of container                                                        | string            | -             |
