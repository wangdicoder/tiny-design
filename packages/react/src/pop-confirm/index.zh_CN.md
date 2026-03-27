import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';
import LocaleDemo from './demo/Locale';
import LocaleSource from './demo/Locale.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';

# PopConfirm 气泡确认框

轻量级的确认对话框。

## 使用场景

用于询问用户确认的简洁紧凑的对话框。

与确认模态对话框的区别在于，它比全屏弹出的静态确认模态框更加轻量。

## 使用方式

```jsx
import { PopConfirm } from 'tiny-design';
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

### 位置

共有12个位置可选。

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 自定义按钮文字

设置 `confirmText` 和 `cancelText` 自定义按钮文字。

<DemoBlock component={LocaleDemo} source={LocaleSource} />

    </Demo>
    <Demo>

### 自定义图标

设置 `icon` 属性自定义图标。

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
</Layout>

## Props

继承所有 [Popover](#/components/popover) 属性，以及：

| 属性        | 说明                     | 类型                     | 默认值    |
| ----------- | ------------------------ | ------------------------ | --------- |
| confirmText | 确认按钮文本             | string                   | `OK`      |
| cancelText  | 取消按钮文本             | string                   | `Cancel`  |
| onConfirm   | 确认回调                 | (e: MouseEvent) => void  | -         |
| onCancel    | 取消回调                 | (e: MouseEvent) => void  | -         |
| icon        | 自定义图标               | ReactNode                | -         |