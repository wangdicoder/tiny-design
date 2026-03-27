import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import BorderDemo from './demo/Border';
import BorderSource from './demo/Border.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import VerticalBorderDemo from './demo/VerticalBorder';
import VerticalBorderSource from './demo/VerticalBorder.tsx?raw';

# Descriptions

Display multiple read-only fields in groups.

## Scenario

Commonly displayed on the details page.

## Usage

```jsx
import { Descriptions } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

A simple usage.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Border

Descriptions with border.

<DemoBlock component={BorderDemo} source={BorderSource} />

    </Demo>
    <Demo>

### Size

Customised sizes to fit in a variety of containers.

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Vertical

Vertical layout.

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### Vertical Border

Vertical layout with border.

<DemoBlock component={VerticalBorderDemo} source={VerticalBorderSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Descriptions

| Property      | Description                                   | Type                                  | Default       |
| ------------- | --------------------------------------------- | ------------------------------------- | ------------- |
| title         | the title of the description list             | ReactNode                             | -             |
| bordered      | whether to display the border                 | boolean                               | false         |
| column        | the number of `Descriptions.Items` in a row   | number                                | 3             |
| size	        | set the size of `Descriptions`                | enum: `sm` &#124; `md` &#124; `lg`    | `md`          |
| layout	    | description layout                            | enum: `horizontal` &#124; `vertical`  | `horizontal`  |
| colon	        | whether to display the colon                  | boolean                               | -             |

### Descriptions.Item

| Property      | Description                           | Type              | Default   |
| ------------- | ------------------------------------- | ----------------- | --------- |
| label         | description of the content            | ReactNode         | -         |
| span          | the number of columns included        | number            | 1         |