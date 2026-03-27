import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import SelectableDemo from './demo/Selectable';
import SelectableSource from './demo/Selectable.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';

# Tree 树形控件

层级列表结构组件。

## 使用场景

任何可以用树形结构表示的内容都可以使用 `Tree` 组件。

## 使用方式

```jsx
import { Tree } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础用法

最简单的用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 可选择

节点可选择。

<DemoBlock component={SelectableDemo} source={SelectableSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 自定义图标

自定义树节点展开/收起图标。

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Tree

| 属性                | 说明                                            | 类型                                                   | 默认值  |
| ------------------- | ----------------------------------------------- | ------------------------------------------------------ | ------- |
| data                | 树形数据                                        | TreeData[]                                             | -       |
| indent              | 每级树节点的缩进像素                            | number                                                 | -       |
| checkable           | 在树节点前添加复选框                            | boolean                                                | false   |
| blockNode           | 树节点是否占满剩余空间                          | boolean                                                | false   |
| disabled            | 是否禁用整棵树                                  | boolean                                                | false   |
| defaultCheckedKeys  | 默认选中的节点 key 列表                         | string[]                                               | -       |
| defaultExpandedKeys | 默认展开的节点 key 列表                         | string[]                                               | -       |
| defaultExpandAll    | 是否默认展开所有节点                            | boolean                                                | false   |
| icon                | 自定义图标渲染函数                              | (isExpanded: boolean) => ReactNode                     | -       |
| onCheck             | 节点选中时的回调                                | (checkedKeys: string[], e: ChangeEvent) => void        | -       |
| onExpand            | 节点展开/折叠时的回调                           | (expandedKeys: string[], e: MouseEvent) => void        | -       |
| style               | 容器样式对象                                    | CSSProperties                                          | -       |
| className           | 容器的 className                                | string                                                 | -       |

### TreeData

| 属性            | 说明                                 | 类型                                  | 默认值  |
| --------------- | ------------------------------------ | ------------------------------------- | ------- |
| key             | 节点的唯一标识                       | string                                | -       |
| title           | 节点标题                             | ReactNode                             | -       |
| disableCheckbox | 是否禁用节点的复选框                 | boolean                               | false   |
| disabled        | 是否禁用该节点                       | boolean                               | false   |
| icon            | 自定义图标渲染函数                   | (isExpanded: boolean) => ReactNode    | -       |
| children        | 子树节点                             | TreeData[]                            | -       |