import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import BlurredDemo from './demo/Blurred';
import BlurredSource from './demo/Blurred.tsx?raw';
import MaskTypesDemo from './demo/MaskTypes';
import MaskTypesSource from './demo/MaskTypes.tsx?raw';
import CustomContentDemo from './demo/CustomContent';
import CustomContentSource from './demo/CustomContent.tsx?raw';

# Overlay

A mask layer that covers the page content.

## Scenario

When you need a mask layer to cover the page content, such as when displaying a modal dialog, drawer, or any floating panel that requires a backdrop. **Overlay** provides a low-level building block with fade animation, scroll locking, and multiple mask types.

## Usage

```jsx
import { Overlay } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Basic overlay with a default mask.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Mask Types

Overlay supports three mask types: `default`, `inverted`, and `none`.

<DemoBlock component={MaskTypesDemo} source={MaskTypesSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Blurred

Overlay with a blurred backdrop effect.

<DemoBlock component={BlurredDemo} source={BlurredSource} />

    </Demo>
    <Demo>

### Custom Content

Overlay can wrap any custom content rendered above the mask.

<DemoBlock component={CustomContentDemo} source={CustomContentSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property       | Description                                    | Type                                                          | Default   |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------- | --------- |
| isShow         | whether the overlay is visible                 | boolean                                                       | false     |
| blurred        | whether to apply a blurred backdrop effect     | boolean                                                       | false     |
| unmountOnExit  | whether to unmount when hidden                 | boolean                                                       | true      |
| zIndex         | z-index of the overlay                         | number                                                        | 1000      |
| type           | mask type                                      | enum: `default` &#124; `inverted` &#124; `none`               | `default` |
| clickCallback  | callback when the overlay is clicked           | (e: MouseEvent) => void                                       | -         |
| onEnter        | callback before enter transition starts        | () => void                                                    | -         |
| onEntered      | callback after enter transition finishes       | () => void                                                    | -         |
| onExit         | callback before exit transition starts         | () => void                                                    | -         |
| onExited       | callback after exit transition finishes        | () => void                                                    | -         |
| children       | content rendered inside the overlay            | ReactNode                                                     | -         |
| style          | style object of container                      | CSSProperties                                                 | -         |
| className      | className of container                         | string                                                        | -         |