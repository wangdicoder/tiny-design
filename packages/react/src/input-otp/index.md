import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import MaskDemo from './demo/Mask';
import MaskSource from './demo/Mask.tsx?raw';
import LengthDemo from './demo/Length';
import LengthSource from './demo/Length.tsx?raw';
import SeparatorDemo from './demo/Separator';
import SeparatorSource from './demo/Separator.tsx?raw';
import FormatterDemo from './demo/Formatter';
import FormatterSource from './demo/Formatter.tsx?raw';
import AutoFocusDemo from './demo/AutoFocus';
import AutoFocusSource from './demo/AutoFocus.tsx?raw';

# Input OTP

Used for entering verification codes, OTP (One-Time Password), and similar short numeric/character sequences.

## Scenario

Verification code input for login, registration, or two-factor authentication flows.

## Usage

```js
import { InputOTP } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic OTP input.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Size

Three sizes are available: `sm`, `md` (default), and `lg`.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### Length

Set the number of OTP cells using the `length` prop.

<DemoBlock component={LengthDemo} source={LengthSource} />

    </Demo>
    <Demo>

### Mask

Use `mask` to hide the input values (useful for PIN codes). You can also set a custom mask character.

<DemoBlock component={MaskDemo} source={MaskSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Separator

Customize the separator between cells using the `separator` prop.

<DemoBlock component={SeparatorDemo} source={SeparatorSource} />

    </Demo>
    <Demo>

### Disabled

Disable the OTP input using the `disabled` prop.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### Controlled & Formatter

Use `value` for controlled mode and `formatter` to restrict input.

<DemoBlock component={FormatterDemo} source={FormatterSource} />

    </Demo>
    <Demo>

### Auto Focus

Use `autoFocus` to automatically focus the first cell when the component mounts.

<DemoBlock component={AutoFocusDemo} source={AutoFocusSource} />

    </Demo>
  </Column>
</Layout>

## Props

### InputOTP

| Property     | Description                                                               | Type                                                              | Default |
| ------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| length       | Number of input cells                                                     | number                                                            | 6       |
| value        | Controlled value                                                          | string                                                            | -       |
| defaultValue | Default value                                                             | string                                                            | -       |
| size         | Input size                                                                | enum: `sm` &#124; `md` &#124; `lg`                                | `md`    |
| disabled     | Whether disabled                                                          | boolean                                                           | false   |
| mask         | Whether to mask input, or a custom mask character                         | boolean &#124; string                                             | -       |
| formatter    | Format display value                                                      | (value: string) => string                                         | -       |
| separator    | Separator element rendered between cells                                  | ((index: number) => ReactNode) &#124; ReactNode                   | -       |
| autoFocus    | Auto focus the first cell on mount                                        | boolean                                                           | false   |
| autoComplete | HTML autocomplete attribute                                               | string                                                            | `one-time-code` |
| onChange     | Callback when the value changes                                           | (value: string) => void                                           | -       |
| style        | Style of container                                                        | CSSProperties                                                     | -       |
| className    | ClassName of container                                                    | string                                                            | -       |