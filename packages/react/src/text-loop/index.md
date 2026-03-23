import BasicDemo from './demo/basic';
import BasicSource from './demo/basic.tsx?raw';

# TextLoop

Cycle through a set of children one at a time with a slide transition.

## Scenario

- Loop through notification messages in a banner.
- Rotate through tips or announcements.

## Usage

```jsx
import { TextLoop } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Cycles through children vertically every 3 seconds. Pauses on hover.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property     | Description                              | Type                                          | Default |
| ------------ | ---------------------------------------- | --------------------------------------------- | ------- |
| interval     | time each item stays visible (ms)        | number                                        | 3000    |
| pauseOnHover | pause cycling on hover                   | boolean                                       | true    |
| infinite     | loop infinitely or stop after one cycle  | boolean                                       | true    |
| direction    | cycling direction                        | `up` \| `down` \| `left` \| `right`           | `up`    |
| style        | style object of container                | CSSProperties                                 | -       |
| className    | className of container                   | string                                        | -       |
