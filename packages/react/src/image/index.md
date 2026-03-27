import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import RoundDemo from './demo/Round';
import RoundSource from './demo/Round.tsx?raw';
import LazyDemo from './demo/Lazy';
import LazySource from './demo/Lazy.tsx?raw';
import FallbackDemo from './demo/Fallback';
import FallbackSource from './demo/Fallback.tsx?raw';

# Image

The Image component is used to display images.

## Scenario

Display an image.

## Usage

```jsx
import { Image } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic usage displaying an image.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Size

The size of the image can be adjusted using the `width` and `height` prop.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Rounded Image

Display a rounded image.

<DemoBlock component={RoundDemo} source={RoundSource} />

    </Demo>
    <Demo>

### Lazy Load

Set `lazy` and `placehoulder` properties to implement the lazy load.

<DemoBlock component={LazyDemo} source={LazySource} />

    </Demo>
    <Demo>

### Fallback

Providing a fallback image for when there is an error loading the src of the image.

<DemoBlock component={FallbackDemo} source={FallbackSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property      | Description                               | Type                  | Default   |
| ------------- | ----------------------------------------- | --------------------- | --------- |
| src           | The path to the image source              | string                | -         |
| alt           | The alt text that describes the image     | string                | -         |
| placeholder   | Used when lazy loading                    | string                | -         |
| width         | Image width                               | string &#124; number  | -         |
| height        | Image height                              | string &#124; number  | -         |
| round         | Rounded image                             | boolean               | false     |
| lazy          | Determine the image lazy loads            | boolean               | false     |
| fallback      | Image placeholder when an error loading   | string                | -         |
| objectFit     | Image fit mode                            |                       | -         |
| style	        | Style object of container object          |                       | -         |
| className	    | ClassName of container                    | string                | -         |