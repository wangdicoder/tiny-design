import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import TargetDemo from './demo/Target';
import TargetSource from './demo/Target.tsx?raw';

# Scroll Indicator

A "progress bar" to show how far a page has been scrolled.

## Scenario

Used when the length of content is too long.

## Usage

```jsx
import { ScrollIndicator } from 'tiny-design';
```

## Examples

<Demo>

### Basic

A basic example.

<DemoBlock component={BasicDemo} source={BasicSource} />

</Demo>
<Demo>

### Container to scroll

Set a target, which is listen to scroll event of target element (default is `window`).

<DemoBlock component={TargetDemo} source={TargetSource} />

</Demo>

## API

| Property  | Description                                           | Type              | Default       |
| --------- | ----------------------------------------------------- | ----------------- | ------------- |
| fixed     | Determine the indicator fixed on the top of window    | boolean           | true          |  
| target    | Specifies the scrollable area DOM node	            | () => HTMLElement | () => window  |
| style	    | Style object of container	object                      | CSSProperties     | -             |
| className	| ClassName of container                                | string            | -             |
