import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DirectionDemo from './demo/Direction';
import DirectionSource from './demo/Direction.tsx?raw';

# Flip

A flip box which can display two side content.

## Scenario

If one thing with extra content which is not important, you can display the main the content on the front side and satellite information showing on the back side.

## Usage

```jsx
import { Flip } from 'tiny-design';

const { Item } = Flip;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic flip

> **The flip's width and height must be set**

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Direction

`direction` and `reverse` can make the flip different.

<DemoBlock component={DirectionDemo} source={DirectionSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property  | Description             | Type                                    | Default      |
| --------- | ----------------------- | --------------------------------------- | ------------ |
| width     | the container's width   | number &#124; string                    |              |
| height    | the container's height  | number &#124; string                    |              |
| direction | flip direction          | enum: `horizontal` &#124; `vertical`    | `horizontal` |
| reverse   | reverse direction       | boolean                                 | false        |