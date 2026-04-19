import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import DurationDemo from './demo/Duration';
import DurationSource from './demo/Duration.tsx?raw';
import ExtraDemo from './demo/Extra';
import ExtraSource from './demo/Extra.tsx?raw';
import TypeDemo from './demo/Type';
import TypeSource from './demo/Type.tsx?raw';

# Message 全局提示

全局展示操作反馈信息。

## 使用场景

- 用于提供成功、警告、错误等反馈信息。

- 消息显示在页面顶部居中位置，会自动消失，是一种不打断用户操作的轻量级提示方式。

## 使用方式

```jsx
import { Message } from '@tiny-design/react';
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 正常消息

用于显示提示信息。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 自定义时长

自定义消息显示时长，从默认的 `3s` 改为 `10s`。

<DemoBlock component={DurationDemo} source={DurationSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 不同类型

包括 `info`、`success`、`warning`、`error` 和 `loading` 五种类型。

<DemoBlock component={TypeDemo} source={TypeSource} />

    </Demo>
    <Demo>

### 额外操作

在消息后面添加额外操作。

<DemoBlock component={ExtraDemo} source={ExtraSource} />

    </Demo>
  </Column>
</Layout>

## Props

Message 通过静态方法调用：

| 方法                  | 说明                   |
| --------------------- | ---------------------- |
| Message.success(config) | 显示成功消息         |
| Message.error(config)   | 显示错误消息         |
| Message.warning(config) | 显示警告消息         |
| Message.info(config)    | 显示信息消息         |
| Message.loading(config) | 显示加载消息         |

### Config

| 属性     | 说明                                    | 类型      | 默认值  |
| -------- | --------------------------------------- | --------- | ------- |
| content  | 消息内容                                | string    | -       |
| duration | 自动关闭的延时，单位为秒                | number    | 3       |
| icon     | 自定义图标                              | ReactNode | -       |
| extra    | 消息后的附加内容                        | ReactNode | -       |