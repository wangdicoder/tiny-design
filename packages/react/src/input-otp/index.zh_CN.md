import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import MaskDemo from './demo/Mask';
import MaskSource from './demo/Mask.tsx?raw';
import LengthDemo from './demo/Length';
import LengthSource from './demo/Length.tsx?raw';
import SeparatorDemo from './demo/Separator';
import SeparatorSource from './demo/Separator.tsx?raw';
import FormatterDemo from './demo/Formatter';
import FormatterSource from './demo/Formatter.tsx?raw';
import AutoFocusDemo from './demo/AutoFocus';
import AutoFocusSource from './demo/AutoFocus.tsx?raw';

# Input OTP

用于输入验证码、一次性密码（OTP / One-Time Password）等短字符/数字序列。

## 使用场景

登录、注册或双因素认证流程中的验证码输入。

## 引入方式

```js
import { InputOTP } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

基本的 OTP 输入。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 尺寸

提供三种尺寸：`sm`、`md`（默认）和 `lg`。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### 长度

使用 `length` 属性设置 OTP 单元格数量。

<DemoBlock component={LengthDemo} source={LengthSource} />

    </Demo>
    <Demo>

### 遮罩

使用 `mask` 隐藏输入值（适用于 PIN 码）。也可以设置自定义遮罩字符。

<DemoBlock component={MaskDemo} source={MaskSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 分隔符

使用 `separator` 属性自定义单元格之间的分隔符。

<DemoBlock component={SeparatorDemo} source={SeparatorSource} />

    </Demo>
    <Demo>

### 禁用状态

使用 `disabled` 属性禁用 OTP 输入。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### 受控模式 & 格式化器

使用 `value` 进行受控模式，使用 `formatter` 限制输入。

<DemoBlock component={FormatterDemo} source={FormatterSource} />

    </Demo>
    <Demo>

### 自动聚焦

使用 `autoFocus` 在组件挂载时自动聚焦第一个单元格。

<DemoBlock component={AutoFocusDemo} source={AutoFocusSource} />

    </Demo>
  </Column>
</Layout>

## API

### InputOTP

| 属性         | 说明                                   | 类型                                            | 默认值 |
| ------------ | -------------------------------------- | ----------------------------------------------- | ------ |
| length       | 输入单元格数量                          | number                                          | 6      |
| value        | 受控值                                  | string                                          | -      |
| defaultValue | 默认值                                  | string                                          | -      |
| size         | 输入尺寸                                | enum: `sm` &#124; `md` &#124; `lg`              | `md`   |
| disabled     | 是否禁用                                | boolean                                         | false  |
| mask         | 是否遮罩输入，或自定义遮罩字符            | boolean &#124; string                           | -      |
| formatter    | 格式化展示值                            | (value: string) => string                       | -      |
| separator    | 单元格之间的分隔内容                     | ((index: number) => ReactNode) &#124; ReactNode | -      |
| autoFocus    | 组件挂载后自动聚焦第一个单元格            | boolean                                         | false  |
| autoComplete | HTML autocomplete 属性                   | string                                          | `one-time-code` |
| onChange     | 当值发生变化时触发的回调                  | (value: string) => void                         | -      |
| style        | 容器样式                                | CSSProperties                                   | -      |
| className    | 容器类名                                | string                                          | -      |