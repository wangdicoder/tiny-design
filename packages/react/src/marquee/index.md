import BasicDemo from './demo/basic';
import BasicSource from './demo/basic.tsx?raw';
import DirectionDemo from './demo/direction';
import DirectionSource from './demo/direction.tsx?raw';
import SpeedDemo from './demo/speed';
import SpeedSource from './demo/speed.tsx?raw';
import CardsDemo from './demo/cards';
import CardsSource from './demo/cards.tsx?raw';

# Marquee

An infinite scrolling marquee component that automatically loops content horizontally.

## Scenario

Use when you want to display a continuous stream of items (e.g. logos, cards, tags) that scroll automatically and pause on hover.

## Usage

```jsx
import { Marquee } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic marquee with edge fade effect. Hover to pause.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Speed

Control the scroll speed with `duration`. A smaller value scrolls faster.

<DemoBlock component={SpeedDemo} source={SpeedSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Direction

Use `direction="right"` to reverse the scroll direction. Combine two rows for a staggered effect.

<DemoBlock component={DirectionDemo} source={DirectionSource} />

    </Demo>
    <Demo>

### Cards

Marquee works with any content, such as cards with rich layouts.

<DemoBlock component={CardsDemo} source={CardsSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property    | Description                        | Type                             | Default |
| ----------- | ---------------------------------- | -------------------------------- | ------- |
| direction   | Scroll direction                   | enum: `left` &#124; `right`      | `left`  |
| duration    | Animation duration in seconds      | number                           | 50      |
| pauseOnHover| Pause animation on hover           | boolean                          | true    |
| gap         | Gap between items in pixels        | number                           | 16      |
| fade        | Apply edge fade mask               | boolean                          | false   |
| infinite    | Loop animation infinitely          | boolean                          | true    |
