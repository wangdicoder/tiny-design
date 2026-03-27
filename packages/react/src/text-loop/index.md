import BasicDemo from './demo/basic';
import BasicSource from './demo/basic.tsx?raw';
import AlertBannerDemo from './demo/alert-banner';
import AlertBannerSource from './demo/alert-banner.tsx?raw';
import DirectionDemo from './demo/direction';
import DirectionSource from './demo/direction.tsx?raw';
import IntervalDemo from './demo/interval';
import IntervalSource from './demo/interval.tsx?raw';
import OnceDemo from './demo/once';
import OnceSource from './demo/once.tsx?raw';

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
    <Demo>

### Direction

Use `direction` to control the cycling direction: `up` or `down`.

<DemoBlock component={DirectionDemo} source={DirectionSource} />

    </Demo>
    <Demo>

### Custom Interval

Set `interval` to control how long each item stays visible (in milliseconds).

<DemoBlock component={IntervalDemo} source={IntervalSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Play Once

Set `infinite={false}` to stop after one full cycle, ending on the last item.

<DemoBlock component={OnceDemo} source={OnceSource} />

    </Demo>
    <Demo>

### Alert Banner

Combine with `Alert` to cycle through notification messages.

<DemoBlock component={AlertBannerDemo} source={AlertBannerSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property     | Description                              | Type                                          | Default |
| ------------ | ---------------------------------------- | --------------------------------------------- | ------- |
| interval     | time each item stays visible (ms)        | number                                        | 3000    |
| pauseOnHover | pause cycling on hover                   | boolean                                       | true    |
| infinite     | loop infinitely or stop after one cycle  | boolean                                       | true    |
| direction    | cycling direction                        | `up` \| `down`                                | `up`    |
| style        | style object of container                | CSSProperties                                 | -       |
| className    | className of container                   | string                                        | -       |
