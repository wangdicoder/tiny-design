import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomFilterDemo from './demo/CustomFilter';
import CustomFilterSource from './demo/CustomFilter.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import AllowClearDemo from './demo/AllowClear';
import AllowClearSource from './demo/AllowClear.tsx?raw';
import NotFoundDemo from './demo/NotFound';
import NotFoundSource from './demo/NotFound.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';

# AutoComplete 自动完成

输入框自动完成功能。

## 使用场景

- 需要对输入框进行自动补全时。
- 与 Select 不同，AutoComplete 是一个增强的输入框，而不是从预定义选项中选择。

## 使用方式

```jsx
import { AutoComplete } from '@tiny-design/react';
```

## 示例

<Layout>
  <Column>
    <Demo>

### 基本用法

基本用法。输入以查看邮箱后缀建议。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 禁用

禁用的 AutoComplete。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### 无结果内容

使用 `notFoundContent` 在没有匹配选项时显示内容。

<DemoBlock component={NotFoundDemo} source={NotFoundSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 自定义过滤

使用 `filterOption` 实现自定义过滤逻辑。

<DemoBlock component={CustomFilterDemo} source={CustomFilterSource} />

    </Demo>
    <Demo>

### 可清除

设置 `allowClear` 在输入有值时显示清除按钮。

<DemoBlock component={AllowClearDemo} source={AllowClearSource} />

    </Demo>
    <Demo>

### 尺寸

三种尺寸：`sm`、`md`（默认）和 `lg`。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性                      | 说明                                     | 类型                                                          | 默认值  |
| ------------------------- | ---------------------------------------- | ------------------------------------------------------------- | ------- |
| options                   | 自动完成的数据源                         | \{ value, label?, disabled? \}[]                                | []      |
| value                     | 受控的输入值                             | string                                                        | -       |
| defaultValue              | 初始输入值                               | string                                                        | ''      |
| placeholder               | 输入框占位文本                           | string                                                        | -       |
| disabled                  | 是否禁用                                 | boolean                                                       | false   |
| allowClear                | 显示清除按钮                             | boolean                                                       | false   |
| defaultActiveFirstOption  | 是否默认高亮第一个选项                   | boolean                                                       | true    |
| open                      | 下拉菜单的受控展开状态                   | boolean                                                       | -       |
| defaultOpen               | 下拉菜单的初始展开状态                   | boolean                                                       | false   |
| notFoundContent           | 无匹配选项时显示的内容                   | ReactNode                                                     | -       |
| size                      | 输入框尺寸                               | 'sm' &#124; 'md' &#124; 'lg'                                 | 'md'    |
| filterOption              | 自定义过滤函数或 false 禁用过滤          | boolean &#124; (inputValue, option) => boolean                | true    |
| onChange                   | 输入值变化时的回调                       | (value: string) => void                                       | -       |
| onSelect                  | 选中选项时的回调                         | (value: string, option) => void                               | -       |
| onOpenChange              | 下拉展开状态变化时的回调                 | (open: boolean) => void                                       | -       |
| onSearch                  | 搜索时的回调                             | (value: string) => void                                       | -       |
| onFocus                   | 获得焦点时的回调                         | (e: FocusEvent) => void                                       | -       |
| onBlur                    | 失去焦点时的回调                         | (e: FocusEvent) => void                                       | -       |
