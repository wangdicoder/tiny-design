import Basic from './demo/basic.md'
import Size from './demo/size.md'
import Disabled from './demo/disabled.md'
import Mask from './demo/mask.md'
import Length from './demo/length.md'
import Separator from './demo/separator.md'
import Formatter from './demo/formatter.md'
import AutoFocus from './demo/auto-focus.md'

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
    <Basic/>
    <Size/>
    <Length/>
    <Mask/>
  </Column>
  <Column>
    <Separator/>
    <Disabled/>
    <Formatter/>
    <AutoFocus/>
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

