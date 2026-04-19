import { Tabs } from '@tiny-design/react';
import { NpmIcon, YarnIcon, PnpmIcon, BunIcon } from './pkg-icons';
import { HighlightedCode } from '../src/components/highlighted-code';

export const CodeBlock = ({ children }) => (
  <div className="markdown__pre-container">
    <HighlightedCode className="language-bash">{children}</HighlightedCode>
  </div>
);

# 在 Next.js Pages Router 中使用

如果你的项目还在使用经典的 `pages/` 目录，Tiny UI 同样可以正常接入。本指南聚焦于 Pages Router 场景，包括 `_app.tsx`、可选的 `_document.tsx`，以及只能放在客户端的主题切换。

## 创建项目

<Tabs
animated={false}
defaultActiveKey="npm"
items={[
{ key: 'npm', label: <span><NpmIcon />npm</span>, children: <CodeBlock>{'$ npx create-next-app@latest my-app --ts\n$ cd my-app\n$ npm install'}</CodeBlock> },
{ key: 'yarn', label: <span><YarnIcon />yarn</span>, children: <CodeBlock>{'$ yarn create next-app my-app --ts\n$ cd my-app\n$ yarn'}</CodeBlock> },
{ key: 'pnpm', label: <span><PnpmIcon />pnpm</span>, children: <CodeBlock>{'$ pnpm create next-app my-app --ts\n$ cd my-app\n$ pnpm install'}</CodeBlock> },
{ key: 'bun', label: <span><BunIcon />Bun</span>, children: <CodeBlock>{'$ bunx create-next-app@latest my-app --ts\n$ cd my-app\n$ bun install'}</CodeBlock> },
]}
/>

启动开发服务器：

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

## 在 `_app.tsx` 中包裹应用

编辑 `pages/_app.tsx`：

```tsx
import type { AppProps } from 'next/app';
import { ConfigProvider } from '@tiny-design/react';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
```

对于 Pages Router，`ConfigProvider` 应该放在 `_app.tsx`。样式会随组件自动导入，因此不需要额外引入 tiny-design 的样式文件。

## 渲染一个页面

编辑 `pages/index.tsx`：

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

## 可选的 `_document.tsx` 主题初始化

如果你的应用在服务端已经知道初始主题，可以在 `pages/_document.tsx` 里把它写到 `<Html>` 上：

```tsx
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" data-tiny-theme="light">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

这不是必须的，但如果你想让首屏就匹配已知的用户主题偏好、减少主题闪烁，这样做会更稳。

## 只在客户端切换主题

`useTheme()` 依赖浏览器 API，因此要放在客户端渲染的组件里使用。

创建 `components/theme-toggle.tsx`：

```tsx
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

然后在 `pages/index.tsx` 中使用：

```tsx
import ThemeToggle from '../components/theme-toggle';

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <ThemeToggle />
    </main>
  );
}
```

## Hydration 建议

如果主题模式只存放在 `localStorage` 中，客户端在 hydration 后可能会恢复出不同的值。这是正常的，但首屏可能会短暂发生模式切换。

如果你需要更严格地控制首屏表现：

- 在 `<Html data-tiny-theme=\"...\">` 上写入初始模式
- 让服务端输出保持确定性
- 不要让未解析的客户端主题状态决定 SSR 可见文本

更完整的规则和取舍，请结合 `SSR 与 Hydration` 一起阅读。
