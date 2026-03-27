import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import HideButtonDemo from './demo/HideButton';
import HideButtonSource from './demo/HideButton.tsx?raw';
import StrengthDemo from './demo/Strength';
import StrengthSource from './demo/Strength.tsx?raw';

# InputPassword 密码输入框

带有切换密码可见性触发器的输入组件。

## 使用场景

用户输入密码时的专用场景。

## 引入方式

```jsx
import { InputPassword } from 'tiny-design';
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

### 隐藏按钮

可以隐藏后缀按钮。

<DemoBlock component={HideButtonDemo} source={HideButtonSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 配合强度指示器

与 `StrengthIndicator` 组件配合使用。

<DemoBlock component={StrengthDemo} source={StrengthSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性           | 说明                              | 类型       | 默认值  |
| -------------- | ----------------------------------------- | ---------- | ------- |
| suffix         | 是否显示可见性切换按钮            | boolean    | true    |
| visibleOnClick | 点击可见性按钮时的回调            | () => void | -       |
| style	         | 容器的样式对象                    |            | -       |
| className	     | 容器的类名                        | string     | -       |