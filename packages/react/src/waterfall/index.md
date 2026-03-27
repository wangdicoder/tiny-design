import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ResponsiveDemo from './demo/Responsive';
import ResponsiveSource from './demo/Responsive.tsx?raw';
import ImageDemo from './demo/Image';
import ImageSource from './demo/Image.tsx?raw';
import DynamicDemo from './demo/Dynamic';
import DynamicSource from './demo/Dynamic.tsx?raw';

# Waterfall

A masonry/waterfall layout component for displaying content with varying heights, distributing items evenly across columns.

## Scenario

Use Waterfall when you need to display images or cards with irregular heights in a multi-column layout where items fill the shortest column first.

## Usage

```jsx
import { Waterfall } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Basic waterfall layout with 4 columns and cards of varying heights.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Image Gallery

Waterfall layout works great for image galleries where each image has a different aspect ratio.

<DemoBlock component={ImageDemo} source={ImageSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Responsive Columns

Use a slider to interactively change the column count.

<DemoBlock component={ResponsiveDemo} source={ResponsiveSource} />

    </Demo>
    <Demo>

### Dynamic

Add and remove items dynamically.

<DemoBlock component={DynamicDemo} source={DynamicSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Waterfall

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| columns | Number of columns, or responsive breakpoint config | `number` &#124; `{ xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number }` | `3` |
| gutter | Spacing between items | `number` &#124; `[number, number]` | `0` |
| items | Array of items to render | `WaterfallItem[]` | - |
| itemRender | Custom render function for each item | `(item: WaterfallItem & { index: number; column: number }) => ReactNode` | - |
| onLayoutChange | Callback when layout order changes | `(sortInfo: { key: Key; column: number }[]) => void` | - |

### WaterfallItem

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| key | Unique identifier | `React.Key` | - |
| column | Pin item to a specific column index | `number` | - |
| children | Direct content (takes priority over itemRender) | `ReactNode` | - |
| data | Custom data passed to itemRender | `any` | - |
