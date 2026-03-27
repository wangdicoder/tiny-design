import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomisedDemo from './demo/Customised';
import CustomisedSource from './demo/Customised.tsx?raw';
import NoDescDemo from './demo/NoDesc';
import NoDescSource from './demo/NoDesc.tsx?raw';

# Empty

Empty state placeholder.

## Scenario

- When there is no data provided, display for friendly tips.
- User tutorial to create something in fresh new situation.

## Usage

```jsx
import { Empty } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Simplest Usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Customised

Customize image source, image size, description and extra content.

<DemoBlock component={CustomisedDemo} source={CustomisedSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### No description

Set `description={false}` to hide description.

<DemoBlock component={NoDescDemo} source={NoDescSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property    | Description            | Type                                         | Default |
| ----------- | ---------------------- | -------------------------------------------- | ------- |
| image       | Customised image       | string &#124; ReactNode                      | -       |
| imageStyle  | style of image         | CSSProperties                                | -       |
| description | Customised description | boolean &#124; string &#124; React.ReactNode | -       |
| descStyle	  | style of description   | CSSProperties                                | -       |