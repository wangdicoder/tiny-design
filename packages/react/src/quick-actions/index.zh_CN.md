import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DirectionDemo from './demo/Direction';
import DirectionSource from './demo/Direction.tsx?raw';
import HoverDemo from './demo/Click';
import HoverSource from './demo/Click.tsx?raw';
import ControlledDemo from './demo/CustomIcon';
import ControlledSource from './demo/CustomIcon.tsx?raw';
import ActionBehaviorDemo from './demo/ActionBehavior';
import ActionBehaviorSource from './demo/ActionBehavior.tsx?raw';

# QuickActions 快捷操作

用于承载少量高优先级操作的浮动动作启动器。

## 何时使用

当页面或卡片存在一组需要始终可达、但又不希望长期占用布局空间的操作时，可以使用 QuickActions。

更适合以下场景：

- 2 到 5 个快捷操作
- 短链路、高频使用的动作
- 需要直接展示操作文案，而不是只靠图标和 tooltip 猜含义

## 使用

```jsx
import { QuickActions } from '@tiny-design/react';
```

## 示例

<Layout>
  <Column>
    <Demo>

### 产品化默认形态

点击展开，展示带标题和辅助说明的快捷操作。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Hover 或焦点触发

`trigger="hover"` 不只支持鼠标移入，也支持键盘焦点进入后的展开。

<DemoBlock component={HoverDemo} source={HoverSource} />

    </Demo>

  </Column>
  <Column>
    <Demo>

### 展开方向

支持 `up`、`down`、`left`、`right` 四个方向，方便适配不同边缘布局。

<DemoBlock component={DirectionDemo} source={DirectionSource} />

    </Demo>
    <Demo>

### 受控模式

当组件需要和外部产品状态联动时，可以使用 `open` 与 `onOpenChange`。

<DemoBlock component={ControlledDemo} source={ControlledSource} />

    </Demo>
    <Demo>

### Action 行为

通过 `closeOnActionClick={false}` 保持整个面板展开，或者用 `keepOpen` 只让特定 action 点击后保持展开。

<DemoBlock component={ActionBehaviorDemo} source={ActionBehaviorSource} />

    </Demo>

  </Column>
</Layout>

## API

### QuickActions

| 属性               | 说明                       | 类型                                                                                                                                     | 默认值            |
| ------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| icon               | 触发按钮图标               | ReactNode                                                                                                                                | `+`               |
| openIcon           | 展开后的触发按钮图标       | ReactNode                                                                                                                                | -                 |
| label              | 触发按钮的无障碍名称       | string                                                                                                                                   | `'Quick actions'` |
| direction          | 动作展开方向               | `up` \| `down` \| `left` \| `right`                                                                                                      | `up`              |
| trigger            | 触发展开方式               | `click` \| `hover`                                                                                                                       | `click`           |
| open               | 受控展开状态               | boolean                                                                                                                                  | -                 |
| defaultOpen        | 默认展开状态               | boolean                                                                                                                                  | false             |
| closeOnActionClick | 点击 action 后是否自动收起 | boolean                                                                                                                                  | true              |
| disabled           | 是否禁用                   | boolean                                                                                                                                  | false             |
| onOpenChange       | 展开状态变化回调           | `(open: boolean, context: { source: 'trigger-click' \| 'trigger-hover' \| 'focus' \| 'outside' \| 'escape' \| 'action-click' }) => void` | -                 |

### QuickActions.Action

| 属性        | 说明                             | 类型      | 默认值 |
| ----------- | -------------------------------- | --------- | ------ |
| icon        | 操作前置图标                     | ReactNode | -      |
| label       | 操作主文案                       | ReactNode | -      |
| description | 操作辅助说明                     | ReactNode | -      |
| danger      | 是否使用危险态样式               | boolean   | false  |
| loading     | 是否显示加载态并禁用该 action    | boolean   | false  |
| disabled    | 是否禁用                         | boolean   | false  |
| keepOpen    | 点击该 action 后是否保持面板展开 | boolean   | false  |
