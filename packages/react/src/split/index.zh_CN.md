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

Split 用于把一个区域拆成两个可调尺寸的 pane，提供顶层主 pane 尺寸配置、主 pane 模型、可折叠侧栏，以及可自定义的 separator。

## 用法

```jsx
import { Split } from 'tiny-design';
```

当两个 pane 需要共享同一块区域，并且希望用户自己调整空间分配时，可以使用 `Split`。通常建议：

- 把主 pane 的尺寸模型统一配置在 `Split` 上，例如 `size`、`defaultSize`、`min`、`max`。
- 当右侧或下侧 pane 才是主要被控制的一侧时，使用 `primary="second"`。
- separator 视觉上保持细一些，拖拽不够好抓时再通过 `separatorHitAreaSize` 放大热区。

## 示例

<Layout>
  <Column>
    <Demo>

### 水平布局

默认的左右布局，适合导航加工作区这类最常见的双栏场景。

<DemoBlock component={HorizontalDemo} source={HorizontalSource} />

    </Demo>
    <Demo>

### 垂直布局

当内容更适合上下拆分时使用 `orientation="vertical"`，比如预览区和属性区。

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### 可折叠 Pane

当主 pane 更像侧栏，需要临时收起但不希望离开当前布局时，可以开启 `collapsible`。

<DemoBlock component={CollapseDemo} source={CollapseSource} />

    </Demo>
    <Demo>

### 自定义 Separator

通过 `separatorRender` 可以替换默认 handle，同时保留已有的拖拽、键盘和折叠行为。

<DemoBlock component={CustomHandleDemo} source={CustomHandleSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 约束

配合 `primary`、`min`、`max` 以及 pane 级约束，可以把某一侧限制在更合理的产品布局范围内。

<DemoBlock component={MultipleDemo} source={MultipleSource} />

    </Demo>
    <Demo>

### 热区尺寸

当 separator 视觉上需要保持纤细，但拖拽命中范围要更大时，可以通过 `separatorHitAreaSize` 放大热区。

<DemoBlock component={HitAreaSizeDemo} source={HitAreaSizeSource} />

    </Demo>
    <Demo>

### 嵌套布局

`Split` 可以嵌套使用，用来构建“侧栏 + 上下内容区”这类页面骨架。每一层只负责一件布局决策会更清晰。

<DemoBlock component={NestDemo} source={NestSource} />

    </Demo>
    <Demo>

### 步进调整

当面板移动需要按固定节奏吸附，而不是连续自由拖拽时，可以使用 `dragStep` 和 `keyboardStep`。

<DemoBlock component={StepDemo} source={StepSource} />

    </Demo>
  </Column>
</Layout>

## API

### Split

| 属性 | 说明 | 类型 | 默认值 |
| ----------------- | ----------------------------------------- | ------------------------------------- | ------------- |
| orientation | pane 排列方向；`horizontal` 表示左右，`vertical` 表示上下 | enum: `horizontal` \| `vertical` | `horizontal` |
| primary | 哪个 pane 持有可调整尺寸模型 | enum: `first` \| `second` | `first` |
| disabled | 禁用拖拽与键盘调整 | boolean | false |
| size | 主 pane 的受控尺寸 | number \| `${number}px` \| `${number}%` | - |
| defaultSize | 主 pane 的初始尺寸 | number \| `${number}px` \| `${number}%` | - |
| min | 主 pane 的最小尺寸 | number \| `${number}px` \| `${number}%` | 0 |
| max | 主 pane 的最大尺寸 | number \| `${number}px` \| `${number}%` | - |
| collapsible | 是否允许主 pane 折叠 | boolean | false |
| collapsed | 主 pane 的受控折叠状态 | boolean | - |
| defaultCollapsed | 主 pane 的初始折叠状态 | boolean | false |
| collapsedSize | 折叠后的 pane 尺寸 | number \| `${number}px` \| `${number}%` | 0 |
| onCollapseChange | 折叠状态变化时触发 | `(collapsed: boolean) => void` | - |
| dragStep | 指针拖拽步进 | number | - |
| keyboardStep | 键盘调整步进 | number | 12 |
| separatorSize | separator 视觉厚度 | number | 2 |
| separatorHitAreaSize | separator 交互热区尺寸 | number | 16 |
| separatorClassName | 应用于 separator 交互容器的类名 | string | - |
| separatorStyle | 应用于 separator 交互容器的内联样式 | CSSProperties | - |
| separatorRender | 自定义 separator 内容渲染函数 | `(props: { orientation; disabled; dragging; collapsed; collapsible; size; hitAreaSize; toggleCollapse }) => ReactNode` | - |
| onResize | 主 pane 尺寸变化时触发 | `(size: number) => void` | - |
| onResizeStart | 开始调整尺寸时触发 | `(size: number) => void` | - |
| onResizeEnd | 结束调整尺寸时触发 | `(size: number) => void` | - |

### Split.Pane

| 属性 | 说明 | 类型 | 默认值 |
| ----------------- | ----------------------------------------- | ------------------------------------- | ------------- |
| min | pane 最小尺寸约束 | number \| `${number}px` \| `${number}%` | 0 |
| max | pane 最大尺寸约束 | number \| `${number}px` \| `${number}%` | - |

## 说明

- `Split` 固定渲染两个 pane。
- 主 pane 的尺寸与折叠属性统一配置在 `Split` 上。
- `Split.Pane` 只负责 pane 内容以及每个 pane 的 `min`、`max` 约束。
- pane 级 `min`、`max` 依然适合用来保护非主 pane，不让它被压得过小。
- `defaultSize` 仅在初始化时参与计算；挂载后非受控尺寸会以像素值维护。
- 开启 `collapsible` 后，可在 separator 上按 `Enter` / `Space`，或双击 separator 进行折叠切换。
