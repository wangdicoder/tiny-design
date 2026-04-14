import { Tabs } from '@tiny-design/react';
import { NpmIcon, YarnIcon, PnpmIcon, BunIcon } from './pkg-icons';
import { HighlightedCode } from '../src/components/highlighted-code';

export const CodeBlock = ({ children }) => (

  <div className="markdown__pre-container">
    <HighlightedCode className="language-bash">{children}</HighlightedCode>
  </div>
);

# Use with Vite

[Vite](https://vite.dev/) is the recommended way to scaffold a new React project. This guide walks through setting up tiny-design in a Vite-based app.

## Create a project

<Tabs
animated={false}
defaultActiveKey="npm"
items={[
{ key: 'npm', label: <span><NpmIcon />npm</span>, children: <CodeBlock>{'$ npm create vite@latest my-app -- --template react-ts\n$ cd my-app\n$ npm install'}</CodeBlock> },
{ key: 'yarn', label: <span><YarnIcon />yarn</span>, children: <CodeBlock>{'$ yarn create vite my-app --template react-ts\n$ cd my-app\n$ yarn'}</CodeBlock> },
{ key: 'pnpm', label: <span><PnpmIcon />pnpm</span>, children: <CodeBlock>{'$ pnpm create vite my-app --template react-ts\n$ cd my-app\n$ pnpm install'}</CodeBlock> },
{ key: 'bun', label: <span><BunIcon />Bun</span>, children: <CodeBlock>{'$ bun create vite my-app --template react-ts\n$ cd my-app\n$ bun install'}</CodeBlock> },
]}
/>

Start the dev server to verify everything works:

```bash
$ npm run dev
```

Open http://localhost:5173/ in your browser.

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

Edit `src/App.tsx` to import a Button component from tiny-design:

```tsx
import { Button } from 'tiny-design';

const App = () => {
  return (
    <div style={{ padding: 24 }}>
      <Button variant="solid" color="primary">
        Button
      </Button>
    </div>
  );
};

export default App;
```

You should now see a primary button on the page. Styles are automatically imported alongside each component — no separate CSS import needed. Vite tree-shakes the ES module build automatically, so only the components you import (and their styles) end up in your bundle.
