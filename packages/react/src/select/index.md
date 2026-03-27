import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SearchDemo from './demo/Search';
import SearchSource from './demo/Search.tsx?raw';
import MultipleDemo from './demo/Multiple';
import MultipleSource from './demo/Multiple.tsx?raw';
import SizesDemo from './demo/Sizes';
import SizesSource from './demo/Sizes.tsx?raw';
import GroupsDemo from './demo/Groups';
import GroupsSource from './demo/Groups.tsx?raw';
import CustomDemo from './demo/Custom';
import CustomSource from './demo/Custom.tsx?raw';
import RenderDemo from './demo/Render';
import RenderSource from './demo/Render.tsx?raw';

# Select

Select component to select value from options.

## Scenario

- A dropdown menu for displaying choices.
- Single or multiple selection from a list of options.
- Supports searching/filtering, custom rendering, and data-driven options.

## Usage

```jsx
import { Select } from 'tiny-design';

const { Option, OptGroup } = Select;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Basic usage of Select.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Search

Select with search functionality. Set `showSearch` to enable filtering.

<DemoBlock component={SearchDemo} source={SearchSource} />

    </Demo>
    <Demo>

### Multiple

Multiple selection mode displays selected items as tags. Set `mode="multiple"` and optionally `showSearch` for filtering.

<DemoBlock component={MultipleDemo} source={MultipleSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Sizes

Three sizes: `sm`, `md` (default), and `lg`.

<DemoBlock component={SizesDemo} source={SizesSource} />

    </Demo>
    <Demo>

### Option Groups

Use `OptGroup` to group options together.

<DemoBlock component={GroupsDemo} source={GroupsSource} />

    </Demo>
    <Demo>

### Custom Rendering & Loading

Use the `options` prop for data-driven rendering, `optionRender` for custom option content, and `loading` for async states.

<DemoBlock component={CustomDemo} source={CustomSource} />

    </Demo>
    <Demo>

### Custom Rendering

Use `optionRender` to customize dropdown items and `labelRender` to customize the selected label.

<DemoBlock component={RenderDemo} source={RenderSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Select

| Property                | Description                                      | Type                                                          | Default     |
| ----------------------- | ------------------------------------------------ | ------------------------------------------------------------- | ----------- |
| value                   | Current selected value                           | string &#124; string[]                                        | -           |
| defaultValue            | Initial selected value                           | string &#124; string[]                                        | -           |
| mode                    | Selection mode                                   | 'multiple' &#124; 'tags'                                      | -           |
| showSearch              | Enable search filtering                          | boolean                                                       | false       |
| filterOption            | Custom filter function or disable filtering      | boolean &#124; (inputValue, option) => boolean                | true        |
| onSearch                | Callback when search input changes               | (value: string) => void                                       | -           |
| onChange                | Callback when value changes                      | (value, option) => void                                       | -           |
| onSelect                | Callback when an option is selected              | (value: string &#124; string[]) => void                       | -           |
| allowClear              | Show clear button                                | boolean                                                       | false       |
| loading                 | Show loading spinner in dropdown                 | boolean                                                       | false       |
| size                    | Size of selector                                 | 'sm' &#124; 'md' &#124; 'lg'                                 | 'md'        |
| maxTagCount             | Max number of tags displayed in multiple mode    | number                                                        | -           |
| notFoundContent         | Content shown when no options match              | ReactNode                                                     | 'No data'   |
| options                 | Data-driven options (alternative to children)    | \{ value, label?, disabled? \}[]                                | -           |
| optionRender            | Custom option rendering                          | (option, \{ index \}) => ReactNode                              | -           |
| labelRender             | Custom selected label rendering                  | (\{ label, value \}) => ReactNode                               | -           |
| placeholder             | Placeholder text                                 | string                                                        | -           |
| disabled                | Whether disabled                                 | boolean                                                       | false       |
| defaultOpen             | Initial open state of dropdown                   | boolean                                                       | false       |
| open                    | Controlled open state of dropdown                | boolean                                                       | -           |
| onDropdownVisibleChange | Callback when dropdown open state changes        | (open: boolean) => void                                       | -           |
| dropdownStyle           | Style of dropdown menu                           | CSSProperties                                                 | -           |
| style                   | Style of container                               | CSSProperties                                                 | -           |
| className               | Class name of container                          | string                                                        | -           |

### Option

| Property  | Description                        | Type        | Default |
| --------- | ---------------------------------- | ----------- | ------- |
| value     | Value of the option                | string      | -       |
| label     | Display label (overrides children) | ReactNode   | -       |
| disabled  | Whether disabled                   | boolean     | false   |

### OptGroup

| Property | Description         | Type   | Default |
| -------- | ------------------- | ------ | ------- |
| label    | Group label         | string | -       |