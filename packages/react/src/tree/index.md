import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SelectableDemo from './demo/Selectable';
import SelectableSource from './demo/Selectable.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';

# Tree

A hierarchical list structure component.

## Scenario

Anything represented in a tree structure can use the `Tree` component.

## Usage

```jsx
import { Tree } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A basic usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Selectable

Make nodes selectable.

<DemoBlock component={SelectableDemo} source={SelectableSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Icon

Customised icons.

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Tree

| Property            | Description                                     | Type                                                   | Default |
| ------------------- | ----------------------------------------------- | ------------------------------------------------------ | ------- |
| data                | tree data                                       | TreeData[]                                             | -       |
| indent              | indent pixels of each tree level                | number                                                 | -       |
| checkable           | add a checkbox before tree nodes                | boolean                                                | false   |
| blockNode           | whether tree node fills the remaining space     | boolean                                                | false   |
| disabled            | whether disabled the tree                       | boolean                                                | false   |
| defaultCheckedKeys  | specifies the keys of checked nodes by default  | string[]                                               | -       |
| defaultExpandedKeys | specifies the keys of expanded nodes by default | string[]                                               | -       |
| defaultExpandAll    | whether to expand all nodes by default          | boolean                                                | false   |
| icon                | custom icon render function                     | (isExpanded: boolean) => ReactNode                     | -       |
| onCheck             | callback when a node is checked                 | (checkedKeys: string[], e: ChangeEvent) => void        | -       |
| onExpand            | callback when a node is expanded/collapsed      | (expandedKeys: string[], e: MouseEvent) => void       | -       |
| style               | style object of container                       | CSSProperties                                          | -       |
| className           | className of container                          | string                                                 | -       |

### TreeData

| Property        | Description                          | Type                                  | Default |
| --------------- | ------------------------------------ | ------------------------------------- | ------- |
| key             | unique key of the node               | string                                | -       |
| title           | title of the node                    | ReactNode                             | -       |
| disableCheckbox | whether disable checkbox of the node | boolean                               | false   |
| disabled        | whether disabled the node            | boolean                               | false   |
| icon            | custom icon render function          | (isExpanded: boolean) => ReactNode    | -       |
| children        | child tree nodes                     | TreeData[]                            | -       |