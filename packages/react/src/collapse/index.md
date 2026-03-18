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

A content area which can be collapsed and expanded.

## Scenario

Can be used to group or hide complex regions to keep the page clean.

`Accordion` is a special kind of `Collapse`, which allows only one panel to be expanded at a time.

## Usage

```jsx
import { Collapse } from 'tiny-design';

const { Panel } = Collapse;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic Collapse

By default, any number of panels can be expanded at a time. The first panel is expanded in this example.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Accordion

Only one panel can be expanded at a time.

<DemoBlock component={AccordionDemo} source={AccordionSource} />

    </Demo>
    <Demo>

### Nested panel

`Collapse` is nested inside the `Collapse`.

<DemoBlock component={NestedDemo} source={NestedSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Borderless

A borderless style of Collapse.

<DemoBlock component={BorderlessDemo} source={BorderlessSource} />

    </Demo>
    <Demo>

### Deletable

`Panel` can be deleted.

<DemoBlock component={DeletableDemo} source={DeletableSource} />

    </Demo>
    <Demo>

### Extra Content

Add extra elements in the panel header corner with the `extra` prop.

<DemoBlock component={ExtraDemo} source={ExtraSource} />

    </Demo>
  </Column>
</Layout>

## API

### Collapse

| Property          | Description                                               | Type                              | Default   |
| ----------------- | --------------------------------------------------------- | --------------------------------- | --------- |
| defaultActiveKey  | initial active panel                                      | string &#124; string[]            | []        |
| activeKey         | keys of the active panel                                  | string &#124; string[]            | -         |
| accordion         | accordion mode                                            | boolean                           | false     |
| deletable         | panel can be deleted                                      | boolean                           | false     |
| showArrow         | display arrow icon                                        | boolean                           | true      |
| bordered          | render borders around the collapse block                  | boolean                           | true      |
| onChange          | callback function executed when active panel is changed   | (keys: string | string[]) => void | -         |

### Collapse.Panel

| Property          | Description                                   | Type                              | Default   |
| ----------------- | --------------------------------------------- | --------------------------------- | --------- |
| itemKey           | unique key identifying the panel              | string                            | -         |
| header            | title of the panel                            | ReactNode                         | -         |
| disabled          | panel cannot be opened or closed if set true  | boolean                           | -         |
| extra             | extra element in the corner                   | ReactNode                         | -         |
| deletable         | whether the panel can be deleted              | boolean                           | -         |
| showArrow         | display arrow icon                            | boolean                           | -         |
| onHeaderOnClick   | callback when the header is clicked           | (e: React.MouseEvent) => void     | -         |