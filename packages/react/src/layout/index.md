import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SidebarDemo from './demo/Sidebar';
import SidebarSource from './demo/Sidebar.tsx?raw';

# Layout

Page layout.

## Component Overview

- `Layout`: The layout wrapper, in which `Header` `Sidebar` `Content` `Footer` or `Layout` itself can be nested, and can be placed in any parent container.
- `Header`: The top layout with the default style, in which any element can be nested, and must be placed in `Layout`.
- `Sidebar`: The sidebar with default style and basic functions, in which any element can be nested, and must be placed in `Layout`.
- `Content`: The content layout with the default style, in which any element can be nested, and must be placed in `Layout`.
- `Footer`: The bottom layout with the default style, in which any element can be nested, and must be placed in `Layout`.

## Usage

```jsx
import { Layout } from 'tiny-design';

const { Header, Footer, Content, Sidebar } = Layout;
```

## Examples


<Demo>

### Basic Structure

Classic page layouts.

<DemoBlock component={BasicDemo} source={BasicSource} />

</Demo>

<Demo>

### Collapsible Sidebar

Use `collapsible` to enable a built-in toggle trigger on the sidebar. Control the collapsed state with `collapsed` and `onCollapse`.

<DemoBlock component={SidebarDemo} source={SidebarSource} />

</Demo>

## Props

### Layout

> `Layout.Header` `Layout.Footer` `Layout.Content` are shared same API with `Layout`.

| Property  | Description               | Type              | Default      |
| --------- | ------------------------- | ----------------- | ------------ |
| className | container className.      | string            | -            |
| style     | customise styles.         | CSSProperties     | -            |