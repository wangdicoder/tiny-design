import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import BlurDemo from './demo/Blur';
import BlurSource from './demo/Blur.tsx?raw';
import ContainerDemo from './demo/Container';
import ContainerSource from './demo/Container.tsx?raw';
import IndicatorDemo from './demo/Indicator';
import IndicatorSource from './demo/Indicator.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import StateDemo from './demo/State';
import StateSource from './demo/State.tsx?raw';
import TipsDemo from './demo/Tips';
import TipsSource from './demo/Tips.tsx?raw';

# Loader

A spinner for displaying loading state of a page or a section.

## Scenario

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## Usage

```jsx
import { Loader } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A simple loading status.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Inside a container

A Loader in a container.

<DemoBlock component={ContainerDemo} source={ContainerSource} />

    </Demo>
    <Demo>

### Customized description

Customized description content.

<DemoBlock component={TipsDemo} source={TipsSource} />

    </Demo>
    <Demo>

### Custom spinning indicator

Use custom loading indicator.

<DemoBlock component={IndicatorDemo} source={IndicatorSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Size

There are three different sizes of the loader.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### Loading state

Control the loading state.

<DemoBlock component={StateDemo} source={StateSource} />

    </Demo>
    <Demo>

### Blur the container

Use `blurred` to control the container overlay.

<DemoBlock component={BlurDemo} source={BlurSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property          | Description                                           | Type                                  | Default   |
| ----------------- | ----------------------------------------------------- | ------------------------------------- | --------- |
| indicator         | customise the spinning indicator                      | ReactNode                             | -         |
| size              | loader size                                           | enum: `sm` &#124; `md` &#124; `lg`    | `md`      |
| loading           | loading status                                        | boolean                               | true      |
| tip               | customize description content when Spin has children  | string                                | -         |
| vertical          | vertical the content                                  | boolean                               | false     |
| blurred           | determine whether blur the loading background         | boolean                               | false     |
