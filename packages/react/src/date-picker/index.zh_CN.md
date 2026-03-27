import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import PickerDemo from './demo/Picker';
import PickerSource from './demo/Picker.tsx?raw';
import DisabledDateDemo from './demo/DisabledDate';
import DisabledDateSource from './demo/DisabledDate.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import ExtraFooterDemo from './demo/ExtraFooter';
import ExtraFooterSource from './demo/ExtraFooter.tsx?raw';

# DatePicker 日期选择器

用于选择或输入日期。

## 引入方式

```jsx
import { DatePicker } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

带有"今天"快捷选项的基本日期选择器。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 选择器类型

使用 `picker` 在日期、月份和年份选择之间切换。

<DemoBlock component={PickerDemo} source={PickerSource} />

    </Demo>
    <Demo>

### 禁用日期

使用 `disabledDate` 使特定日期不可选择。此示例禁用所有过去的日期。

<DemoBlock component={DisabledDateDemo} source={DisabledDateSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 尺寸

三种尺寸：`sm`、`md`（默认）、`lg`。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### 禁用

禁用的日期选择器。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### 额外页脚

在面板页脚渲染额外内容。

<DemoBlock component={ExtraFooterDemo} source={ExtraFooterSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性                | 说明                                 | 类型                                              | 默认值        |
| ------------------- | ------------------------------------ | ------------------------------------------------- | ------------- |
| defaultValue        | 默认日期                             | Date                                              | -             |
| value               | 受控日期值                           | Date                                              | -             |
| open                | 控制弹出层显示                       | boolean                                           | -             |
| picker              | 选择粒度                             | `date` &#124; `month` &#124; `year`               | `date`        |
| format              | 显示格式                             | string                                            | `YYYY-MM-DD`  |
| disabled            | 禁用选择器                           | boolean                                           | false         |
| placeholder         | 输入框占位文本                       | string                                            | `Select date` |
| allowClear          | 显示清除按钮                         | boolean                                           | true          |
| size                | 输入框尺寸                           | `sm` &#124; `md` &#124; `lg`                      | `md`          |
| showToday           | 在页脚显示"今天"链接                 | boolean                                           | true          |
| inputReadOnly       | 阻止键盘输入                         | boolean                                           | true          |
| disabledDate        | 禁用特定日期                         | (current: Date) => boolean                        | -             |
| renderExtraFooter   | 页脚附加内容                         | (mode: PanelMode) => ReactNode                    | -             |
| suffixIcon          | 自定义后缀图标                       | ReactNode                                         | Calendar icon |
| onChange            | 日期变化时的回调                     | (date: Date &#124; null, dateString: string) => void | -          |
| onOpenChange        | 弹出层打开/关闭时的回调             | (open: boolean) => void                           | -             |
| onPanelChange       | 面板模式切换时的回调                 | (date: Date, mode: PanelMode) => void             | -             |
| style               | 容器的样式对象                       | CSSProperties                                     | -             |
| className           | 容器的类名                           | string                                            | -             |