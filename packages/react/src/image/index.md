import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import RoundDemo from './demo/Round';
import RoundSource from './demo/Round.tsx?raw';
import LazyDemo from './demo/Lazy';
import LazySource from './demo/Lazy.tsx?raw';
import PlaceholderDemo from './demo/Placeholder';
import PlaceholderSource from './demo/Placeholder.tsx?raw';
import CustomFallbackDemo from './demo/CustomFallback';
import CustomFallbackSource from './demo/CustomFallback.tsx?raw';
import ImageStyleDemo from './demo/ImageStyle';
import ImageStyleSource from './demo/ImageStyle.tsx?raw';

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
    <Demo>

### Rounded Image

Display a rounded image.

<DemoBlock component={RoundDemo} source={RoundSource} />

    </Demo>
    <Demo>

### Custom Placeholder

Use `placeholder` to render skeletons or branded loading content.

<DemoBlock component={PlaceholderDemo} source={PlaceholderSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Custom Fallback

`fallback` accepts any ReactNode, not just another image URL.

<DemoBlock component={CustomFallbackDemo} source={CustomFallbackSource} />

    </Demo>
    <Demo>

### Interactive Props

Use `Radio`, `Select`, and `Switch` to adjust `objectFit`, focal point, and round mode.

<DemoBlock component={ImageStyleDemo} source={ImageStyleSource} />

    </Demo>
    <Demo>

### Lazy Load

Set `lazy` and `placeholder` to implement lazy loading. When `IntersectionObserver` is not available, the component falls back to eager loading.

<DemoBlock component={LazyDemo} source={LazySource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property | Description | Type | Default |
| ------------- | ----------------------------------------- | --------------------- | --------- |
| src | The path to the image source | string | - |
| alt | The alt text that describes the image | string | `''` |
| placeholder | Content rendered while loading or before a lazy image enters the viewport |ReactNode | - |
| width | Image container width | string &#124; number | - |
| height | Image container height | string &#124; number | - |
| round | Render as a circular image | boolean | false |
| lazy | Whether to lazy load the image | boolean | false |
| fallback | Fallback content rendered when the image fails to load | ReactNode | - |
| objectFit | Image fit mode | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `cover` |
| imageStyle | Style object for the native `img` element | CSSProperties | - |
| imageClassName | ClassName for the native `img` element | string | - |
| style | Style object of the container | CSSProperties | - |
| className | ClassName of the container | string | - |
