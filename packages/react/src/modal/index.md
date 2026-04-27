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
import ContextRegisterDemo from './demo/ContextRegister';
import ContextRegisterSource from './demo/ContextRegister.tsx?raw';

# Modal

Modal dialogs.

## Scenario

When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use **Modal** to create a new floating layer over the current page to get user feedback or display information.

## Usage

```jsx
import { Modal } from '@tiny-design/react';
```

## Static Methods

Use `Modal.open()` or `Modal.confirm()` when the dialog needs to be triggered imperatively outside the local React tree.

```jsx
const instance = Modal.open({
  header: 'Delete item',
  children: 'This action cannot be undone.',
});

instance.update({
  confirmLoading: true,
});

instance.destroy();
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

Manage multiple modals by ID with `Modal.Provider` and `Modal.useModal`. Trigger components subscribe with `Modal.useModalActions()` to avoid re-rendering on visibility changes.

<DemoBlock component={ContextDemo} source={ContextSource} />

    </Demo>
    <Demo>

### Registered modals with awaitable result

Register a modal once with `Modal.Register` (or `store.register`), then call `show(id, props)` from anywhere. `show` returns a promise that resolves with the value passed to `hide(result)`, so you can `await` the user's choice. Inside the registered component, `Modal.useModalSelf()` exposes `props`, `visible`, `hide`, and `remove`.

<DemoBlock component={ContextRegisterDemo} source={ContextRegisterSource} />

    </Demo>
  </Column>
</Layout>

## Context API

`Modal.Provider` wires children to a `ModalStore`. Two patterns coexist:

- **Manual mount** — render modals yourself and read state with `useModal(id)`.
- **Registered** — register a component with an id, then trigger it imperatively with `useModalActions().show(id, props)` and read its own state with `useModalSelf()` from inside the component.

### Choosing a store

`<Modal.Provider>` accepts an optional `store` prop. If you don't pass one, it falls back to the package-level `Modal.store` singleton — convenient for trivial apps with a single provider, but every provider that omits `store` shares the same state. Two providers backed by the singleton both subscribe to the same registry, so any registered modal renders **once per provider** (you'll see duplicate overlays). They also see each other's `show()` calls.

In practice, create your own store with `createModalStore()` and pass it explicitly. Use the singleton only when you specifically need to trigger modals from outside React.

```jsx
import { Modal, createModalStore } from '@tiny-design/react';

function App() {
  const store = useMemo(() => createModalStore(), []);
  return (
    <Modal.Provider store={store}>
      {/* … */}
    </Modal.Provider>
  );
}
```

Reach for `createModalStore()` whenever you need an isolated store: app-level providers, unit tests, SSR per-request stores, or independent modal trees on the same page.

### Reference

| Export                        | Type                                                                | Description                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `Modal.Provider`              | `({ store?, children }) => Element`                                 | Provides a store to descendants and renders the outlet for registered modals. Defaults to the `Modal.store` singleton — see above.       |
| `Modal.Register`              | `({ id, component }) => null`                                       | Declarative registration. Registers on mount, unregisters on unmount.                                                                    |
| `Modal.useModal(id)`          | `(id) => { visible, show, close, toggle }`                          | Per-id state hook. Re-renders only when this id's visibility flips. Use with manually mounted modals.                                    |
| `Modal.useModalActions()`     | `() => { show, hide, hideAll, register }`                           | Imperative actions. Does not subscribe to state — components calling this never re-render on open/close.                                 |
| `Modal.useModalSelf<P, R>()`  | `() => { id, visible, props, hide, reject, remove }`                | Read this modal's own state from inside a registered component. Throws if used outside the outlet.                                       |
| `Modal.store`                 | `ModalStore`                                                        | Process-wide singleton store. Use **only** to trigger modals from outside React (route guards, error handlers). Inside React, prefer `useModalActions`. |
| `createModalStore()`          | `() => ModalStore` _(named import from `@tiny-design/react`)_       | Create an isolated store. Recommended for app-level providers, tests, SSR per-request stores, and independent modal trees.               |

### `ModalStore`

| Method                          | Description                                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `register(id, component)`       | Register a component. Returns an unregister function.                                                             |
| `show<R, P>(id, props?)`        | Open a modal. Returns a promise that resolves with the value passed to `hide(result)`.                            |
| `hide(id, result?)`             | Close a modal and resolve its pending promise. Modal stays mounted until `afterClose` fires `remove`.             |
| `remove(id)`                    | Hard-remove the record from the store. Drains a still-pending resolver with `undefined`.                          |
| `hideAll()`                     | Hide every visible modal; resolves their pending promises with `undefined`.                                        |
| `getState()` / `subscribe(fn)`  | Low-level state access for custom integrations.                                                                   |

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

## StaticModalProps

`Modal.open()` and `Modal.confirm()` accept the same props as `Modal`, except `visible` is managed internally.
