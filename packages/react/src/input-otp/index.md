import Basic from './demo/basic.md'
import Size from './demo/size.md'
import Disabled from './demo/disabled.md'
import Mask from './demo/mask.md'
import Length from './demo/length.md'
import Separator from './demo/separator.md'
import Formatter from './demo/formatter.md'
import AutoFocus from './demo/auto-focus.md'

# InputOTP

Used for entering verification codes, OTP (One-Time Password), and similar short numeric/character sequences.

## Scenario

Verification code input for login, registration, or two-factor authentication flows.

## Usage

```js
import { InputOTP } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Basic/>
    <Size/>
    <Length/>
    <Mask/>
  </Column>
  <Column>
    <Separator/>
    <Disabled/>
    <Formatter/>
    <AutoFocus/>
  </Column>
</Layout>

## API

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
| onChange     | Callback when all cells are filled                                        | (value: string) => void                                           | -       |
| style        | Style of container                                                        | CSSProperties                                                     | -       |
| className    | ClassName of container                                                    | string                                                            | -       |
