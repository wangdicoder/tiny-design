import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import HorizontalDemo from './demo/Horizontal';
import HorizontalSource from './demo/Horizontal.tsx?raw';
import NestDemo from './demo/Nest';
import NestSource from './demo/Nest.tsx?raw';
import StepDemo from './demo/Step';
import StepSource from './demo/Step.tsx?raw';
import MultipleDemo from './demo/Multiple';
import MultipleSource from './demo/Multiple.tsx?raw';

# Split

Divide one pane into two parts that can be dragged to adjust width or height.

## Scenario

When there multiple contents that need to display together, but some of them need more space to show.

## Usage

```jsx
import { Split } from 'tiny-design';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Vertical divider

Top & Bottom.

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### Horizontal divider

Left & Right.

<DemoBlock component={HorizontalDemo} source={HorizontalSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Nest

Can be used nested.

<DemoBlock component={NestDemo} source={NestSource} />

    </Demo>
    <Demo>

### Step

Allow moving by a certain distance.

<DemoBlock component={StepDemo} source={StepSource} />

    </Demo>
    <Demo>

### Multiple

Multiple divider.

<DemoBlock component={MultipleDemo} source={MultipleSource} />

    </Demo>
  </Column>
</Layout>

## API

| Property          | Description                               | Type                                  | Default       |
| ----------------- | ----------------------------------------- | ------------------------------------- | ------------- |
| mode              | split mode                                | enum: `horizontal` &#124; `vertical`  | `vertical`    |
| disabled          | disable flag	                            | boolean                               | false         |
| min               | minimum width / height of the target pane | number &#124; string                  | 50            |
| max               | maximum width / height of the target pane | number &#124; string                  | 50            |
| size              | size of target pane                       | number &#124; string                  | -             |
| defaultSize       | default size of target pane               | number &#124; string                  | -             |
| step              | drag step                                 | number                                | -             |
| resizerProps      | resizer props                             | JSX.IntrinsicElements['div']          | -             |
| resizerSize       | resizer size                              | number                                | 6             |
| onChange          | callback when the size changed            | (size: number) => void                | -             |
| onDragStarted     | callback when the resizer starts dragging | () => void                            | -             |
| onDragFinished    | callback when the resizer ends dragging   | () => void                            | -             |