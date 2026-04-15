import AccordionDemo from './demo/Accordion';
import AccordionSource from './demo/Accordion.tsx?raw';
import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import BorderlessDemo from './demo/Borderless';
import BorderlessSource from './demo/Borderless.tsx?raw';
import DeletableDemo from './demo/Deletable';
import DeletableSource from './demo/Deletable.tsx?raw';
import ExtraDemo from './demo/Extra';
import ExtraSource from './demo/Extra.tsx?raw';
import NestedDemo from './demo/Nested';
import NestedSource from './demo/Nested.tsx?raw';

# Collapse

Structured disclosure for dense information.

## Usage

```tsx
import { Collapse } from 'tiny-design';
```

`Collapse` is now fully items-driven. Each panel is defined by an item object and expanded state is modeled as `string[]`.

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Single Open

Set `multiple={false}` to limit the expanded state to one panel.

<DemoBlock component={AccordionDemo} source={AccordionSource} />

    </Demo>
    <Demo>

### Nested

<DemoBlock component={NestedDemo} source={NestedSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Borderless

<DemoBlock component={BorderlessDemo} source={BorderlessSource} />

    </Demo>
    <Demo>

### Deletable

Use `extra` plus controlled state to remove panels from the source array.

<DemoBlock component={DeletableDemo} source={DeletableSource} />

    </Demo>
    <Demo>

### Dynamic Header Content

`label`, `extra`, and `expandIcon` can react to panel state.

<DemoBlock component={ExtraDemo} source={ExtraSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Collapse

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| items | Panel definitions | `CollapseItem[]` | - |
| value | Controlled expanded keys | `string[]` | - |
| defaultValue | Initial expanded keys | `string[]` | `[]` |
| onValueChange | Callback when expanded keys change | `(value: string[]) => void` | - |
| multiple | Allow more than one panel to stay open | `boolean` | `true` |
| bordered | Show the outer border | `boolean` | `true` |
| size | Preset spacing and font size | `'sm' \| 'md' \| 'lg'` | `'md'` |
| showArrow | Render the expand icon slot | `boolean` | `true` |
| expandIcon | Custom expand icon node or render function | `ReactNode \| ((state) => ReactNode)` | - |
| expandIconPosition | Placement of the expand icon | `'start' \| 'end'` | `'start'` |
| disabled | Disable all panels | `boolean` | `false` |
| collapsible | Default trigger area for panels | `'header' \| 'icon' \| 'disabled'` | `'header'` |
| destroyOnHidden | Unmount panel content after close transition | `boolean` | `false` |
| forceRender | Pre-render every panel body | `boolean` | `false` |
| itemClassName | Shared class applied to every panel item | `string` | - |
| itemStyle | Shared style applied to every panel item | `CSSProperties` | - |
| headerClassName | Shared class applied to every panel header | `string` | - |
| bodyClassName | Shared class applied to every panel body | `string` | - |
| onItemClick | Callback when a panel trigger is activated | `(key: string, event: React.MouseEvent) => void` | - |

### CollapseItem

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| key | Unique panel identifier | `string` | - |
| label | Header content or render function | `ReactNode \| ((state) => ReactNode)` | - |
| children | Panel content | `ReactNode` | - |
| extra | Extra content rendered at the header edge | `ReactNode \| ((state) => ReactNode)` | - |
| disabled | Disable a single panel | `boolean` | `false` |
| collapsible | Override the trigger area for a single panel | `'header' \| 'icon' \| 'disabled'` | inherited |
| forceRender | Pre-render this panel body | `boolean` | inherited |
| destroyOnHidden | Unmount this panel after close transition | `boolean` | inherited |
| className | Panel item class name | `string` | - |
| style | Panel item inline style | `CSSProperties` | - |

### Render State

Render callbacks receive:

```ts
type CollapseRenderState = {
  active: boolean;
  disabled: boolean;
  panelKey: string;
};
```
