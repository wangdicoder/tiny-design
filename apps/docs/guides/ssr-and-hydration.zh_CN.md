# SSR 与 Hydration

Tiny UI 可以正常运行在 SSR 应用中，但要分清两件事：

1. **组件在服务端的渲染**
2. **依赖浏览器 API 的主题状态**，例如 `localStorage`、`matchMedia` 或 DOM 属性

本指南会说明哪些能力在服务端是安全的，哪些只能放在客户端，以及如何避免 hydration mismatch 或首屏主题闪烁。

## 哪些内容适合 SSR

以下能力适合在服务端渲染时直接使用：

- 渲染 `Button`、`Card`、`Table`、`Layout` 等组件
- 渲染 `ConfigProvider`
- 给 `ConfigProvider` 传固定的 `theme` 字符串，例如 `"light"` 或 `"dark"`
- 给 `ConfigProvider theme={{ tokens: ... }}` 传固定 token 对象

示例：

```tsx
import { ConfigProvider, Button } from '@tiny-design/react';

export default function Page() {
  return (
    <ConfigProvider theme="dark">
      <Button variant="solid" color="primary">
        Button
      </Button>
    </ConfigProvider>
  );
}
```

这种写法在服务端和客户端都是确定性的，因此 hydration 会比较稳定。

## 哪些内容必须放在客户端

`useTheme()` 会读写浏览器状态：

- `localStorage`
- `window.matchMedia`
- `document.documentElement`
- `<html>` 上的 `data-tiny-theme` 属性

因此 `useTheme()` 只能放在 client component 中使用。

```tsx
'use client';

import { Button, useTheme } from '@tiny-design/react';

export default function ThemeToggle() {
  const { resolvedTheme, toggle } = useTheme();

  return (
    <Button variant="outline" color="primary" onClick={toggle}>
      Current: {resolvedTheme}
    </Button>
  );
}
```

不要在 server component 或纯服务端逻辑中调用 `useTheme()`。

## 首屏渲染与主题闪烁

SSR 场景下最常见的问题不是 hydration 失败，而是 **主题闪烁**：

- 服务端先按 light 渲染
- 浏览器恢复出用户之前保存的 dark 偏好
- 页面短暂显示 light，再切到 dark

通常有三种处理策略。

### 1. 服务端固定主题

如果你的应用对所有用户都使用固定模式，可以直接在服务端写死：

```html
<html data-tiny-theme="dark">
```

或者通过 `ConfigProvider theme="dark"` 传固定模式。

这是最简单、最稳定的方案。

### 2. 服务端已知用户偏好

如果应用把用户偏好保存在 cookie、header 或 session 中，就把同样的模式写进初始 HTML：

```html
<html data-tiny-theme="dark">
```

这样服务端和客户端的起点一致，hydration 阶段就不会发生模式切换。

### 3. 客户端恢复用户偏好

如果主题模式只保存在 `localStorage` 中，那么客户端启动后也可以恢复，但首屏可能会短暂使用默认模式。

这种方案下：

- 服务端输出要保持确定性
- 要接受可能出现的主题闪烁
- 不要让服务端和客户端根据未解析的主题状态渲染不同文本

## ConfigProvider 应该放在哪里

在 SSR 应用里，`ConfigProvider` 应该放在足够高的位置，保证同一套主题作用域覆盖整棵可交互子树。

推荐位置：

- 应用根布局
- 框架的根应用壳
- 只有在你明确需要局部作用域时，才放在某个路由布局里

示例：

```tsx
import { ConfigProvider } from '@tiny-design/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-tiny-theme="light">
      <body>
        <ConfigProvider>{children}</ConfigProvider>
      </body>
    </html>
  );
}
```

这样 token 作用域和 popup holder 在 hydration 前后都会更稳定。

## 如何避免 hydration mismatch

Hydration mismatch 通常来自服务端和客户端渲染了不同内容。

高风险写法：

```tsx
'use client';

import { useTheme } from '@tiny-design/react';

export default function Label() {
  const { resolvedTheme } = useTheme();
  return <span>{resolvedTheme === 'dark' ? 'Dark' : 'Light'}</span>;
}
```

如果服务端先按 light 渲染，而客户端又从存储里恢复出 dark，那么这段文本会立刻变化。

更稳妥的做法：

- 先渲染一个中性占位，挂载后再显示真实值
- 让服务端预先知道主题
- 优先让主题状态影响样式，而不是影响 SSR 文本内容

挂载后再显示的示例：

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@tiny-design/react';

export default function ThemeLabel() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span>Theme</span>;
  }

  return <span>{resolvedTheme}</span>;
}
```

## SSR 应用中的静态反馈 API

`Message`、`Notification`、`LoadingBar`、`Modal.open()` 这类静态 API 不会自动读取最近的 React 树 provider。

如果你希望它们继承主题或 locale，需要显式配置：

```tsx
import { ConfigProvider } from '@tiny-design/react';

ConfigProvider.config({
  holderRender: (children) => (
    <ConfigProvider theme="dark">
      {children}
    </ConfigProvider>
  ),
});
```

这段初始化应该放在客户端启动代码里，而不是纯服务端代码里。

## 推荐基线

- 服务端输出保持确定性
- 把 `ConfigProvider` 放在较高层级
- `useTheme()` 只放在 client component 中
- 如果可以，在服务端提前写入初始 `data-tiny-theme`
- 不要让未解析的客户端主题状态决定 SSR 文本内容

如果你使用的是 Next.js，这篇文档可以和 `在 Next.js 中使用` 以及 `在 Next.js Pages Router 中使用` 配合阅读。
