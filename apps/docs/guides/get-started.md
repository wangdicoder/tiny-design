import { Tabs } from '@tiny-design/react';
import { NpmIcon, YarnIcon, PnpmIcon, BunIcon } from './pkg-icons';
import { HighlightedCode } from '../src/components/highlighted-code';

export const CodeBlock = ({ children }) => (
  <div className="markdown__pre-container">
    <HighlightedCode className="language-bash">{children}</HighlightedCode>
  </div>
);

# Get Started

## Install

### Using a package manager

You first need to install and configure the `Node.js` environment properly locally.

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

## Usage

The following is a simple example of using a default button component.

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from 'tiny-design';

const App = () => {
  return <Button>Hello World</Button>;
}

createRoot(document.getElementById('root')).render(<App />);
```

Styles are automatically imported alongside each component — no separate CSS import needed. Tiny UI ships ES modules via the `es/` directory, so modern bundlers like webpack, Vite, and Rollup will automatically tree-shake unused components and their styles.
