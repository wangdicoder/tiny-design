import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import MillisecondDemo from './demo/Millisecond';
import MillisecondSource from './demo/Millisecond.tsx?raw';

# Countdown

A countdown component

## Scenario

Countdown activities, like sec-kill.

## Usage

```js
import { Countdown } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic example.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Millisecond

Allow to display millisecond

<DemoBlock component={MillisecondDemo} source={MillisecondSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property    | Description                          | Type              | Default |
| ----------- | ------------------------------------ | ----------------- | ------- |
| value       | countdown time                       | Date              | -       |
| millisec    | allow to get millisecond value       | boolean           | false   |
| onFinish    | callback when the countdown finished | () => void        | -       |
| style	      | style object of container	object     |                   | -       |
| className	  | className of container               | string            | -       |