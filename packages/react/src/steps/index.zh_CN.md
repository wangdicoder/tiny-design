import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';
import PlacementDemo from './demo/Placement';
import PlacementSource from './demo/Placement.tsx?raw';
import VerticalDemo from './demo/Vertical';
import VerticalSource from './demo/Vertical.tsx?raw';
import SwitchDemo from './demo/Switch';
import SwitchSource from './demo/Switch.tsx?raw';
import ClickableDemo from './demo/Clickable';
import ClickableSource from './demo/Clickable.tsx?raw';

# Steps 步骤条

`Steps` 通过编号步骤传达进度。它提供了一种类似向导的工作流。

## 使用场景

当某个任务比较复杂或者存在先后顺序的一系列子任务时，可以将其分解为多个步骤，使流程更加清晰。

## 使用方式

```jsx
import { Steps } from 'tiny-design';

const { Step } = Steps;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础

最基础的步骤条。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 带图标

使用自定义图标。

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
    <Demo>

### 切换步骤

控制步骤。

<DemoBlock component={SwitchDemo} source={SwitchSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 标签位置

使用 `labelPlacement` 设置标题和描述的方向。

> 仅适用于 `horizontal` 步骤条。

<DemoBlock component={PlacementDemo} source={PlacementSource} />

    </Demo>
    <Demo>

### 垂直

垂直方向的步骤条。

<DemoBlock component={VerticalDemo} source={VerticalSource} />

    </Demo>
    <Demo>

### 可点击

点击切换步骤。

<DemoBlock component={ClickableDemo} source={ClickableSource} />

    </Demo>
  </Column>
</Layout>

## Props

### Steps

步骤条的整体组件。

| 属性          | 说明                                                               | 类型                                                              | 默认值       |
| ----------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------- |
| current           | 设置当前步骤                                                     | number                                                            | -             |
| defaultCurrent    | 默认的当前步骤                                                | number                                                            | 0             |
| direction         | 步骤条的方向                                  | enum: `horizontal` &#124; `vertical`                              | `horizontal`  |
| status            | 当前步骤的状态                                                    | enum: `wait` &#124; `process`  &#124; `finish`  &#124; `error`    | `process`     |
| labelPlacement    | 标题和描述的放置方向（水平或垂直）    | enum: `horizontal` &#124; `vertical`                              | `vertical`    |
| onChange          | 步骤变化时的回调                                             | (current: number) => void                                         | -             |

### Steps.Step

步骤条中的单个步骤。

| 属性          | 说明                                       | 类型                          | 默认值   |
| ----------------- | ------------------------------------------------- | ----------------------------- | --------- |
| title             | 步骤的标题                                | ReactNode                     | -         |
| description       | 步骤的描述                          | ReactNode                     | -         |
| icon              | 自定义步骤图标                        | ReactNode                     | -         |
| status            | 覆盖 `Steps` 的状态                         | enum: `wait` &#124; `process`  &#124; `finish`  &#124; `error`    | -     |
| disabled          | 禁用点击事件                          | boolean                       | -         |