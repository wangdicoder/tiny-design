import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ControlledDemo from './demo/Controlled';
import ControlledSource from './demo/Controlled.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import FormatDemo from './demo/Format';
import FormatSource from './demo/Format.tsx?raw';
import StepDemo from './demo/Step';
import StepSource from './demo/Step.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import DisabledTimeDemo from './demo/DisabledTime';
import DisabledTimeSource from './demo/DisabledTime.tsx?raw';
import HideDisabledDemo from './demo/HideDisabled';
import HideDisabledSource from './demo/HideDisabled.tsx?raw';
import ExtraFooterDemo from './demo/ExtraFooter';
import ExtraFooterSource from './demo/ExtraFooter.tsx?raw';
import LoopDemo from './demo/Loop';
import LoopSource from './demo/Loop.tsx?raw';

# TimePicker 时间选择器

用于选择或输入时间。

## 使用方式

```jsx
import { TimePicker } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本使用

基础时间选择器。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 受控模式

通过 `value` 和 `onChange` 完全控制。

<DemoBlock component={ControlledDemo} source={ControlledSource} />

    </Demo>
    <Demo>

### 时间格式

使用 `format` 控制显示内容。省略秒则隐藏秒列。

<DemoBlock component={FormatDemo} source={FormatSource} />

    </Demo>
    <Demo>

### 禁用时间

使用 `disabledTime` 设置不可选的小时、分钟或秒。

<DemoBlock component={DisabledTimeDemo} source={DisabledTimeSource} />

    </Demo>
    <Demo>

### 额外页脚

在面板底部渲染额外内容。

<DemoBlock component={ExtraFooterDemo} source={ExtraFooterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 三种大小

三种尺寸：`sm`、`md`（默认）、`lg`。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### 步长间隔

自定义时间选项的间隔。

<DemoBlock component={StepDemo} source={StepSource} />

    </Demo>
    <Demo>

### 禁用

禁用时间选择器。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### 隐藏禁用选项

结合 `disabledTime` 和 `hideDisabledOptions` 从面板中完全移除不可用的时间。

<DemoBlock component={HideDisabledDemo} source={HideDisabledSource} />

    </Demo>
    <Demo>

### 无限循环滚动

启用循环滚动，列可以无限循环。

<DemoBlock component={LoopDemo} source={LoopSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性                | 说明                                 | 类型                                    | 默认值        |
| ------------------- | ------------------------------------ | --------------------------------------- | ------------- |
| defaultValue        | 默认时间                             | Date                                    | -             |
| value               | 受控时间值                           | Date                                    | -             |
| open                | 控制弹出层显示                       | boolean                                 | -             |
| format              | 显示格式                             | string                                  | `HH:mm:ss`   |
| use12Hours          | 使用 12 小时制                       | boolean                                 | false         |
| hourStep            | 小时间隔步长                         | number                                  | 1             |
| minuteStep          | 分钟间隔步长                         | number                                  | 1             |
| secondStep          | 秒间隔步长                           | number                                  | 1             |
| disabled            | 禁用选择器                           | boolean                                 | false         |
| placeholder         | 输入框占位文本                       | string                                  | `Select time` |
| allowClear          | 显示清除按钮                         | boolean                                 | true          |
| size                | 输入框尺寸                           | `sm` &#124; `md` &#124; `lg`            | `md`          |
| inputReadOnly       | 阻止键盘输入                         | boolean                                 | true          |
| disabledTime        | 指定不可选择的时间                   | () => DisabledTime                      | -             |
| hideDisabledOptions | 隐藏禁用的时间选项                   | boolean                                 | false         |
| showNow             | 显示"此刻"按钮                       | boolean                                 | true          |
| renderExtraFooter   | 页脚附加内容                         | () => ReactNode                         | -             |
| suffixIcon          | 自定义后缀图标                       | ReactNode                               | Clock icon    |
| loop                | 启用无限循环滚动                     | boolean                                 | false         |
| onChange            | 时间变化时的回调                     | (date: Date &#124; null) => void        | -             |
| onOpenChange        | 弹出层打开/关闭时的回调             | (open: boolean) => void                 | -             |
| style               | 容器的样式对象                       | CSSProperties                           | -             |
| className           | 容器的类名                           | string                                  | -             |

### DisabledTime

```typescript
interface DisabledTime {
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: (hour: number, minute: number) => number[];
}
```