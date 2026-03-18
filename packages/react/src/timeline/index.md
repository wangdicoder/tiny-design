import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CenteredDemo from './demo/Centered';
import CenteredSource from './demo/Centered.tsx?raw';
import ColorDemo from './demo/Color';
import ColorSource from './demo/Color.tsx?raw';
import CustomisedDemo from './demo/Customised';
import CustomisedSource from './demo/Customised.tsx?raw';

# Timeline

Display a timeline.

## Scenario

- When a series of information needs to be ordered by time (ascending or descending).

- When you need a timeline to make a visual connection.

## Usage

```jsx
import { Timeline } from 'tiny-design';

const { Item } = Timeline;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Basic timeline.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Customise Dot

Set a node as an icon or other custom element.

<DemoBlock component={CustomisedDemo} source={CustomisedSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Color

Set the color of dots via `dotStyle`.

<DemoBlock component={ColorDemo} source={ColorSource} />

    </Demo>
    <Demo>

### Centered timeline

Center the timeline bar.

<DemoBlock component={CenteredDemo} source={CenteredSource} />

    </Demo>
  </Column>
</Layout>

## API

### Timeline

| Property  | Description                      | Type                           | Default      |
| --------- | -------------------------------- | ------------------------------ | ------------ |
| position  | position of timeline bar         | enum: `left` &#124; `center`   | `left`       |
| style	    | style object of container	object |                                | -            |
| className	| className of container           | string                         | -            |

### Timeline.Item

| Property  | Description                      | Type                           | Default      |
| --------- | -------------------------------- | ------------------------------ | ------------ |
| dot       | customize timeline dot           | `string` &#124; `ReactNode`    | -            |
| dotStyle	| style object of dot object       |                                | -            |
| style	    | style object of container	object |                                | -            |
| className	| className of container           | string                         | -            |