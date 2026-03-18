import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DisabledDemo from './demo/Disabled';
import DisabledSource from './demo/Disabled.tsx?raw';
import LoadingDemo from './demo/Loading';
import LoadingSource from './demo/Loading.tsx?raw';
import SizeDemo from './demo/Size';
import SizeSource from './demo/Size.tsx?raw';
import TextDemo from './demo/Text';
import TextSource from './demo/Text.tsx?raw';

# Switch

Switch 用于在两种对立状态之间切换。

## 使用场景

- 当需要表示两种状态之间的切换或开关状态时。
- Switch 和 Checkbox 的区别在于，Switch 切换时会直接触发状态变更，而 Checkbox 通常用于状态标记，需要配合提交操作使用。

## 引入方式

```jsx
import { Switch } from 'tiny-design';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

最基础的开关用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 文本和自定义元素

支持自定义文本内容。

<DemoBlock component={TextDemo} source={TextSource} />

    </Demo>
    <Demo>

### 不同尺寸

提供三种不同尺寸的开关。

<DemoBlock component={SizeDemo} source={SizeSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 加载状态

标识开关的加载状态。

<DemoBlock component={LoadingDemo} source={LoadingSource} />

    </Demo>
    <Demo>

### 禁用状态

禁用开关。

<DemoBlock component={DisabledDemo} source={DisabledSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性           | 说明                            | 类型                                          | 默认值  |
| -------------- | --------------------------------------- | --------------------------------------------- | ------- |
| defaultChecked | 初始选中状态                    | boolean                                       | false   |
| checked        | 受控选中状态                    | boolean                                       | -       |
| disabled       | 是否禁用                        | boolean                                       | false   |
| loading        | 加载状态                        | boolean                                       | false   |
| size           | 开关尺寸                        | enum: `sm` &#124; `md` &#124; `lg`            | `md`    |
| checkedText    | 选中时的内容                    | ReactNode                                     | -       |
| uncheckedText  | 未选中时的内容                  | ReactNode                                     | -       |
| onChange       | 状态变化时的回调                | (checked: boolean, e: MouseEvent) => void     | -       |
| onClick        | 点击回调                        | (checked: boolean, e: MouseEvent) => void     | -       |
| style          | 容器的样式对象                  | CSSProperties                                 | -       |
| className      | 容器的类名                      | string                                        | -       |