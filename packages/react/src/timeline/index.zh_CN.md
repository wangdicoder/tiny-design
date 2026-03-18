import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CenteredDemo from './demo/Centered';
import CenteredSource from './demo/Centered.tsx?raw';
import ColorDemo from './demo/Color';
import ColorSource from './demo/Color.tsx?raw';
import CustomisedDemo from './demo/Customised';
import CustomisedSource from './demo/Customised.tsx?raw';

# Timeline

展示时间线。

## 使用场景

- 当一系列信息需要按时间排序（升序或降序）时。

- 当需要通过时间线进行视觉上的关联时。

## 引入方式

```jsx
import { Timeline } from 'tiny-design';

const { Item } = Timeline;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础

基础时间线。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 自定义圆点

设置节点为图标或其他自定义元素。

<DemoBlock component={CustomisedDemo} source={CustomisedSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 颜色

通过 `dotStyle` 设置圆点颜色。

<DemoBlock component={ColorDemo} source={ColorSource} />

    </Demo>
    <Demo>

### 居中

时间线居中显示。

<DemoBlock component={CenteredDemo} source={CenteredSource} />

    </Demo>
  </Column>
</Layout>

## API

### Timeline

| 属性      | 说明                             | 类型                           | 默认值       |
| --------- | -------------------------------- | ------------------------------ | ------------ |
| position  | 时间线轴的位置                   | enum: `left` &#124; `center`   | `left`       |
| style	    | 容器样式对象                     |                                | -            |
| className	| 容器的 className                 | string                         | -            |

### Timeline.Item

| 属性      | 说明                             | 类型                           | 默认值       |
| --------- | -------------------------------- | ------------------------------ | ------------ |
| dot       | 自定义时间线圆点                 | `string` &#124; `ReactNode`    | -            |
| dotStyle	| 圆点样式对象                     |                                | -            |
| style	    | 容器样式对象                     |                                | -            |
| className	| 容器的 className                 | string                         | -            |