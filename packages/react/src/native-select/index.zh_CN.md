import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import GroupDemo from './demo/Group';
import GroupSource from './demo/Group.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';

# NativeSelect 原生选择器

从选项中选择值的选择器组件。

## 使用场景
- 基于原生 `<select>` 元素封装的轻量级选择组件。
- 用于展示选项的下拉菜单。
- 分组选项——原生 `<optgroup>` 的优雅替代方案。

## 引入方式

```js
import { NativeSelect } from 'tiny-design';

const { Group, Option } = NativeSelect;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础用法

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 尺寸

使用 `size` 设置不同尺寸的选择器

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 分组

<DemoBlock component={GroupDemo} source={GroupSource} />

    </Demo>
    <Demo>

### 禁用

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性      | 说明                     | 类型                          | 默认值  |
| --------- | -------------------------------- | ----------------------------- | ------- |
| size      | 选择器尺寸               | enum: `sm` `md` `lg`          | `md`    |
| disabled  | 是否禁用选择             | boolean                       | false   |
| style	    | 容器的样式对象           |                               | -       |
| className	| 容器的类名               | string                        | -       |
