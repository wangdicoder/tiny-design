import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeAndColorDemo from './demo/SizeAndColor';
import SizeAndColorSource from './demo/SizeAndColor.tsx?raw';
import SpinDemo from './demo/Spin';
import SpinSource from './demo/Spin.tsx?raw';
import SvgIconList from './demo/svg-icons.tsx'

# Icon

SVG icon components from `@tiny-design/icons`. Each icon is its own module, so bundlers can tree-shake unused icons.

## Usage

```bash
$ pnpm add @tiny-design/icons
```
<br />

```jsx
import { IconClose, IconPlus } from '@tiny-design/icons';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Import individual SVG icon components. Each icon is tree-shakeable.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Spin

Use the `withSpin` HOC to create a spinning variant of any icon. Useful for loading indicators.

<DemoBlock component={SpinDemo} source={SpinSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Size & Color

Use `size` and `color` props to customize icons.

<DemoBlock component={SizeAndColorDemo} source={SizeAndColorSource} />

    </Demo>
  </Column>
</Layout>

## API

All icon components share the same props interface (`IconProps`), which extends `SVGAttributes<SVGSVGElement>`.

| Property  | Description                   | Type              | Default         |
| --------- | ----------------------------- | ----------------- | --------------- |
| size      | icon size (width & height)    | string \| number  | `'1em'`         |
| color     | icon fill color               | string            | `'currentColor'`|
| className | CSS class name                | string            | -               |
| style     | inline styles                 | CSSProperties     | -               |
| ref       | forwarded ref                 | Ref\<SVGSVGElement\> | -            |

### withSpin

A higher-order component that wraps any icon to add a continuous spin animation.

```jsx
import { withSpin } from '@tiny-design/react';
import { IconLoader } from '@tiny-design/icons';

const SpinLoader = withSpin(IconLoader);

<SpinLoader size={24} />
```

## List of icons

<SvgIconList />