import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomFilterDemo from './demo/CustomFilter';
import CustomFilterSource from './demo/CustomFilter.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import AllowClearDemo from './demo/AllowClear';
import AllowClearSource from './demo/AllowClear.tsx?raw';
import NotFoundDemo from './demo/NotFound';
import NotFoundSource from './demo/NotFound.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';

# AutoComplete

Autocomplete function of input field.

## Scenario

- When there is a need for autocomplete functionality for an input field.
- Differs from Select in that AutoComplete is an enhanced Input, not a selection from predefined options.

## Usage

```jsx
import { AutoComplete } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Basic usage. Type to see email suffix suggestions.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Disabled

A disabled AutoComplete.

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### Not Found Content

Use `notFoundContent` to display a message when no options match.

<DemoBlock component={NotFoundDemo} source={NotFoundSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Custom Filter

Use `filterOption` to implement custom filtering logic.

<DemoBlock component={CustomFilterDemo} source={CustomFilterSource} />

    </Demo>
    <Demo>

### Allow Clear

Set `allowClear` to show a clear button when the input has a value.

<DemoBlock component={AllowClearDemo} source={AllowClearSource} />

    </Demo>
    <Demo>

### Size

Three sizes: `sm`, `md` (default) and `lg`.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
  </Column>
</Layout>

## Props

| Property                  | Description                                      | Type                                                          | Default |
| ------------------------- | ------------------------------------------------ | ------------------------------------------------------------- | ------- |
| options                   | Data source for autocomplete                     | \{ value, label?, disabled? \}[]                                | []      |
| value                     | Controlled input value                           | string                                                        | -       |
| defaultValue              | Initial input value                              | string                                                        | ''      |
| placeholder               | Placeholder of input                             | string                                                        | -       |
| disabled                  | Whether disabled                                 | boolean                                                       | false   |
| allowClear                | Show clear button                                | boolean                                                       | false   |
| defaultActiveFirstOption  | Whether to highlight the first option            | boolean                                                       | true    |
| open                      | Controlled open state of dropdown                | boolean                                                       | -       |
| defaultOpen               | Initial open state of dropdown                   | boolean                                                       | false   |
| notFoundContent           | Content shown when no options match              | ReactNode                                                     | -       |
| size                      | Size of input                                    | 'sm' &#124; 'md' &#124; 'lg'                                 | 'md'    |
| filterOption              | Filter function or false to disable              | boolean &#124; (inputValue, option) => boolean                | true    |
| onChange                   | Callback when input value changes                | (value: string) => void                                       | -       |
| onSelect                  | Callback when an option is selected              | (value: string, option) => void                               | -       |
| onOpenChange              | Callback when dropdown open state changes        | (open: boolean) => void                                       | -       |
| onSearch                  | Callback when searching                          | (value: string) => void                                       | -       |
| onFocus                   | Callback when input is focused                   | (e: FocusEvent) => void                                       | -       |
| onBlur                    | Callback when input loses focus                  | (e: FocusEvent) => void                                       | -       |
