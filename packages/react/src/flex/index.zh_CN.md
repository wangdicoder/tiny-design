import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import AlignDemo from './demo/Align';
import AlignSource from './demo/Align.tsx?raw';
import GapDemo from './demo/Gap';
import GapSource from './demo/Gap.tsx?raw';
import WrapDemo from './demo/Wrap';
import WrapSource from './demo/Wrap.tsx?raw';

# Flex

弹性盒子布局容器，使用 CSS `gap` 设置间距，无需额外包裹子元素。

## 使用场景

需要轻量级弹性布局时使用，无需为每个子元素添加额外的包裹元素。

## 引入方式

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

## API

| 属性       | 说明                          | 类型                                                                 | 默认值  |
| --------- | ----------------------------- | -------------------------------------------------------------------- | ------- |
| vertical  | 设置为纵向排列                  | `boolean`                                                            | `false` |
| wrap      | CSS flex-wrap 属性             | `nowrap` &#124; `wrap` &#124; `wrap-reverse`                         | -       |
| justify   | CSS justify-content 属性       | `string`                                                             | -       |
| align     | CSS align-items 属性           | `string`                                                             | -       |
| gap       | 子元素间距                     | `sm` &#124; `md` &#124; `lg` &#124; `number` &#124; `string`        | -       |
| flex      | CSS flex 简写属性               | `string`                                                             | -       |
| component | 自定义元素类型                  | `React.ElementType`                                                  | `div`   |