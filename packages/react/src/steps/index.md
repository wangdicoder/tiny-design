import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import SwitchDemo from './demo/Switch';
import SwitchSource from './demo/Switch.tsx?raw';
import ClickableDemo from './demo/Clickable';
import ClickableSource from './demo/Clickable.tsx?raw';

# Steps

`Steps` convey progress through numbered steps. It provides a wizard-like workflow.

## Scenario

When a given task is complicated or has a certain sequence in the series of sub tasks, we can decompose it into several steps to make things easier.

## Usage

```jsx
import { Steps } from '@tiny-design/react';

const { Step } = Steps;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

The most basic step bar.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### With Icon

Use a customised icon for `Step`.

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
    <Demo>

### Switch Step

Control the step.

<DemoBlock component={SwitchDemo} source={SwitchSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Label Placement

Use `labelPlacement` to set the direction of title and description.

> Only apply to `horizontal` Steps.

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
    <Demo>

### Vertical

A simple step bar in the vertical direction.

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### Clickable

Click to switch step.

<DemoBlock component={ClickableDemo} source={ClickableSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Steps

The whole of the step bar.

| Property          | Description                                                               | Type                                                              | Default       |
| ----------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------- |
| current           | set the current step.                                                     | number                                                            | -             |
| defaultCurrent    | display a circle skeleton.                                                | number                                                            | 0             |
| direction         | determine the direction of the step bar.                                  | enum: `horizontal` &#124; `vertical`                              | `horizontal`  |
| status            | current step's status.                                                    | enum: `wait` &#124; `process`  &#124; `finish`  &#124; `error`    | `process`     |
| labelPlacement    | place title and description with `horizontal` or `vertical` direction.    | enum: `horizontal` &#124; `vertical`                              | `vertical`    |
| onChange          | trigger when Step is changed.                                             | (current: number) => void                                         | -             |

### Steps.Step

A single step in the step bar.

| Property          | Description                                       | Type                          | Default   |
| ----------------- | ------------------------------------------------- | ----------------------------- | --------- |
| title             | title of the step.                                | ReactNode                     | -         |
| description       | description of the step.                          | ReactNode                     | -         |
| icon              | customise the step's icon.                        | ReactNode                     | -         |
| status            | replace `Steps`'s status.                         | enum: `wait` &#124; `process`  &#124; `finish`  &#124; `error`    | -     |
| disabled          | disable the click event.                          | boolean                       | -         |