import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomisedFooterDemo from './demo/CustomisedFooter';
import CustomisedFooterSource from './demo/CustomisedFooter.tsx?raw';
import PositionDemo from './demo/Position';
import PositionSource from './demo/Position.tsx?raw';
import AnimationDemo from './demo/Animation';
import AnimationSource from './demo/Animation.tsx?raw';
import ContextDemo from './demo/Context';
import ContextSource from './demo/Context.tsx?raw';

# Modal

Modal dialogs.

## Scenario

When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use **Modal** to create a new floating layer over the current page to get user feedback or display information.

## Usage

```jsx
import { Modal } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Basic modal.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Customized Footer

A more complex example which define a customized footer button bar, the dialog will change to loading state after clicking submit button, when the loading is over, the modal dialog will be closed.
Set `footer={null}` if you don't need default footer buttons.

<DemoBlock component={CustomisedFooterDemo} source={CustomisedFooterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### To customize the position of modal

Use `centered` or `top` or other styles to set position of modal dialog.

<DemoBlock component={PositionDemo} source={PositionSource} />

    </Demo>
    <Demo>

### Animation

Use `animation` to set different popup animation.

<DemoBlock component={AnimationDemo} source={AnimationSource} />

    </Demo>
    <Demo>

### Context

Manage multiple modals by ID with `Modal.Provider` and `Modal.useModal`.

<DemoBlock component={ContextDemo} source={ContextSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property           | Description                                        | Type                                              | Default   |
| ------------------ | -------------------------------------------------- | ------------------------------------------------- | --------- |
| visible            | whether the modal is visible                       | boolean                                           | false     |
| header             | modal header content                               | ReactNode                                         | -         |
| footer             | modal footer content                               | ReactNode                                         | -         |
| width              | width of the modal dialog                          | number &#124; string                              | 520       |
| centered           | vertically center the modal                        | boolean                                           | false     |
| closable           | whether a close button is visible                  | boolean                                           | true      |
| unmountOnClose     | whether to unmount children on close               | boolean                                           | true      |
| afterClose         | callback when close animation is finished          | () => void                                        | -         |
| maskType           | overlay mask type                                  | enum: `default` &#124; `blurred` &#124; `inverted` &#124; `none` | `default` |
| maskClosable       | whether clicking the mask closes the modal         | boolean                                           | true      |
| confirmLoading     | whether the confirm button is loading              | boolean                                           | false     |
| onConfirm          | confirm button callback                            | (e: MouseEvent) => void                           | -         |
| onCancel           | cancel button callback                             | (e: MouseEvent) => void                           | -         |
| onClose            | close button callback                              | (e: MouseEvent) => void                           | -         |
| confirmText        | text of confirm button                             | string                                            | `OK`      |
| cancelText         | text of cancel button                              | string                                            | `Cancel`  |
| confirmButtonProps | props passed to the confirm button                 | ButtonProps                                       | -         |
| cancelButtonProps  | props passed to the cancel button                  | ButtonProps                                       | -         |
| animation          | animation type                                     | enum: `slide` &#124; `scale`                      | `slide`   |
| top                | distance from the top of the viewport              | number                                            | 100       |
| zIndex             | z-index of the modal                               | number                                            | -         |
| headerStyle        | inline style of the header                         | CSSProperties                                     | -         |
| bodyStyle          | inline style of the body                           | CSSProperties                                     | -         |
| footerStyle        | inline style of the footer                         | CSSProperties                                     | -         |
| maskStyle          | inline style of the mask                           | CSSProperties                                     | -         |
| style              | style object of container                          | CSSProperties                                     | -         |
| className          | className of container                             | string                                            | -         |