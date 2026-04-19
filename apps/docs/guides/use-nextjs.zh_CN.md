import { Tabs } from '@tiny-design/react';
import { NpmIcon, YarnIcon, PnpmIcon, BunIcon } from './pkg-icons';
import { HighlightedCode } from '../src/components/highlighted-code';

export const CodeBlock = ({ children }) => (
  <div className="markdown__pre-container">
    <HighlightedCode className="language-bash">{children}</HighlightedCode>
  </div>
);

# 在 Next.js 中使用

[Next.js](https://nextjs.org/) 适合需要文件路由、服务端渲染和生产级应用壳的项目。本指南将介绍如何在使用 App Router 的 Next.js 项目中接入 tiny-design。

## 创建项目

<Tabs
animated={false}
defaultActiveKey="npm"
items={[
{ key: 'npm', label: <span><NpmIcon />npm</span>, children: <CodeBlock>{'$ npx create-next-app@latest my-app --ts --app\n$ cd my-app\n$ npm install'}</CodeBlock> },
{ key: 'yarn', label: <span><YarnIcon />yarn</span>, children: <CodeBlock>{'$ yarn create next-app my-app --ts --app\n$ cd my-app\n$ yarn'}</CodeBlock> },
{ key: 'pnpm', label: <span><PnpmIcon />pnpm</span>, children: <CodeBlock>{'$ pnpm create next-app my-app --ts --app\n$ cd my-app\n$ pnpm install'}</CodeBlock> },
{ key: 'bun', label: <span><BunIcon />Bun</span>, children: <CodeBlock>{'$ bunx create-next-app@latest my-app --ts --app\n$ cd my-app\n$ bun install'}</CodeBlock> },
]}
/>

启动开发服务器，确认一切正常：

```bash
$ npm run dev
```

在浏览器中打开 http://localhost:3000/。

## 安装 tiny-design

<Tabs
animated={false}
defaultActiveKey="npm"
items={[
{ key: 'npm', label: <span><NpmIcon />npm</span>, children: <CodeBlock>$ npm install @tiny-design/react</CodeBlock> },
{ key: 'yarn', label: <span><YarnIcon />yarn</span>, children: <CodeBlock>$ yarn add @tiny-design/react</CodeBlock> },
{ key: 'pnpm', label: <span><PnpmIcon />pnpm</span>, children: <CodeBlock>$ pnpm add @tiny-design/react</CodeBlock> },
{ key: 'bun', label: <span><BunIcon />Bun</span>, children: <CodeBlock>$ bun add @tiny-design/react</CodeBlock> },
]}
/>

## 用 ConfigProvider 包裹应用

编辑 `app/layout.tsx`：

```tsx
import type { Metadata } from 'next';
import { ConfigProvider } from '@tiny-design/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tiny Design + Next.js',
  description: 'Tiny Design with Next.js App Router',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>{children}</ConfigProvider>
      </body>
    </html>
  );
}
```

`ConfigProvider` 可以直接放在 `app/layout.tsx` 中。样式会随组件自动导入，因此不需要额外引入 tiny-design 的全局 CSS。

## 渲染一个组件

编辑 `app/page.tsx`：

```tsx
import { Button } from '@tiny-design/react';

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <Button variant="solid" color="primary">
        Button
      </Button>
    </main>
  );
}
```

现在你应该能在页面上看到一个主按钮。

## Client Component 与 useTheme

`useTheme()` 会读取 `localStorage`、媒体查询以及 `data-tiny-theme` 等浏览器状态，因此只能在 client component 中使用。

创建 `app/theme-toggle.tsx`：

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

然后在 `app/page.tsx` 中渲染它：

```tsx
import ThemeToggle from './theme-toggle';

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <ThemeToggle />
    </main>
  );
}
```

## 主题初始渲染说明

如果你通过 `useTheme()` 持久化主题模式，这个 hook 会在客户端把 `data-tiny-theme` 写到 `<html>` 上。首屏阶段，如果你的应用已经把用户主题偏好保存在 cookie 或 header 中，也可以在服务端提前写入 `data-tiny-theme`。如果没有，默认使用 light 主题也是安全的。
