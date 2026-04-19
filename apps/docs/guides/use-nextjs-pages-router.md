import { Tabs } from '@tiny-design/react';
import { NpmIcon, YarnIcon, PnpmIcon, BunIcon } from './pkg-icons';
import { HighlightedCode } from '../src/components/highlighted-code';

export const CodeBlock = ({ children }) => (
  <div className="markdown__pre-container">
    <HighlightedCode className="language-bash">{children}</HighlightedCode>
  </div>
);

# Use with Next.js Pages Router

If your project still uses the classic `pages/` directory, Tiny UI works there as well. This guide focuses on the Pages Router setup, including `_app.tsx`, optional `_document.tsx`, and client-only theme switching.

## Create a project

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

Start the dev server:

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

## Wrap the app in `_app.tsx`

Edit `pages/_app.tsx`:

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

`ConfigProvider` belongs in `_app.tsx` for the Pages Router. Styles are automatically imported alongside each component, so no extra tiny-design stylesheet import is needed.

## Render a page

Edit `pages/index.tsx`:

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

## Optional `_document.tsx` theme bootstrap

If your app already knows the initial theme on the server, you can write it to `<Html>` in `pages/_document.tsx`:

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

This is optional, but it is useful when you want the first paint to match a known user preference and reduce theme flash.

## Client-only theme switching

`useTheme()` depends on browser APIs, so keep it inside client-rendered components.

Create `components/theme-toggle.tsx`:

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

Then use it from `pages/index.tsx`:

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

## Hydration guidance

If the theme mode only lives in `localStorage`, the client may restore a different value after hydration. That is valid, but it can cause a brief mode switch on first paint.

If you need stricter control:

- write the initial mode to `<Html data-tiny-theme="...">`
- keep server-rendered markup deterministic
- avoid rendering user-visible SSR text that depends on unresolved client theme state

For the broader rules and tradeoffs, see `SSR and Hydration`.
