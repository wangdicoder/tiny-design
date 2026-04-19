import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ActiveDemo from './demo/Active';
import ActiveSource from './demo/Active.tsx?raw';
import CombinationDemo from './demo/Combination';
import CombinationSource from './demo/Combination.tsx?raw';
import LoadingDemo from './demo/Loading';
import LoadingSource from './demo/Loading.tsx?raw';
import ComposedDemo from './demo/Composed';
import ComposedSource from './demo/Composed.tsx?raw';

# Skeleton

Provide a placeholder while the content is loading.

## Scenario

- When a resource needs long time to load.
- When the component contains lots of information, such as List or Card.
- Only works when loading data for the first time.

## Usage

```jsx
import { Skeleton } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Simplest Skeleton usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Animation

Switch between `shimmer` and `pulse` to compare the two animation styles.

<DemoBlock component={ActiveDemo} source={ActiveSource} />

    </Demo>
    <Demo>

### Structured Skeleton

A structured loading placeholder.

> Consider using `<ConfigProvider skeleton={{ animation: 'shimmer' }} />` to set skeleton animation globally.

<DemoBlock component={CombinationDemo} source={CombinationSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Loading Switch

Use `loading` to switch between the skeleton state and the real content.

<DemoBlock component={LoadingDemo} source={LoadingSource} />

    </Demo>
    <Demo>

### Composed Blocks

Use `Skeleton.Block`, `Skeleton.Text`, and `Skeleton.Avatar` to build custom loading layouts.

<DemoBlock component={ComposedDemo} source={ComposedSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property          | Description                                       | Type                              | Default   |
| ----------------- | ------------------------------------------------- | --------------------------------- | --------- |
| loading           | render skeleton or `children`                     | boolean                           | true      |
| shape             | base skeleton shape                               | `rect` \| `round` \| `circle`     | `round`   |
| width             | base skeleton width                               | string \| number                  | -         |
| height            | base skeleton height                              | string \| number                  | -         |
| animation         | animation style                                   | boolean \| `pulse` \| `shimmer`   | -         |
| avatar            | render avatar skeleton or pass avatar config      | boolean \| object                 | false     |
| title             | render title skeleton or pass title config        | boolean \| object                 | false     |
| paragraph         | render paragraph skeleton or pass paragraph config | boolean \| object                | false     |

## Subcomponents

- `Skeleton.Block`: low-level placeholder block with `shape`, `width`, `height`, and `animation`
- `Skeleton.Text`: text skeleton with `rows` and `widths`
- `Skeleton.Avatar`: avatar skeleton with `shape` and `size`
