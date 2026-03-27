import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';

# LoadingBar 加载进度条

显示当前加载进度。

## 使用场景

在浏览器顶部显示加载进度条，用于表示内容正在获取和渲染中。

## 使用方式

```jsx
import { LoadingBar } from 'tiny-design';

LoadingBar.start();
LoadingBar.succeed();
LoadingBar.fail();
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
  <Column>
  </Column>
</Layout>

## Props

LoadingBar 通过静态方法调用：

| 方法                | 说明                     | 类型       |
| ------------------- | ------------------------ | ---------- |
| LoadingBar.start()  | 开始加载进度条           | () => void |
| LoadingBar.succeed() | 以成功状态完成          | () => void |
| LoadingBar.fail()   | 以失败状态完成           | () => void |
