import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CheckAllDemo from './demo/CheckAll';
import CheckAllSource from './demo/CheckAll.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import GroupDemo from './demo/Group';
import GroupSource from './demo/Group.tsx?raw';

# Checkbox 复选框

多选组件。

## 使用场景

- 用于在多个选项中选择多个值。
- 如果只使用一个 Checkbox，其功能与 Switch 相同，用于在两种状态之间切换。区别在于 Switch 会直接触发状态变更，而 Checkbox 只是标记状态变更，需要配合提交操作。

## 使用方式

```jsx
import { Checkbox } from '@tiny-design/react';

const { Group } = Checkbox;
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

### 复选框组

复选框组件组。

<DemoBlock component={GroupDemo} source={GroupSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 全选

`indeterminate` 属性可以帮助你实现**全选**效果。

<DemoBlock component={CheckAllDemo} source={CheckAllSource} />

    </Demo>
    <Demo>

### 禁用

复选框的禁用状态。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Checkbox

| 属性           | 说明                             | 类型                                     | 默认值  |
| -------------- | ---------------------------------------- | ---------------------------------------- | ------- |
| value          | 仅在与 Group 配合使用时需要      | string                                   | -       |
| defaultChecked | 初始选中状态                     | boolean                                  | false   |
| checked        | 受控选中状态                     | boolean                                  | -       |
| indeterminate  | 半选状态（仅视觉效果）           | boolean                                  | false   |
| disabled       | 是否禁用                         | boolean                                  | false   |
| onChange       | 状态变化时的回调                 | (e: ChangeEvent) => void                 | -       |
| style          | 容器的样式对象                   | CSSProperties                            | -       |
| className      | 容器的类名                       | string                                   | -       |

### Checkbox.Group

| 属性         | 说明                       | 类型                             | 默认值  |
| ------------ | ---------------------------------- | -------------------------------- | ------- |
| defaultValue | 默认选中的值               | string[]                         | -       |
| value        | 受控选中的值               | string[]                         | -       |
| onChange     | 选择项变化时的回调         | (checkedValues: string[]) => void| -       |
| disabled     | 是否禁用所有复选框         | boolean                          | false   |