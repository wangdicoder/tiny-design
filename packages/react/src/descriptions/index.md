import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import BorderDemo from './demo/Border';
import BorderSource from './demo/Border.tsx?raw';
import EmptyHiddenDemo from './demo/EmptyHidden';
import EmptyHiddenSource from './demo/EmptyHidden.tsx?raw';
import RenderAlignDemo from './demo/RenderAlign';
import RenderAlignSource from './demo/RenderAlign.tsx?raw';
import SemanticDemo from './demo/Semantic';
import SemanticSource from './demo/Semantic.tsx?raw';
import SeparatorDemo from './demo/Separator';
import SeparatorSource from './demo/Separator.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import VerticalBorderDemo from './demo/VerticalBorder';
import VerticalBorderSource from './demo/VerticalBorder.tsx?raw';

# Descriptions

Display grouped read-only fields with responsive columns and explicit span rules.

## Scenario

Use it for metadata, release notes, system details, or any dense read-only summary where labels and values need consistent rhythm.

## Usage

```jsx
import { Descriptions } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Children API with title, actions, and footer.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Border

Bordered table semantic for strongly aligned detail views.

<DemoBlock component={BorderDemo} source={BorderSource} />

    </Demo>
    <Demo>

### Size

Responsive columns using the data-driven `items` API.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### Separator

Use `separator` when the default colon is too plain for the tone of the page.

<DemoBlock component={SeparatorDemo} source={SeparatorSource} />

    </Demo>
    <Demo>

### Empty And Hidden

Use `empty` for nullish values and `hidden` to remove internal-only rows.

<DemoBlock component={EmptyHiddenDemo} source={EmptyHiddenSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Vertical

Vertical layout for denser editorial summaries.

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### Vertical Border

Vertical table layout for structured audit or approval data.

<DemoBlock component={VerticalBorderDemo} source={VerticalBorderSource} />

    </Demo>
    <Demo>

### Semantic

Compare `semantic="list"` and `semantic="table"` for the same kind of content.

<DemoBlock component={SemanticDemo} source={SemanticSource} />

    </Demo>
    <Demo>

### Render And Align

Use `labelRender`, `contentRender`, `labelAlign`, and `contentAlign` for presentation control.

<DemoBlock component={RenderAlignDemo} source={RenderAlignSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Descriptions

| Property      | Description                                   | Type                                  | Default       |
| ------------- | --------------------------------------------- | ------------------------------------- | ------------- |
| title         | header title                                  | ReactNode                             | -             |
| extra         | header actions                                | ReactNode                             | -             |
| footer        | footer content                                | ReactNode                             | -             |
| bordered      | whether to display borders                    | boolean                               | false         |
| columns       | logical column count or responsive columns    | `number` &#124; `{ xs?; sm?; md?; lg?; xl?; xxl? }` | `3` |
| size	        | size of the component                         | enum: `sm` &#124; `md` &#124; `lg`    | `md`          |
| layout	    | description layout                            | enum: `horizontal` &#124; `vertical`  | `horizontal`  |
| colon	        | whether to display the colon                  | boolean                               | `!bordered`   |
| separator     | custom separator between label and content    | ReactNode                             | `:` or none   |
| items         | data-driven items                             | `DescriptionsItemType[]`              | -             |
| empty         | placeholder for nullish content               | ReactNode                             | `-`           |
| semantic      | semantic renderer                             | enum: `auto` &#124; `table` &#124; `list` | `auto`   |
| labelAlign    | label alignment                               | enum: `start` &#124; `center` &#124; `end` | `start` |
| contentAlign  | content alignment                             | enum: `start` &#124; `center` &#124; `end` | `start` |
| labelRender   | custom label render                           | `(item, index) => ReactNode`          | -             |
| contentRender | custom content render                         | `(item, index) => ReactNode`          | -             |

### Descriptions.Item

| Property      | Description                           | Type              | Default   |
| ------------- | ------------------------------------- | ----------------- | --------- |
| label         | label content                         | ReactNode         | -         |
| span          | logical columns to span               | `number` &#124; `'fill'` | `1` |
| hidden        | whether to hide the item              | boolean           | false     |
| extra         | extra content shown near the label    | ReactNode         | -         |

## Notes

- `columns` is the number of logical columns, not the number of rendered DOM cells.
- `span="fill"` expands the current item to the remaining space of the current row.
- `items` takes priority over `children` when both are provided.
- `semantic="auto"` uses `table` when `bordered` is enabled, otherwise `list`.
