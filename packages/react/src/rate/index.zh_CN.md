import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CharacterDemo from './demo/Character';
import CharacterSource from './demo/Character.tsx?raw';
import ClearableDemo from './demo/Clearable';
import ClearableSource from './demo/Clearable.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import HalfDemo from './demo/Half';
import HalfSource from './demo/Half.tsx?raw';

# Rate 评分

## 使用场景

- 展示评价结果。

- 对事物进行快速评分操作。

## 使用方式

```jsx
import { Rate } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

最简单的用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 半星

支持选择半星。

<DemoBlock component={HalfDemo} source={HalfSource} />

    </Demo>
    <Demo>

### 清除星标

支持设置允许再次点击清除星标。

<DemoBlock component={ClearableDemo} source={ClearableSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 只读

只读状态，不可交互。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
    <Demo>

### 其他字符

可以用其他字符如字母、数字、图标或其他语言的文字替换默认的五角星。

<DemoBlock component={CharacterDemo} source={CharacterSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性         | 说明                           | 类型                    | 默认值  |
| ------------ | -------------------------------------- | ----------------------- | ------- |
| count        | 星星总数                       | number                  | 5       |
| defaultValue | 初始值                         | number                  | 0       |
| value        | 受控当前值                     | number                  | -       |
| half         | 是否允许半星选择               | boolean                 | false   |
| clearable    | 是否允许再次点击清除           | boolean                 | false   |
| disabled     | 是否为只读状态                 | boolean                 | false   |
| color        | 自定义星星颜色                 | string                  | -       |
| character    | 自定义评分字符                 | ReactNode               | -       |
| onChange     | 值变化时的回调                 | (value: number) => void | -       |
| style        | 容器的样式对象                 | CSSProperties           | -       |
| className    | 容器的类名                     | string                  | -       |
