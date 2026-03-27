import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import PrecisionDemo from './demo/Precision';
import PrecisionSource from './demo/Precision.tsx?raw';

# InputNumber 数字输入框

通过鼠标或键盘输入指定范围内的数值。

## 使用场景

当需要提供一个数值时使用。

## 使用方式

```jsx
import { InputNumber } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

最简单的用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 禁用状态

点击按钮切换可用和禁用状态。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 尺寸

不同尺寸的数字输入框。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### 精度

通过 `precision` 设置小数精度，使用 `controls` 始终显示步进按钮。

<DemoBlock component={PrecisionDemo} source={PrecisionSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性          | 说明                                          | 类型                                  | 默认值                    |
| ------------- | ----------------------------------------------------- | ------------------------------------- | ------------------------- |
| min           | 最小值                                        | number                                | Number.NEGATIVE_INFINITY  |
| max           | 最大值                                        | number                                | Number.POSITIVE_INFINITY  |
| step          | 每次递增或递减的步长，可以为小数或整数        | number                                | 1                         |
| defaultValue  | 初始值                                        | number                                | 0                         |
| value         | 当前值                                        | number                                | -                         |
| onChange      | 值变化时的回调                                | (value, e) => void                    | -                         |
| size          | 输入框尺寸                                    | enum: `sm` &#124; `md` &#124; `lg`    | `md`                      |
| disabled      | 是否禁用输入框                                | boolean                               | false                     |
| controls      | 是否始终显示控制器                            | boolean                               | false                     |
| style	        | 容器的样式对象                                |                                       | -                         |
| className	    | 容器的类名                                    | string                                | -                         |