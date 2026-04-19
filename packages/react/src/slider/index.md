import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DualDemo from './demo/Dual';
import DualSource from './demo/Dual.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import DotsDemo from './demo/Dots';
import DotsSource from './demo/Dots.tsx?raw';
import MarkerDemo from './demo/Marker';
import MarkerSource from './demo/Marker.tsx?raw';
import CustomisedTooltipDemo from './demo/CustomisedTooltip';
import CustomisedTooltipSource from './demo/CustomisedTooltip.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import TooltipVisibleDemo from './demo/TooltipVisible';
import TooltipVisibleSource from './demo/TooltipVisible.tsx?raw';
import TrackDemo from './demo/Track';
import TrackSource from './demo/Track.tsx?raw';

# Slider

Drag the slider within a fixed range.

## Scenario

To input a value in a range.

## Usage

```jsx
import { Slider } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic example.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Dual Slider

Pass a number array to the value to display a dual slider.

<DemoBlock component={DualDemo} source={DualSource} />

    </Demo>
    <Demo>

### Dots

Display dots on the slider bar.

<DemoBlock component={DotsDemo} source={DotsSource} />

    </Demo>
    <Demo>

### Marker

Display marker on the slider bar.

<DemoBlock component={MarkerDemo} source={MarkerSource} />

    </Demo>
    <Demo>

### Disabled Slider

Disabled Sliders.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Vertical mode

Use `direction` to create a vertical slider.

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### Customise tooltip

Use `tipFormatter` to format content of `Tooltip`.

<DemoBlock component={CustomisedTooltipDemo} source={CustomisedTooltipSource} />

    </Demo>
    <Demo>

### Control visible of ToolTip

When `tooltipVisible` is true, `ToolTip` will always show even if dragging or hovering.

<DemoBlock component={TooltipVisibleDemo} source={TooltipVisibleSource} />

    </Demo>
    <Demo>

### No track

Set `track={false}` to hide the track.

<DemoBlock component={TrackDemo} source={TrackSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property          | Description                                                                                   | Type                                  | Default       |
| ----------------- | --------------------------------------------------------------------------------------------- | ------------------------------------- | ------------- |
| value             | the value of slider.                                                                          | number &#124; [number, number]        |               |
| defaultValue      | the default value of slider.                                                                  | number &#124; [number, number]        |               |
| min               | the minimum value the slider can slide to.                                                    | number                                | 0             |
| max               | the maximum value the slider can slide to.                                                    | number                                | 100           |
| marks             | tick mark of Slider.                                                                          | \{ number: ReactNode \} &#124; \{ number: \{ style: CSSProperty, label: ReactNode \} \}   |     |
| dots              | display dots on the track.                                                                    | boolean                               | false         |
| direction         | the slider direction.                                                                         | enum: `horizontal` &#124; `verical`   | `horizontal`  |
| step              | the granularity the slider can step through values.                                           | number                                | 1             |
| disabled          | the slider will not be interactive if set true.                                               | boolean                               | false         |
| track             | determine whether display track.                                                              | boolean                               | false         |
| tooltipVisible    | if true, Tooltip will show always, or it will not show anyway, even if dragging or hovering.  | boolean                               |               |
| tooltipPlacement  | set Tooltip display position.                                                                 | `Placement`                           | `top`         |
| tipFormatter      | display the value format in Tooltip.                                                          | (value) => ReactNode                  |               |
| onChange          | callback function that is fired when the user changes the slider's value.                     | (value) => void                       |               |
| onAfterChange     | callback when `onmouseup` is fired.                                                           | (value) => void                       |               |
| style	            | style object of container	object.                                                             | CSSProperties                         |               |
| className	        | className of container.                                                                       | string                                |               |