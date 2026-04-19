import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ControlledDemo from './demo/Controlled';
import ControlledSource from './demo/Controlled.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import FormatDemo from './demo/Format';
import FormatSource from './demo/Format.tsx?raw';
import StepDemo from './demo/Step';
import StepSource from './demo/Step.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import DisabledTimeDemo from './demo/DisabledTime';
import DisabledTimeSource from './demo/DisabledTime.tsx?raw';
import HideDisabledDemo from './demo/HideDisabled';
import HideDisabledSource from './demo/HideDisabled.tsx?raw';
import ExtraFooterDemo from './demo/ExtraFooter';
import ExtraFooterSource from './demo/ExtraFooter.tsx?raw';
import LoopDemo from './demo/Loop';
import LoopSource from './demo/Loop.tsx?raw';

# TimePicker

To select or input a time.

## Usage

```jsx
import { TimePicker } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic time picker.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Controlled

Fully controlled with `value` and `onChange`.

<DemoBlock component={ControlledDemo} source={ControlledSource} />

    </Demo>
    <Demo>

### Format

Use `format` to control what's displayed. Omitting seconds hides the seconds column.

<DemoBlock component={FormatDemo} source={FormatSource} />

    </Demo>
    <Demo>

### Disabled Time Options

Use `disabledTime` to make certain hours, minutes, or seconds unselectable.

<DemoBlock component={DisabledTimeDemo} source={DisabledTimeSource} />

    </Demo>
    <Demo>

### Extra Footer

Render extra content at the bottom of the dropdown panel.

<DemoBlock component={ExtraFooterDemo} source={ExtraFooterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Size

Three sizes: `sm`, `md` (default), `lg`.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### Step Intervals

Show time options at custom intervals.

<DemoBlock component={StepDemo} source={StepSource} />

    </Demo>
    <Demo>

### Disabled

A disabled time picker.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### Hide Disabled Options

Combine `disabledTime` with `hideDisabledOptions` to remove unavailable times from the panel entirely.

<DemoBlock component={HideDisabledDemo} source={HideDisabledSource} />

    </Demo>
    <Demo>

### Infinite Scroll

Enable circular scrolling so columns wrap around continuously.

<DemoBlock component={LoopDemo} source={LoopSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property            | Description                          | Type                                    | Default       |
| ------------------- | ------------------------------------ | --------------------------------------- | ------------- |
| defaultValue        | Default time                         | Date                                    | -             |
| value               | Controlled time value                | Date                                    | -             |
| open                | Control popup visibility             | boolean                                 | -             |
| format              | Display format                       | string                                  | `HH:mm:ss`   |
| use12Hours          | Use 12-hour format                   | boolean                                 | false         |
| hourStep            | Hour interval step                   | number                                  | 1             |
| minuteStep          | Minute interval step                 | number                                  | 1             |
| secondStep          | Second interval step                 | number                                  | 1             |
| disabled            | Disable the picker                   | boolean                                 | false         |
| placeholder         | Input placeholder                    | string                                  | `Select time` |
| allowClear          | Show clear button                    | boolean                                 | true          |
| size                | Input size                           | `sm` &#124; `md` &#124; `lg`            | `md`          |
| inputReadOnly       | Prevent keyboard input               | boolean                                 | true          |
| disabledTime        | Specify unavailable times            | () => DisabledTime                      | -             |
| hideDisabledOptions | Hide disabled time options           | boolean                                 | false         |
| showNow             | Show "Now" button in footer          | boolean                                 | true          |
| renderExtraFooter   | Extra content in the footer          | () => ReactNode                         | -             |
| suffixIcon          | Custom suffix icon                   | ReactNode                               | Clock icon    |
| loop                | Enable infinite circular scrolling   | boolean                                 | false         |
| onChange            | Callback when time changes           | (date: Date &#124; null) => void        | -             |
| onOpenChange        | Callback on popup open/close         | (open: boolean) => void                 | -             |
| style               | Style object of container            | CSSProperties                           | -             |
| className           | ClassName of container               | string                                  | -             |

### DisabledTime

```typescript
interface DisabledTime {
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: (hour: number, minute: number) => number[];
}
```