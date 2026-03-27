import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DirectionDemo from './demo/Direction';
import DirectionSource from './demo/Direction.tsx?raw';
import ClickDemo from './demo/Click';
import ClickSource from './demo/Click.tsx?raw';
import CustomIconDemo from './demo/CustomIcon';
import CustomIconSource from './demo/CustomIcon.tsx?raw';

# SpeedDial 快捷操作

悬浮按钮，展开后显示一组操作。

## 使用场景

当需要一个悬浮操作按钮来展示多个相关操作时使用。常用于页面底部角落的快速操作入口。

## 使用方式

```jsx
import { SpeedDial } from 'tiny-design';
```

## 示例

<Layout>
  <Column>
    <Demo>

### 基础用法

基础的 SpeedDial，hover 时展开。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 点击触发

设置 `trigger="click"` 可以通过点击触发展开。

<DemoBlock component={ClickDemo} source={ClickSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 方向

支持四个展开方向：`up`、`down`、`left`、`right`。

<DemoBlock component={DirectionDemo} source={DirectionSource} />

    </Demo>
    <Demo>

### 自定义图标

可以自定义主按钮图标和展开后的图标。

<DemoBlock component={CustomIconDemo} source={CustomIconSource} />

    </Demo>
  </Column>
</Layout>

## Props

### SpeedDial

| 属性      | 说明                       | 类型                                                   | 默认值   |
| --------- | -------------------------- | ------------------------------------------------------ | -------- |
| icon      | 主按钮图标                 | ReactNode                                              | `+`      |
| openIcon  | 展开时显示的图标           | ReactNode                                              | -        |
| direction | 操作项展开方向             | enum: `up` &#124; `down` &#124; `left` &#124; `right` | `up`     |
| open      | 受控的展开状态             | boolean                                                | -        |
| trigger   | 触发方式                   | enum: `hover` &#124; `click`                           | `hover`  |
| onOpen    | 展开时的回调               | () => void                                             | -        |
| onClose   | 关闭时的回调               | () => void                                             | -        |
| disabled  | 是否禁用                   | boolean                                                | false    |

### SpeedDial.Action

| 属性             | 说明             | 类型                                                    | 默认值  |
| ---------------- | ---------------- | ------------------------------------------------------- | ------- |
| icon             | 操作按钮图标     | ReactNode                                               | -       |
| tooltip          | 提示文字         | string                                                  | -       |
| tooltipPlacement | 提示位置         | enum: `left` &#124; `right` &#124; `top` &#124; `bottom` | -       |
| disabled         | 是否禁用         | boolean                                                 | false   |