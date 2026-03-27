import VideoDemo from './demo/Video';
import VideoSource from './demo/Video.tsx?raw';
import ImageDemo from './demo/Image';
import ImageSource from './demo/Image.tsx?raw';
import MapDemo from './demo/Map';
import MapSource from './demo/Map.tsx?raw';

# Aspect Radio

An element describes the proportional relationship between its width and its height.

## Scenario

Used to embed responsive images, videos and maps, etc. It uses a very common [padding hack](https://css-tricks.com/aspect-ratio-boxes/) to achieve this.

## Usage

```jsx
import { AspectRatio } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Embed Video

A `4:3` video.

<DemoBlock component={VideoDemo} source={VideoSource} />

    </Demo>
    <Demo>

### Embed Map

A `16:9` map.

<DemoBlock component={MapDemo} source={MapSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Embed Image

A `ratio=1` image.

<DemoBlock component={ImageDemo} source={ImageSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property  | Description                       | Type                  | Default   |
| --------- | --------------------------------- | --------------------- | --------- |
| width     | The box width                     | number &#124; string  | -         |
| ratio     | The aspect ratio of the content   | number                | 1         |
| style	    | Style object of container	object  | CSSProperties         | -         |
| className	| ClassName of container            | string                | -         |