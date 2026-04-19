import { Tabs } from '@tiny-design/react';
import { NpmIcon, YarnIcon, PnpmIcon, BunIcon } from './pkg-icons';
import { HighlightedCode } from '../src/components/highlighted-code';

export const CodeBlock = ({ children }) => (
  <div className="markdown__pre-container">
    <HighlightedCode className="language-bash">{children}</HighlightedCode>
  </div>
);

# Use with Next.js

[Next.js](https://nextjs.org/) is a good fit when you want file-based routing, server rendering, and a production-ready app shell. This guide walks through setting up tiny-design in a Next.js app using the App Router.

## Create a project

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

Start the dev server to verify everything works:

```bash
$ npm run dev
```

Open http://localhost:3000/ in your browser.

## Install tiny-design

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

## Wrap the app with ConfigProvider

Edit `app/layout.tsx`:

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

`ConfigProvider` can be rendered from `app/layout.tsx`. Styles are automatically imported alongside each component, so no separate tiny-design CSS import is needed.

## Render a component

Edit `app/page.tsx`:

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

You should now see a primary button on the page.

## Client components and useTheme

`useTheme()` reads browser state such as `localStorage`, media queries, and the `data-tiny-theme` attribute. Use it only inside client components.

Create `app/theme-toggle.tsx`:

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

Then render it from `app/page.tsx`:

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

## Theme hydration note

If you persist the theme mode with `useTheme()`, the hook writes `data-tiny-theme` to `<html>` on the client. For the first paint, you can optionally set `data-tiny-theme` on the server as well if your app already stores a user theme preference in cookies or headers. If not, the default light theme is safe.
