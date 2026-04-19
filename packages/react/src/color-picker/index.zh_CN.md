import AlphaDemo from './demo/Alpha';
import AlphaSource from './demo/Alpha.tsx?raw';
import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import FormatDemo from './demo/Format';
import FormatSource from './demo/Format.tsx?raw';
import OklchDemo from './demo/Oklch';
import OklchSource from './demo/Oklch.tsx?raw';
import TriggerDemo from './demo/Trigger';
import TriggerSource from './demo/Trigger.tsx?raw';

# ColorPicker 颜色选择器

颜色选择组件，支持色谱、色相滑块、预设色板和格式切换。

## 使用场景

用于视觉编辑工具、主题定制和设计系统中的颜色选择。

## 使用方式

```jsx
import { ColorPicker } from '@tiny-design/react';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 基本用法

点击色块打开颜色选择面板。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 格式

在 `hex`、`rgb`、`hsb` 和 `oklch` 输出格式之间切换。

<DemoBlock component={FormatDemo} source={FormatSource} />

    </Demo>
    <Demo>

### 结构化变化信息

同时读取格式化后的值和结构化颜色信息。

<DemoBlock component={OklchDemo} source={OklchSource} />

    </Demo>
    <Demo>

### 透明度

使用 `showAlpha` 启用透明度滑块。

<DemoBlock component={AlphaDemo} source={AlphaSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 禁用

禁用的颜色选择器。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### 触发方式

悬停时打开面板而不是点击。

<DemoBlock component={TriggerDemo} source={TriggerSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性           | 说明                 | 类型                             | 默认值  |
| -------------- | -------------------- | -------------------------------- | ------- |
| value          | 颜色值（受控）       | string                           |         |
| defaultValue   | 默认颜色值           | string                           | #6e41bf |
| onChange       | 颜色变化回调         | `(color: string, meta: { color: Color; format: ColorFormat }) => void` |         |
| onChangeComplete | 交互完成时的颜色变化回调 | `(color: string, meta: { color: Color; format: ColorFormat }) => void` |         |
| format         | 颜色格式             | `'hex' \| 'rgb' \| 'hsb' \| 'oklch'` | hex     |
| defaultFormat  | 默认颜色格式         | `'hex' \| 'rgb' \| 'hsb' \| 'oklch'` | hex     |
| formats        | 可切换的格式列表     | `ColorFormat[]`                  | `['hex', 'rgb', 'hsb', 'oklch']` |
| onFormatChange | 格式变化回调         | `(format: ColorFormat) => void` |         |
| presets        | 预设颜色             | string[]                         |         |
| showAlpha      | 显示透明度滑块       | boolean                          | false   |
| disabled       | 禁用                 | boolean                          | false   |
| trigger        | 触发方式             | 'click' \| 'hover'             | click   |
| open           | 面板显示（受控）     | boolean                          |         |
| onOpenChange   | 面板显示变化回调     | (open: boolean) => void          |         |
