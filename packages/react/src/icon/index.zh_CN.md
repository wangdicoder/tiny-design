import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeAndColorDemo from './demo/SizeAndColor';
import SizeAndColorSource from './demo/SizeAndColor.tsx?raw';
import SpinDemo from './demo/Spin';
import SpinSource from './demo/Spin.tsx?raw';
import SvgIconList from './demo/svg-icons.tsx'

# Icon 图标

来自 `@tiny-design/icons` 的 SVG 图标组件。每个图标都是独立模块，打包工具可以 tree-shake 未使用的图标。

## 引入方式

```bash
$ pnpm add @tiny-design/icons
```
<br />

```jsx
import { IconClose, IconPlus } from '@tiny-design/icons';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础用法

引入独立的 SVG 图标组件。每个图标都可以被 tree-shake。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 旋转动画

使用 `withSpin` 高阶组件为任意图标添加持续的旋转动画，常用于加载指示器。

<DemoBlock component={SpinDemo} source={SpinSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 尺寸与颜色

使用 `size` 和 `color` 属性自定义图标。

<DemoBlock component={SizeAndColorDemo} source={SizeAndColorSource} />

    </Demo>
  </Column>
</Layout>

## API

所有图标组件共享相同的 props 接口 (`IconProps`)，继承自 `SVGAttributes<SVGSVGElement>`。

| 属性      | 说明                     | 类型              | 默认值           |
| --------- | ------------------------ | ----------------- | ---------------- |
| size      | 图标尺寸（宽高）          | string \| number  | `'1em'`          |
| color     | 图标填充颜色              | string            | `'currentColor'` |
| className | CSS 类名                 | string            | -                |
| style     | 行内样式                  | CSSProperties     | -                |
| ref       | 转发 ref                 | Ref\<SVGSVGElement\> | -             |

### withSpin

一个高阶组件，为任意图标添加持续的旋转动画。

```jsx
import { withSpin } from '@tiny-design/react';
import { IconLoader } from '@tiny-design/icons';

const SpinLoader = withSpin(IconLoader);

<SpinLoader size={24} />
```

## 图标列表

<SvgIconList />