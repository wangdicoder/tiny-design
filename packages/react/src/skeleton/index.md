import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ActiveDemo from './demo/Active';
import ActiveSource from './demo/Active.tsx?raw';
import CombinationDemo from './demo/Combination';
import CombinationSource from './demo/Combination.tsx?raw';

# Skeleton

Provide a placeholder while the content is loading.

## Scenario

- When a resource needs long time to load.
- When the component contains lots of information, such as List or Card.
- Only works when loading data for the first time.

## Usage

```jsx
import { Skeleton } from 'tiny-design';
```

## Examples

<Demo>

### Basic

Simplest Skeleton usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

</Demo>
<Demo>

### Active

Set `active={true}` to activate the Shimmer effect.

<DemoBlock component={ActiveDemo} source={ActiveSource} />

</Demo>
<Demo>

### Combination

A complex example.

> Consider using `<ConfigProvider/>` to set `active` prop in once.

<DemoBlock component={CombinationDemo} source={CombinationSource} />

</Demo>

## Props

| Property          | Description                                       | Type                          | Default   |
| ----------------- | ------------------------------------------------- | ----------------------------- | --------- |
| active            | turn on Shimmer effect.                           | boolean                       | false     |
| rounded           | display a circle skeleton                         | boolean                       | false     |