import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import LabelDemo from './demo/Label';
import LabelSource from './demo/Label.tsx?raw';
import PasswordDemo from './demo/Password';
import PasswordSource from './demo/Password.tsx?raw';

# StrengthIndicator 强度指示器

用于衡量密码强度的组件。

## 使用场景

在使用密码表单时。

## 使用方式

```jsx
import { StrengthIndicator } from '@tiny-design/react';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基础用法

简单的用法。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 显示标签

展示标签。

<DemoBlock component={LabelDemo} source={LabelSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 配合 `InputPassword` 使用

与 `InputPassword` 组件配合使用。

<DemoBlock component={PasswordDemo} source={PasswordSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性      | 说明                              | 类型                           | 默认值              |
| --------- | --------------------------------- | ------------------------------ | ------------------- |
| blocks    | 指示器色块数量                    | number                         | 3                   |
| current   | 当前激活值（从 0 开始）           | number                         | -                   |
| colors    | 每个色块的自定义颜色              | string[]                       | -                   |
| labels    | 色块下方的提示标签                | boolean &#124; ReactNode[]     | -                   |
| style     | 容器的样式对象                    | CSSProperties                  | -                   |
| className | 容器的类名                        | string                         | -                   |