import ProgressBarDemo from './demo/ProgressBar';
import ProgressBarSource from './demo/ProgressBar.tsx?raw';
import ProgressCircleDemo from './demo/ProgressCircle';
import ProgressCircleSource from './demo/ProgressCircle.tsx?raw';
import InternalTextDemo from './demo/InternalText';
import InternalTextSource from './demo/InternalText.tsx?raw';
import ActiveDemo from './demo/Active';
import ActiveSource from './demo/Active.tsx?raw';
import LinearGradientDemo from './demo/LinearGradient';
import LinearGradientSource from './demo/LinearGradient.tsx?raw';
import DynamicDemo from './demo/Dynamic';
import DynamicSource from './demo/Dynamic.tsx?raw';
import CustomTextDemo from './demo/CustomText';
import CustomTextSource from './demo/CustomText.tsx?raw';
import ReverseDemo from './demo/Reverse';
import ReverseSource from './demo/Reverse.tsx?raw';
import SquareLinecapsDemo from './demo/SquareLinecaps';
import SquareLinecapsSource from './demo/SquareLinecaps.tsx?raw';

# Progress

Display the current progress of an operation flow.

## Scenario
If it will take a long time to complete an operation, you can use Progress to show the current progress and status.
- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

## Usage

```jsx
import { Progress } from '@tiny-design/react';

const { Bar, Circle } = Progress;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Progress bar

A standard progress bar.

<DemoBlock component={ProgressBarDemo} source={ProgressBarSource} />

    </Demo>
    <Demo>

### Progress circular

A circular progress.

<DemoBlock component={ProgressCircleDemo} source={ProgressCircleSource} />

    </Demo>
    <Demo>

### Internal Text

Set `innerText` to display the text inside the bar.

<DemoBlock component={InternalTextDemo} source={InternalTextSource} />

    </Demo>
    <Demo>

### Active Background Style

Set `backgroundType` to display different bar backgrounds.

<DemoBlock component={ActiveDemo} source={ActiveSource} />

    </Demo>
    <Demo>

### Custom linear gradient

A package of `linear-gradient`. Pass a color array to set the `strokeColor`.

> More linear gradient color presets, please visit [Awesome Gradient](https://wangdicoder.github.io/awesome-gradient/).

<DemoBlock component={LinearGradientDemo} source={LinearGradientSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Dynamic progress

Control the value.

<DemoBlock component={DynamicDemo} source={DynamicSource} />

    </Demo>
    <Demo>

### Custom text format

Set a custom text by setting the `format` prop.

<DemoBlock component={CustomTextDemo} source={CustomTextSource} />

    </Demo>
    <Demo>

### Reverse direction

Set `reverse` to control the direction.

> This is only for **Circle** progress.

<DemoBlock component={ReverseDemo} source={ReverseSource} />

    </Demo>
    <Demo>

### Square linecaps

By setting `strokeLinecap="square"`, you can change the linecaps from round to square.

<DemoBlock component={SquareLinecapsDemo} source={SquareLinecapsSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property  | Description                      | Type                               | Default |
| --------- | -------------------------------- | ---------------------------------- | ------- |
| size      | selection size                   | enum: `sm` &#124; `md` &#124; `lg` | `md`    |
| disabled  | disable to select                | boolean                            | false   |
| style	    | style object of container	object | CSSProperties                      | -       |
| className	| className of container           | string                             | -       |