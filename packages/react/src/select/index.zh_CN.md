import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SearchDemo from './demo/Search';
import SearchSource from './demo/Search.tsx?raw';
import MultipleDemo from './demo/Multiple';
import MultipleSource from './demo/Multiple.tsx?raw';
import SizesDemo from './demo/Sizes';
import SizesSource from './demo/Sizes.tsx?raw';
import GroupsDemo from './demo/Groups';
import GroupsSource from './demo/Groups.tsx?raw';
import CustomDemo from './demo/Custom';
import CustomSource from './demo/Custom.tsx?raw';
import RenderDemo from './demo/Render';
import RenderSource from './demo/Render.tsx?raw';

# Select 选择器

从选项中选择值的选择器组件。

## 使用场景

- 用于展示选项的下拉菜单。
- 支持单选或多选。
- 支持搜索/过滤、自定义渲染和数据驱动的选项。

## 使用方式

```jsx
import { Select } from 'tiny-design';

const { Option, OptGroup } = Select;
```

## 示例

<Layout>
  <Column>
    <Demo>

### 基本用法

Select 组件的基本用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 搜索

带搜索功能的下拉框。设置 `showSearch` 启用过滤功能。

<DemoBlock component={SearchDemo} source={SearchSource} />

    </Demo>
    <Demo>

### 多选

多选模式会将已选项目展示为标签。设置 `mode="multiple"`，可配合 `showSearch` 进行过滤。

<DemoBlock component={MultipleDemo} source={MultipleSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 尺寸

三种尺寸：`sm`、`md`（默认）和 `lg`。

<DemoBlock component={SizesDemo} source={SizesSource} />

    </Demo>
    <Demo>

### 分组

使用 `OptGroup` 对选项进行分组。

<DemoBlock component={GroupsDemo} source={GroupsSource} />

    </Demo>
    <Demo>

### 自定义渲染和加载

使用 `options` 属性进行数据驱动渲染，`optionRender` 自定义选项内容，`loading` 显示加载状态。

<DemoBlock component={CustomDemo} source={CustomSource} />

    </Demo>
    <Demo>

### 自定义渲染

使用 `optionRender` 自定义下拉项，`labelRender` 自定义选中标签。

<DemoBlock component={RenderDemo} source={RenderSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Select

| 属性                    | 说明                                     | 类型                                                          | 默认值      |
| ----------------------- | ---------------------------------------- | ------------------------------------------------------------- | ----------- |
| value                   | 当前选中的值                             | string &#124; string[]                                        | -           |
| defaultValue            | 初始选中的值                             | string &#124; string[]                                        | -           |
| mode                    | 选择模式                                 | 'multiple' &#124; 'tags'                                      | -           |
| showSearch              | 启用搜索过滤                             | boolean                                                       | false       |
| filterOption            | 自定义过滤函数或禁用过滤                 | boolean &#124; (inputValue, option) => boolean                | true        |
| onSearch                | 搜索输入变化时的回调                     | (value: string) => void                                       | -           |
| onChange                | 值变化时的回调                           | (value, option) => void                                       | -           |
| onSelect                | 选中选项时的回调                         | (value: string &#124; string[]) => void                       | -           |
| allowClear              | 显示清除按钮                             | boolean                                                       | false       |
| loading                 | 在下拉菜单中显示加载动画                 | boolean                                                       | false       |
| size                    | 选择器尺寸                               | 'sm' &#124; 'md' &#124; 'lg'                                 | 'md'        |
| maxTagCount             | 多选模式下最多显示的标签数               | number                                                        | -           |
| notFoundContent         | 无匹配选项时显示的内容                   | ReactNode                                                     | 'No data'   |
| options                 | 数据驱动的选项（children 的替代方式）    | \{ value, label?, disabled? \}[]                                | -           |
| optionRender            | 自定义选项渲染                           | (option, \{ index \}) => ReactNode                              | -           |
| labelRender             | 自定义选中标签渲染                       | (\{ label, value \}) => ReactNode                               | -           |
| placeholder             | 占位文本                                 | string                                                        | -           |
| disabled                | 是否禁用                                 | boolean                                                       | false       |
| defaultOpen             | 下拉菜单的初始展开状态                   | boolean                                                       | false       |
| open                    | 下拉菜单的受控展开状态                   | boolean                                                       | -           |
| onDropdownVisibleChange | 下拉菜单展开状态变化时的回调             | (open: boolean) => void                                       | -           |
| dropdownStyle           | 下拉菜单的样式                           | CSSProperties                                                 | -           |
| style                   | 容器的样式对象                           | CSSProperties                                                 | -           |
| className               | 容器的类名                               | string                                                        | -           |

### Option

| 属性      | 说明                           | 类型        | 默认值  |
| --------- | ------------------------------ | ----------- | ------- |
| value     | 选项的值                       | string      | -       |
| label     | 显示标签（覆盖 children）      | ReactNode   | -       |
| disabled  | 是否禁用                       | boolean     | false   |

### OptGroup

| 属性     | 说明            | 类型   | 默认值  |
| -------- | --------------- | ------ | ------- |
| label    | 分组标签        | string | -       |