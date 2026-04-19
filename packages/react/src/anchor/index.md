import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import NestedDemo from './demo/Nested';
import NestedSource from './demo/Nested.tsx?raw';
import AffixDemo from './demo/Affix';
import AffixSource from './demo/Affix.tsx?raw';
import OffsetTopDemo from './demo/OffsetTop';
import OffsetTopSource from './demo/OffsetTop.tsx?raw';

# Anchor

Hyperlinks to scroll on one page.

## Scenario

- For long pages, an anchor sidebar allows quick navigation to sections.
- Tracks the current visible section while scrolling.

## Usage

```jsx
import { Anchor } from '@tiny-design/react';
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic

Anchor with a scrollable container. Click a link to scroll to the section; scroll to see the active link update.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Affix

Set `affix` to enable sticky positioning.

<DemoBlock component={AffixDemo} source={AffixSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Nested Links

Anchor supports nested `Anchor.Link` for multi-level navigation. Parent links highlight when any child is active.

<DemoBlock component={NestedDemo} source={NestedSource} />

    </Demo>
    <Demo>

### Offset Top

Use `offsetTop` to set a pixel threshold before a section becomes active. A section is marked active only when its top edge scrolls past the offset.

<DemoBlock component={OffsetTopDemo} source={OffsetTopSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Anchor

| Property     | Description                                  | Type                                                                       | Default      |
| ------------ | -------------------------------------------- | -------------------------------------------------------------------------- | ------------ |
| type         | Style of the anchor indicator                | 'dot' \| 'line'                                                            | dot          |
| affix        | Whether to use sticky positioning            | boolean                                                                    | false        |
| offsetTop    | Pixels to offset from top when calculating   | number                                                                     | 0            |
| offsetBottom | Pixels to offset from bottom                 | number                                                                     | -            |
| getContainer | Scrolling container                          | () => HTMLElement                                                          | () => window |
| onChange     | Callback when active link changes            | (currentActiveLink: string) => void                                        | -            |
| onClick      | Callback when a link is clicked              | (e: MouseEvent, link: \{ title: string; href: string \}) => void            | -            |

### Anchor.Link

| Property | Description               | Type                          | Default |
| -------- | ------------------------- | ----------------------------- | ------- |
| href     | Target anchor ID          | string                        | -       |
| title    | Content of the link       | string                        | -       |
| children | Nested Anchor.Link items  | Anchor.Link[]                 | -       |