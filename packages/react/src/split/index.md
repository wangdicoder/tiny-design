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
import CustomHandleDemo from './demo/CustomHandle';
import CustomHandleSource from './demo/CustomHandle.tsx?raw';
import HitAreaSizeDemo from './demo/HitAreaSize';
import HitAreaSizeSource from './demo/HitAreaSize.tsx?raw';
import CollapseDemo from './demo/Collapse';
import CollapseSource from './demo/Collapse.tsx?raw';

# Split

Split lays out two panes with a product-ready separator model: top-level sizing for the primary pane, explicit primary pane ownership, custom separator rendering, and collapsible side panels.

## Usage

```jsx
import { Split } from '@tiny-design/react';
```

Use `Split` when two panels need to share the same region and users should be able to rebalance space themselves. In most cases:

- Put the resizable size model on `Split` itself with `size`, `defaultSize`, `min`, and `max`.
- Use `primary="second"` when the trailing pane should own the size model, for example an inspector on the right.
- Keep the visual separator small, and increase `separatorHitAreaSize` if the drag target needs to be easier to grab.

## Examples

<Layout>
  <Column>
    <Demo>

### Horizontal Layout

The default left and right layout. This is the most common pattern for navigation and workspace content.

<DemoBlock component={HorizontalDemo} source={HorizontalSource} />

    </Demo>
    <Demo>

### Vertical Layout

Use `orientation="vertical"` when content should split top and bottom, such as preview and inspector stacks.

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### Collapsible Pane

Enable `collapsible` when the primary pane behaves like a sidebar that should temporarily tuck away without leaving the layout.

<DemoBlock component={CollapseDemo} source={CollapseSource} />

    </Demo>
    <Demo>

### Custom Separator

`separatorRender` lets you replace the default handle while keeping the same drag, keyboard, and collapse behavior.

<DemoBlock component={CustomHandleDemo} source={CustomHandleSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### Constraints

Combine `primary`, `min`, `max`, and pane-level constraints when one side should stay within a tighter product layout range.

<DemoBlock component={MultipleDemo} source={MultipleSource} />

    </Demo>
    <Demo>

### Hit Area Size

Keep the separator visually slim but grow the drag target with `separatorHitAreaSize` when precision dragging feels too hard.

<DemoBlock component={HitAreaSizeDemo} source={HitAreaSizeSource} />

    </Demo>
    <Demo>

### Nested Layout

`Split` can be nested to build shells such as sidebar plus stacked detail panes. Keep each level responsible for one layout decision.

<DemoBlock component={NestDemo} source={NestSource} />

    </Demo>
    <Demo>

### Step

Use `dragStep` and `keyboardStep` when panel movement should snap to a consistent rhythm instead of moving freely.

<DemoBlock component={StepDemo} source={StepSource} />

    </Demo>
  </Column>
</Layout>

## API

### Split

| Property | Description | Type | Default |
| ----------------- | ----------------------------------------- | ------------------------------------- | ------------- |
| orientation | pane arrangement; `horizontal` is left/right, `vertical` is top/bottom | enum: `horizontal` \| `vertical` | `horizontal` |
| primary | pane that owns the resizable size model | enum: `first` \| `second` | `first` |
| disabled | disable dragging and keyboard resizing | boolean | false |
| size | controlled size for the primary pane | number \| `${number}px` \| `${number}%` | - |
| defaultSize | initial size for the primary pane | number \| `${number}px` \| `${number}%` | - |
| min | minimum size for the primary pane | number \| `${number}px` \| `${number}%` | 0 |
| max | maximum size for the primary pane | number \| `${number}px` \| `${number}%` | - |
| collapsible | allow the primary pane to collapse | boolean | false |
| collapsed | controlled collapsed state for the primary pane | boolean | - |
| defaultCollapsed | initial collapsed state for the primary pane | boolean | false |
| collapsedSize | pane size while collapsed | number \| `${number}px` \| `${number}%` | 0 |
| onCollapseChange | callback when collapsed state changes | `(collapsed: boolean) => void` | - |
| dragStep | pointer drag step | number | - |
| keyboardStep | keyboard resize step | number | 12 |
| separatorSize | visual separator thickness | number | 2 |
| separatorHitAreaSize | interactive separator hit area size | number | 16 |
| separatorClassName | class name applied to the separator interaction container | string | - |
| separatorStyle | inline style applied to the separator interaction container | CSSProperties | - |
| separatorRender | custom separator content renderer | `(props: { orientation; disabled; dragging; collapsed; collapsible; size; hitAreaSize; toggleCollapse }) => ReactNode` | - |
| onResize | callback when the primary pane size changes | `(size: number) => void` | - |
| onResizeStart | callback when resizing starts | `(size: number) => void` | - |
| onResizeEnd | callback when resizing ends | `(size: number) => void` | - |

### Split.Pane

| Property | Description | Type | Default |
| ----------------- | ----------------------------------------- | ------------------------------------- | ------------- |
| min | minimum pane size constraint | number \| `${number}px` \| `${number}%` | 0 |
| max | maximum pane size constraint | number \| `${number}px` \| `${number}%` | - |

## Notes

- `Split` always renders exactly two panes.
- Primary pane size and collapse props are configured on `Split`.
- `Split.Pane` only provides pane content plus per-pane `min` and `max` constraints.
- Pane-level `min` and `max` are still useful for protecting the non-primary pane from being squeezed too far.
- `defaultSize` is only used during initialization. After mount, uncontrolled pane size is stored as pixels.
- When `collapsible` is enabled, press `Enter` or `Space` on the separator to toggle collapse. Double-click also toggles it.
