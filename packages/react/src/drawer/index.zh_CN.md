import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';
import MultiLevelDemo from './demo/MultiLevel';
import MultiLevelSource from './demo/MultiLevel.tsx?raw';

# Drawer

从屏幕边缘滑出的浮层面板。

## 使用场景

抽屉是一种通常覆盖在页面之上并从侧面滑入的面板。它包含一组信息或操作。由于用户无需离开当前页面即可与抽屉进行交互，因此可以在同一上下文中更高效地完成任务。

- 使用表单来创建或编辑一组信息。
- 处理子任务。当子任务对于气泡卡片来说过于复杂，同时又希望在主任务上下文中保留子任务时，抽屉非常方便。
- 当同一表单需要在多个地方使用时。

## 引入方式

```jsx
import { Drawer } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

基本的抽屉。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 多层抽屉

在现有抽屉上打开新抽屉以处理多分支任务。

<DemoBlock component={MultiLevelDemo} source={MultiLevelSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 位置

抽屉可以从屏幕的任何边缘出现。

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性              | 说明                                          | 类型                                                      | 默认值    |
| ----------------- | --------------------------------------------- | --------------------------------------------------------- | --------- |
| placement         | 抽屉的弹出位置                                | enum: `top` &#124; `bottom` &#124; `left` &#124; `right`  | `right`   |
| size              | 抽屉的宽度或高度                              | number &#124; string                                      | 256       |
| visible           | 抽屉是否可见                                  | boolean                                                   | -         |
| header            | 抽屉头部内容                                  | ReactNode                                                 | -         |
| footer            | 抽屉底部内容                                  | ReactNode                                                 | -         |
| closable          | 是否显示关闭按钮                              | boolean                                                   | `true`    |
| unmountOnClose    | 关闭时是否卸载子组件                          | boolean                                                   | `true`    |
| style	            | 容器的样式对象                                | CSSProperties                                             | -         |
| className	        | 容器的类名                                    | string                                                    | -         |