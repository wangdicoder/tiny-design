import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import PickerDemo from './demo/Picker';
import PickerSource from './demo/Picker.tsx?raw';
import DisabledDateDemo from './demo/DisabledDate';
import DisabledDateSource from './demo/DisabledDate.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import ExtraFooterDemo from './demo/ExtraFooter';
import ExtraFooterSource from './demo/ExtraFooter.tsx?raw';

# DatePicker

To select or input a date.

## Usage

```jsx
import { DatePicker } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic date picker with a "Today" shortcut.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Picker Type

Use `picker` to switch between date, month, and year selection.

<DemoBlock component={PickerDemo} source={PickerSource} />

    </Demo>
    <Demo>

### Disabled Date

Use `disabledDate` to make specific dates unselectable. This example disables all past dates.

<DemoBlock component={DisabledDateDemo} source={DisabledDateSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Size

Three sizes: `sm`, `md` (default), `lg`.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### Disabled

A disabled date picker.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### Extra Footer

Render extra content in the panel footer.

<DemoBlock component={ExtraFooterDemo} source={ExtraFooterSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property            | Description                          | Type                                              | Default       |
| ------------------- | ------------------------------------ | ------------------------------------------------- | ------------- |
| defaultValue        | Default date                         | Date                                              | -             |
| value               | Controlled date value                | Date                                              | -             |
| open                | Control popup visibility             | boolean                                           | -             |
| picker              | Selection granularity                | `date` &#124; `month` &#124; `year`               | `date`        |
| format              | Display format                       | string                                            | `YYYY-MM-DD`  |
| disabled            | Disable the picker                   | boolean                                           | false         |
| placeholder         | Input placeholder                    | string                                            | `Select date` |
| allowClear          | Show clear button                    | boolean                                           | true          |
| size                | Input size                           | `sm` &#124; `md` &#124; `lg`                      | `md`          |
| showToday           | Show "Today" link in footer          | boolean                                           | true          |
| inputReadOnly       | Prevent keyboard input               | boolean                                           | true          |
| disabledDate        | Disable specific dates               | (current: Date) => boolean                        | -             |
| renderExtraFooter   | Extra content in the footer          | (mode: PanelMode) => ReactNode                    | -             |
| suffixIcon          | Custom suffix icon                   | ReactNode                                         | Calendar icon |
| onChange            | Callback when date changes           | (date: Date &#124; null, dateString: string) => void | -          |
| onOpenChange        | Callback on popup open/close         | (open: boolean) => void                           | -             |
| onPanelChange       | Callback on panel mode change        | (date: Date, mode: PanelMode) => void             | -             |
| style               | Style object of container            | CSSProperties                                     | -             |
| className           | ClassName of container               | string                                            | -             |