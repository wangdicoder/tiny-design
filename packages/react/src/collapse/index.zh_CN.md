import AccordionDemo from './demo/Accordion';
import AccordionSource from './demo/Accordion.tsx?raw';
import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import BorderlessDemo from './demo/Borderless';
import BorderlessSource from './demo/Borderless.tsx?raw';
import DeletableDemo from './demo/Deletable';
import DeletableSource from './demo/Deletable.tsx?raw';
import ExtraDemo from './demo/Extra';
import ExtraSource from './demo/Extra.tsx?raw';
import NestedDemo from './demo/Nested';
import NestedSource from './demo/Nested.tsx?raw';

# Collapse 折叠面板

用于组织密集信息的分层展开组件。

## 使用方式

```tsx
import { Collapse } from '@tiny-design/react';
```

新版 `Collapse` 完全采用 `items` 数据驱动，展开状态统一建模为 `string[]`。

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 单项展开

设置 `multiple={false}` 后，同一时间只保留一个展开项。

<DemoBlock component={AccordionDemo} source={AccordionSource} />

    </Demo>
    <Demo>

### 嵌套

<DemoBlock component={NestedDemo} source={NestedSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 无边框

<DemoBlock component={BorderlessDemo} source={BorderlessSource} />

    </Demo>
    <Demo>

### 可删除

通过 `extra` 配合受控状态，从数据源中移除面板。

<DemoBlock component={DeletableDemo} source={DeletableSource} />

    </Demo>
    <Demo>

### 动态头部内容

`label`、`extra` 和 `expandIcon` 都可以根据面板状态动态渲染。

<DemoBlock component={ExtraDemo} source={ExtraSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Collapse

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面板配置数组 | `CollapseItem[]` | - |
| value | 当前展开项，受控模式 | `string[]` | - |
| defaultValue | 初始展开项 | `string[]` | `[]` |
| onValueChange | 展开项变化回调 | `(value: string[]) => void` | - |
| multiple | 是否允许同时展开多个面板 | `boolean` | `true` |
| bordered | 是否显示外层边框 | `boolean` | `true` |
| size | 预设尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| showArrow | 是否渲染展开图标区域 | `boolean` | `true` |
| expandIcon | 自定义展开图标节点或渲染函数 | `ReactNode \| ((state) => ReactNode)` | - |
| expandIconPosition | 展开图标位置 | `'start' \| 'end'` | `'start'` |
| disabled | 是否禁用全部面板 | `boolean` | `false` |
| collapsible | 默认触发区域 | `'header' \| 'icon' \| 'disabled'` | `'header'` |
| destroyOnHidden | 收起后在过渡结束时卸载内容 | `boolean` | `false` |
| forceRender | 是否预渲染全部面板内容 | `boolean` | `false` |
| itemClassName | 统一的面板项类名 | `string` | - |
| itemStyle | 统一的面板项样式 | `CSSProperties` | - |
| headerClassName | 统一的头部类名 | `string` | - |
| bodyClassName | 统一的内容区类名 | `string` | - |
| onItemClick | 点击面板触发器时的回调 | `(key: string, event: React.MouseEvent) => void` | - |

### CollapseItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 面板唯一标识 | `string` | - |
| label | 头部内容或渲染函数 | `ReactNode \| ((state) => ReactNode)` | - |
| children | 面板内容 | `ReactNode` | - |
| extra | 头部右侧额外内容 | `ReactNode \| ((state) => ReactNode)` | - |
| disabled | 是否禁用当前面板 | `boolean` | `false` |
| collapsible | 覆盖当前面板的触发区域 | `'header' \| 'icon' \| 'disabled'` | 继承父级 |
| forceRender | 预渲染当前面板内容 | `boolean` | 继承父级 |
| destroyOnHidden | 收起后在过渡结束时卸载当前面板内容 | `boolean` | 继承父级 |
| className | 面板项类名 | `string` | - |
| style | 面板项内联样式 | `CSSProperties` | - |

### Render State

渲染函数会收到：

```ts
type CollapseRenderState = {
  active: boolean;
  disabled: boolean;
  panelKey: string;
};
```
