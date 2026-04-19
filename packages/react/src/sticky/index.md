import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ContainerDemo from './demo/Container';
import ContainerSource from './demo/Container.tsx?raw';
import CallbackDemo from './demo/Callback';
import CallbackSource from './demo/Callback.tsx?raw';

# Sticky

Wrap around another component to make it stick the viewport.

## Scenario

On longer web pages, its helpful for some content to stick to the viewport. This is common for menus and actions.

## Usage

```jsx
import { Sticky } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

The simplest usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Container to scroll

Set a target for `Sticky`, which is listen to scroll event of target element (default is `window`).

<DemoBlock component={ContainerDemo} source={ContainerSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Callback

Callback with affixed state.

<DemoBlock component={CallbackDemo} source={CallbackSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property          | Description                                   | Type                          | Default       |
| ----------------- | --------------------------------------------- | ----------------------------- | ------------- |
| offsetBottom      | offset from the bottom of the viewport.       | number                        | 0             |
| offsetTop         | offset from the top of the viewport.          | number                        | -             |
| container         | specifies the scrollable area DOM node.       | () => HTMLElement             | () => window  |
| onChange          | callback for when sticky state is changed.    | (stuck: boolean) => void     | -             |

**Note: ** Children of `Sticky` must not have the property `position: absolute`.