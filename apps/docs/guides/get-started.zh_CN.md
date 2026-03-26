import { Tabs } from '@tiny-design/react';
import { NpmIcon, YarnIcon, PnpmIcon, BunIcon } from './pkg-icons';
import { HighlightedCode } from '../src/components/highlighted-code';

export const CodeBlock = ({ children }) => (
  <div className="markdown__pre-container">
    <HighlightedCode className="language-bash">{children}</HighlightedCode>
  </div>
);

# 快速上手

## 安装

### 使用包管理器

你需要先在本地正确安装和配置好 `Node.js` 环境。

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

## 引入方式

以下是一个使用默认按钮组件的简单示例。

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from 'tiny-design';

const App = () => {
  return <Button>Hello World</Button>;
}

createRoot(document.getElementById('root')).render(<App />);
```

样式会随组件自动导入，无需单独引入 CSS 文件。Tiny UI 通过 `es/` 目录提供 ES 模块，因此 webpack、Vite、Rollup 等现代打包工具会自动对未使用的组件及其样式进行 tree-shaking。
