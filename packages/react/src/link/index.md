import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import UnderlineDemo from './demo/Underline';
import UnderlineSource from './demo/Underline.tsx?raw';
import ExternalDemo from './demo/External';
import ExternalSource from './demo/External.tsx?raw';

# Link

## Scenario

Display a hyperlink. This component is styled to resemble a hyperlink and semantically renders an `<a>`.

## Usage

```jsx
import { Link } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A simple usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Underline

By default, there is an underline style when hovering a link, but it can be removed.

<DemoBlock component={UnderlineDemo} source={UnderlineSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Disabled

Disabled state of link.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### External

It will open a new window when clicking the link by default. Set `external={false}` to open the link in the current window.

<DemoBlock component={ExternalDemo} source={ExternalSource} />

    </Demo>
  </Column>
</Layout>

## Props

`Link` component inherit all `<a>` properties. There are extra properties.

| Property          | Description                                                               | Type          | Default |
| ----------------- | ------------------------------------------------------------------------- | ------------- | ------- |
| disabled          | disable the hyperlink action                                              | boolean       | false   |
| underline         | determine whether display a underline style when hovering on the label    | boolean       | true    |
| external          | determine whether open a new window or not after clicking                 | boolean       | true    |
| style	            | style object of container object                                          |               | -       |
| className	        | className of container                                                    | string        | -       |