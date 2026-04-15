import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ControlledDemo from './demo/Controlled';
import ControlledSource from './demo/Controlled.tsx?raw';
import DefaultValueDemo from './demo/DefaultValue';
import DefaultValueSource from './demo/DefaultValue.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import NoSelectionDemo from './demo/NoSelection';
import NoSelectionSource from './demo/NoSelection.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';

# Segmented 分段控制器

用于在一组选项间进行单选切换的分段控制器。

## 使用场景

当有 2-5 个互斥选项时，作为 Radio.Group 的可视化替代方案。

## 使用方式

```jsx
import { Segmented } from 'tiny-design';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 基础用法

最简单的使用方式。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 带图标

使用 `icon` 属性为分段选项添加图标。

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
    <Demo>

### 受控模式

当选中状态由外部管理时，使用 `value` 和 `onChange`。

<DemoBlock component={ControlledDemo} source={ControlledSource} />

    </Demo>
    <Demo>

### 默认无选中

不传 `value` 或 `defaultValue` 时，初始状态下不会选中任何选项。

<DemoBlock component={NoSelectionDemo} source={NoSelectionSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 尺寸

三种尺寸: `sm`, `md`, `lg`。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
    <Demo>

### 禁用

禁用整个控件或单个选项。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### 初始值

在非受控模式下，使用 `defaultValue` 设置初始选中项。

<DemoBlock component={DefaultValueDemo} source={DefaultValueSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性         | 说明                           | 类型                                                  | 默认值  |
| ------------ | ------------------------------ | ----------------------------------------------------- | ------- |
| options      | 分段选项列表                   | SegmentedOption[]                                     |         |
| name         | 内部 radio 的共享名称          | string                                                | 自动生成 |
| value        | 当前选中值（受控）             | string \| number                                      |         |
| defaultValue | 初始选中值                     | string \| number                                      |         |
| onChange     | 值变化时的回调                 | (value, option, event) => void                        |         |
| block        | 撑满父元素宽度                 | boolean                                               | false   |
| disabled     | 禁用整个控件                   | boolean                                               | false   |
| size         | 控件大小                       | 'sm' \| 'md' \| 'lg'                                  | md      |

### SegmentedOption

| 属性      | 说明                     | 类型      | 默认值  |
| --------- | ------------------------ | --------- | ------- |
| value     | 选项值                   | string \| number |  |
| label     | 显示内容                 | ReactNode |         |
| disabled  | 禁用此选项               | boolean   | false   |
| icon      | 图标                     | ReactNode |         |
| title     | 标题与可访问名称兜底     | string    |         |
| className | 选项项的自定义类名       | string    |         |
