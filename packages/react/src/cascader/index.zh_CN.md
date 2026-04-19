import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ChangeOnSelectDemo from './demo/ChangeOnSelect';
import ChangeOnSelectSource from './demo/ChangeOnSelect.tsx?raw';
import DefaultValueDemo from './demo/DefaultValue';
import DefaultValueSource from './demo/DefaultValue.tsx?raw';
import HoverDemo from './demo/Hover';
import HoverSource from './demo/Hover.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import SizesDemo from './demo/Sizes';
import SizesSource from './demo/Sizes.tsx?raw';

# Cascader 级联选择

多级下拉选择，用于选择层级数据。

## 使用场景

用于从层级结构中选择数据，如地区选择（国家 > 省份 > 城市）或分类树。

## 使用方式

```jsx
import { Cascader } from '@tiny-design/react';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 基本用法

从国家 > 省/州 > 城市的层级中选择位置。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 悬停展开

悬停时展开子菜单而不是点击，以便更快地导航。

<DemoBlock component={HoverDemo} source={HoverSource} />

    </Demo>
    <Demo>

### 尺寸

三种尺寸以适应不同的表单密度。

<DemoBlock component={SizesDemo} source={SizesSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 默认值

预设默认值并自定义显示方式。

<DemoBlock component={DefaultValueDemo} source={DefaultValueSource} />

    </Demo>
    <Demo>

### 禁用选项

禁用特定选项或整个级联选择器。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### 即时选择

默认情况下，只有选中叶子节点才会触发 `onChange`。设置 `changeOnSelect` 可在每一级触发 `onChange`，允许部分选择。使用 `displayRender` 自定义选中路径的显示方式。

<DemoBlock component={ChangeOnSelectDemo} source={ChangeOnSelectSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性                   | 说明                   | 类型                                                      | 默认值         |
| ---------------------- | ---------------------- | --------------------------------------------------------- | -------------- |
| options                | 层级数据选项           | CascaderOption[]                                          |                |
| value                  | 选中值（受控）         | (string \| number)[]                                      |                |
| defaultValue           | 默认选中值             | (string \| number)[]                                      |                |
| onChange               | 选择变化回调           | (value, selectedOptions) => void                          |                |
| placeholder            | 占位文本               | string                                                    | 请选择          |
| disabled               | 禁用                   | boolean                                                   | false          |
| allowClear             | 显示清除按钮           | boolean                                                   | true           |
| size                   | 输入框大小             | 'sm' \| 'md' \| 'lg'                                    | md             |
| expandTrigger          | 子菜单展开触发方式     | 'click' \| 'hover'                                      | click          |
| displayRender          | 自定义显示内容         | (labels, options) => ReactNode                            |                |
| changeOnSelect         | 每级选择即触发变化     | boolean                                                   | false          |

### CascaderOption

| 属性     | 说明         | 类型              | 默认值  |
| -------- | ------------ | ----------------- | ------- |
| value    | 选项值       | string \| number  |         |
| label    | 选项标签     | ReactNode         |         |
| disabled | 禁用此选项   | boolean           | false   |
| children | 子选项       | CascaderOption[]  |         |
| isLeaf   | 标记为叶节点 | boolean           |         |