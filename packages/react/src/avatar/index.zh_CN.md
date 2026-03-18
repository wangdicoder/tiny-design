import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';
import GroupDemo from './demo/Group';
import GroupSource from './demo/Group.tsx?raw';
import PresenceDemo from './demo/Presence';
import PresenceSource from './demo/Presence.tsx?raw';
import AutoFontDemo from './demo/AutoFont';
import AutoFontSource from './demo/AutoFont.tsx?raw';

# Avatar

头像用于代表用户或事物，支持 `image`、`Icon` 或 `letter` 三种类型。

## 使用场景

展示用户头像图片

## 引入方式

```jsx
import { Avatar } from 'tiny-design';

const { Group } = Avatar;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

通过 `size` 设置不同尺寸，支持两种形状。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 类型

支持图片、图标和文字，后两种可以自定义颜色和背景色。

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
    <Demo>

### 头像组

在 `AvatarGroup` 容器中包含多个头像项。

<DemoBlock component={GroupDemo} source={GroupSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 状态指示器

头像也支持状态指示器。添加 `online`、`busy`、`away` 或 `offline` 属性显示不同的状态颜色。

<DemoBlock component={PresenceDemo} source={PresenceSource} />

    </Demo>
    <Demo>

### 自动调整字体大小

对于文字类型的头像，当文字过长时，字体大小可以根据头像宽度自动调整。

<DemoBlock component={AutoFontDemo} source={AutoFontSource} />

    </Demo>
  </Column>
</Layout>

## API

### Avatar

| 属性      | 说明                                      | 类型                                                          | 默认值    |
| --------- | ----------------------------------------- | ------------------------------------------------------------- | --------- |
| size      | 头像大小                                  | number                                                        | 38        |
| presence  | 状态指示器                                | enum: `online` &#124; `busy` &#124; `away` &#124; `offline`   | undefined |
| shape     | 头像形状                                  | enum: `circle` &#124; `square`                                | `circle`  |
| icon      | 传入图标组件进行展示                      | ReactNode                                                     | -         |
| src	    | 图片地址                                  | string                                                        | -         |
| alt	    | 图片替代文本                              | string                                                        | -         |
| style	    | 容器样式对象                              | CSSProperties                                                 | -         |
| className	| 容器的 className                          | string                                                        | -         |

### Avatar.Group

| 属性      | 说明                                      | 类型                                                          | 默认值    |
| --------- | ----------------------------------------- | ------------------------------------------------------------- | --------- |
| gap       | 两个头像之间的距离                        | number &#124; string                                          | -15       |