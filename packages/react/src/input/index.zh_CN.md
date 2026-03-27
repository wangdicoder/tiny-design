import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import AddonDemo from './demo/Addon';
import AddonSource from './demo/Addon.tsx?raw';
import AddonButtonDemo from './demo/AddonButton';
import AddonButtonSource from './demo/AddonButton.tsx?raw';
import PreSufFixDemo from './demo/PreSufFix';
import PreSufFixSource from './demo/PreSufFix.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import ClearableDemo from './demo/Clearable';
import ClearableSource from './demo/Clearable.tsx?raw';

# Input 输入框

基本的用户输入组件，是一个文本输入框。支持通过键盘和鼠标来提供或修改数据。

## 使用场景

在表单中需要用户输入内容时使用。

## 使用方式

```js
import { Input } from 'tiny-design';

const { Group, Addon } = Input;
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

### 添加附件

使用 `Addon` 组件的示例。

<DemoBlock component={AddonDemo} source={AddonSource} />

    </Demo>
    <Demo>

### 带按钮的附件

在 `Addon` 组件中添加按钮来组合成输入表单，如搜索功能。

> 传递 `noBorder` 属性给 `Addon` 组件。

<DemoBlock component={AddonButtonDemo} source={AddonButtonSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 前缀和后缀

在输入框内添加前缀或后缀图标。

<DemoBlock component={PreSufFixDemo} source={PreSufFixSource} />

    </Demo>
    <Demo>

### 三种尺寸

输入框有三种尺寸：`lg`、`md` 和 `sm`。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### 带清除图标

允许清除所有内容。

<DemoBlock component={ClearableDemo} source={ClearableSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Input

| 属性         | 说明                             | 类型                                        | 默认值  |
| ------------ | ---------------------------------------- | ------------------------------------------- | ------- |
| value        | 输入框内容值                     | string                                      | -       |
| defaultValue | 输入框初始值                     | string                                      | -       |
| size         | 输入框尺寸                       | enum: `sm` &#124; `md` &#124; `lg`          | `md`    |
| clearable    | 是否允许清除输入内容             | boolean                                     | false   |
| prefix       | 前缀图标或元素                   | ReactNode                                   | -       |
| suffix       | 后缀图标或元素                   | ReactNode                                   | -       |
| disabled     | 是否禁用                         | boolean                                     | false   |
| onChange     | 值变化时的回调                   | (e: ChangeEvent) => void                    | -       |
| onEnterPress | 按下 Enter 键时的回调            | (e: KeyboardEvent) => void                  | -       |
| onClearClick | 点击清除按钮时的回调             | (e: MouseEvent) => void                     | -       |
| style        | 容器的样式对象                   | CSSProperties                               | -       |
| className    | 容器的类名                       | string                                      | -       |

### Input.Group

| 属性      | 说明                      | 类型                                | 默认值  |
| --------- | ----------------------------- | ----------------------------------- | ------- |
| size      | 组尺寸                    | enum: `sm` &#124; `md` &#124; `lg` | `md`    |
| disabled  | 是否禁用所有输入框        | boolean                             | false   |

### Input.Addon

| 属性      | 说明                       | 类型      | 默认值  |
| --------- | ------------------------------ | --------- | ------- |
| noBorder  | 移除附加组件的边框         | boolean   | false   |