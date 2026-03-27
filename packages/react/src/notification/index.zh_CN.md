import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DurationDemo from './demo/Duration';
import DurationSource from './demo/Duration.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';
import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';

# Notification 通知提醒

显示通知消息。

## 使用场景

在视口的四个角落之一显示通知消息。通常可用于以下场景：

- 包含复杂内容的通知。

- 基于用户交互提供反馈的通知，或者展示用户后续可能需要执行的步骤详情。

- 由应用推送的通知。

## 引入方式

```js
import { Notification } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

最简单的用法，4.5 秒后自动关闭。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 控制关闭时间

通过设置 `duration` 为 0 可以禁用自动关闭。

<DemoBlock component={DurationDemo} source={DurationSource} />

    </Demo>
    <Demo>

### 自定义图标

可以自定义图标为任意 React 节点。

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 位置

通知框可以从视口的 `topRight`、`bottomRight`、`bottomLeft` 或 `topLeft` 弹出。

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
    <Demo>

### 不同类型的通知

左侧带图标的通知。

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
  </Column>
</Layout>

## API

Notification 通过静态方法调用：

| 方法                         | 说明                   |
| --------------------------- | ---------------------- |
| Notification.success(config) | 显示成功通知          |
| Notification.error(config)   | 显示错误通知          |
| Notification.warning(config) | 显示警告通知          |
| Notification.info(config)    | 显示信息通知          |
| Notification.open(config)    | 显示普通通知          |

### Config

| 属性        | 说明                                       | 类型                              | 默认值       |
| ----------- | ------------------------------------------ | --------------------------------- | ------------ |
| title       | 通知标题                                   | ReactNode                         | -            |
| description | 通知描述内容                               | ReactNode                         | -            |
| footer      | 自定义底部内容                             | ReactNode                         | -            |
| duration    | 自动关闭的延时，单位为秒，设为 0 则不自动关闭 | number                          | 4.5          |
| icon        | 自定义图标，设为 false 则隐藏              | ReactNode &#124; boolean          | -            |
| onClick     | 点击回调                                   | (e: MouseEvent) => void           | -            |
| onClose     | 关闭回调                                   | (e: MouseEvent) => void           | -            |
| placement   | 通知弹出位置                               | enum: `top-right` &#124; `top-left` &#124; `bottom-right` &#124; `bottom-left` | `top-right` |