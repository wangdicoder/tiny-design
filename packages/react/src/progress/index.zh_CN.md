import ProgressBarDemo from './demo/ProgressBar';
import ProgressBarSource from './demo/ProgressBar.tsx?raw';
import ProgressCircleDemo from './demo/ProgressCircle';
import ProgressCircleSource from './demo/ProgressCircle.tsx?raw';
import InternalTextDemo from './demo/InternalText';
import InternalTextSource from './demo/InternalText.tsx?raw';
import ActiveDemo from './demo/Active';
import ActiveSource from './demo/Active.tsx?raw';
import LinearGradientDemo from './demo/LinearGradient';
import LinearGradientSource from './demo/LinearGradient.tsx?raw';
import DynamicDemo from './demo/Dynamic';
import DynamicSource from './demo/Dynamic.tsx?raw';
import CustomTextDemo from './demo/CustomText';
import CustomTextSource from './demo/CustomText.tsx?raw';
import ReverseDemo from './demo/Reverse';
import ReverseSource from './demo/Reverse.tsx?raw';
import SquareLinecapsDemo from './demo/SquareLinecaps';
import SquareLinecapsSource from './demo/SquareLinecaps.tsx?raw';

# Progress

展示操作流程的当前进度。

## 使用场景

如果一项操作需要较长时间才能完成，可以使用 Progress 来显示当前进度和状态。
- 当操作会中断当前界面，或者需要在后台运行超过 2 秒时。
- 当需要展示操作的完成百分比时。

## 引入方式

```jsx
import { Progress } from 'tiny-design';

const { Bar, Circle } = Progress;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 进度条

标准的进度条。

<DemoBlock component={ProgressBarDemo} source={ProgressBarSource} />

    </Demo>
    <Demo>

### 圆形进度

圆形进度。

<DemoBlock component={ProgressCircleDemo} source={ProgressCircleSource} />

    </Demo>
    <Demo>

### 内部文本

设置 `innerText` 来在进度条内部显示文本。

<DemoBlock component={InternalTextDemo} source={InternalTextSource} />

    </Demo>
    <Demo>

### 动态背景样式

设置 `backgroundType` 来显示不同的进度条背景。

<DemoBlock component={ActiveDemo} source={ActiveSource} />

    </Demo>
    <Demo>

### 自定义线性渐变

使用 `linear-gradient`。传入颜色数组到 `strokeColor` 属性。

> 更多渐变颜色预设，请访问 [Awesome Gradient](https://wangdicoder.github.io/awesome-gradient/)。

<DemoBlock component={LinearGradientDemo} source={LinearGradientSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 动态进度

控制进度值。

<DemoBlock component={DynamicDemo} source={DynamicSource} />

    </Demo>
    <Demo>

### 自定义文本格式

通过设置 `format` 属性来自定义文本。

<DemoBlock component={CustomTextDemo} source={CustomTextSource} />

    </Demo>
    <Demo>

### 反向

设置 `reverse` 来控制方向。

> 仅适用于 **Circle** 圆形进度。

<DemoBlock component={ReverseDemo} source={ReverseSource} />

    </Demo>
    <Demo>

### 方头端点

通过设置 `strokeLinecap="square"`，可以将端点从圆头改为方头。

<DemoBlock component={SquareLinecapsDemo} source={SquareLinecapsSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性      | 说明                             | 类型                               | 默认值  |
| --------- | -------------------------------- | ---------------------------------- | ------- |
| size      | 选择尺寸                         | enum: `sm` &#124; `md` &#124; `lg` | `md`    |
| disabled  | 是否禁用选择                     | boolean                            | false   |
| style	    | 容器样式对象                     | CSSProperties                      | -       |
| className	| 容器的 className                 | string                             | -       |