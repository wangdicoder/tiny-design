import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import AlignDemo from './demo/Align';
import AlignSource from './demo/Align.tsx?raw';
import GapDemo from './demo/Gap';
import GapSource from './demo/Gap.tsx?raw';
import WrapDemo from './demo/Wrap';
import WrapSource from './demo/Wrap.tsx?raw';

# Flex 弹性布局

弹性盒子布局容器，使用 CSS `gap` 设置间距，无需额外包裹子元素。

## 使用场景

Flex 是一个一维布局容器，适合将元素排列在一行或一列中。

- **工具栏与操作栏** — 将一组按钮、图标或控件水平排列，间距一致。
- **导航菜单** — 水平排列导航项，或构建垂直侧边栏列表。
- **表单字段行** — 将标签、输入框和提示文字并排放置。
- **卡片头部 / 底部** — 使用 `justify="space-between"` 将操作按钮推到两端。
- **垂直堆叠** — 使用 `vertical` 纵向堆叠内容，如卡片列表或设置分组。
- **标签 / 徽标组** — 配合 `wrap="wrap"` 和统一的 `gap` 渲染可自动换行的标签集合。

### Flex 与 Row 的区别

两者底层都使用 Flexbox，但适用场景不同：

- 选择 **Flex** — 需要一个通用的弹性盒子容器，使用 CSS `gap` 控制间距，不涉及栏数语义。
- 选择 **Row / Col** — 需要 24 栏栅格结构，使用 `span`、`offset` 和响应式断点（`xs` 到 `xxl`）。

## 使用方式

```jsx
import { Flex } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本布局

使用 `vertical` 控制方向。默认为水平方向。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 对齐方式

设置 `justify` 和 `align` 控制元素对齐。

<DemoBlock component={AlignDemo} source={AlignSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 间距

预设尺寸 `sm` (8px)、`md` (16px)、`lg` (24px)，或通过滑块自定义数值。

<DemoBlock component={GapDemo} source={GapSource} />

    </Demo>
    <Demo>

### 换行

设置 `wrap` 使元素自动换行。

<DemoBlock component={WrapDemo} source={WrapSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性       | 说明                          | 类型                                                                 | 默认值  |
| --------- | ----------------------------- | -------------------------------------------------------------------- | ------- |
| vertical  | 设置为纵向排列                  | `boolean`                                                            | `false` |
| wrap      | CSS flex-wrap 属性             | `nowrap` &#124; `wrap` &#124; `wrap-reverse`                         | -       |
| justify   | CSS justify-content 属性       | `string`                                                             | -       |
| align     | CSS align-items 属性           | `string`                                                             | -       |
| gap       | 子元素间距                     | `sm` &#124; `md` &#124; `lg` &#124; `number` &#124; `string`        | -       |
| flex      | CSS flex 简写属性               | `string`                                                             | -       |
| component | 自定义元素类型                  | `React.ElementType`                                                  | `div`   |