import AlphaDemo from './demo/Alpha';
import AlphaSource from './demo/Alpha.tsx?raw';
import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import FormatDemo from './demo/Format';
import FormatSource from './demo/Format.tsx?raw';
import TriggerDemo from './demo/Trigger';
import TriggerSource from './demo/Trigger.tsx?raw';

# ColorPicker

A color selection component with spectrum, hue slider, preset swatches, and format toggle.

## Scenario

Used to select colors in visual editing tools, theme customization, and design systems.

## Usage

```jsx
import { ColorPicker } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Click the swatch to open the color picker panel.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Format

Toggle between `hex`, `rgb`, and `hsb` output formats.

<DemoBlock component={FormatDemo} source={FormatSource} />

    </Demo>
    <Demo>

### Alpha Channel

Enable the alpha slider with `showAlpha`.

<DemoBlock component={AlphaDemo} source={AlphaSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Disabled

A disabled color picker.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### Trigger

Open the panel on hover instead of click.

<DemoBlock component={TriggerDemo} source={TriggerSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property       | Description                        | Type                             | Default |
| -------------- | ---------------------------------- | -------------------------------- | ------- |
| value          | color value (controlled)           | string                           |         |
| defaultValue   | default color value                | string                           | #6e41bf |
| onChange       | callback when color changes        | (color: string) => void          |         |
| format         | color format                       | 'hex' \| 'rgb' \| 'hsb'        | hex     |
| onFormatChange | callback when format changes       | (format: string) => void         |         |
| presets        | preset color swatches              | string[]                         |         |
| showAlpha      | show alpha slider                  | boolean                          | false   |
| disabled       | disable the picker                  | boolean                          | false   |
| trigger        | trigger mode                        | 'click' \| 'hover'             | click   |
| open           | controlled panel visibility        | boolean                          |         |
| onOpenChange   | callback when visibility changes   | (open: boolean) => void          |         |