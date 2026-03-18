import sdk from '@stackblitz/sdk';
import { getParameters } from 'codesandbox/lib/api/define';

const TINY_DESIGN_VERSION = '^1.1.0';
const TINY_ICONS_VERSION = '^1.1.0';

/**
 * Generate the shared file set used by both StackBlitz and CodeSandbox.
 *
 * With the new standalone demo format, the source code already contains
 * real imports (e.g. `import { Button } from '@tiny-design/react'`) and
 * a default export. It can be used directly as App.tsx.
 */
function buildSandboxFiles(sourceCode: string): Record<string, string> {
  return {
    'package.json': JSON.stringify(
      {
        name: 'tiny-design-demo',
        private: true,
        scripts: { dev: 'vite', build: 'vite build' },
        dependencies: {
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          '@tiny-design/react': TINY_DESIGN_VERSION,
          '@tiny-design/icons': TINY_ICONS_VERSION,
        },
        devDependencies: {
          '@vitejs/plugin-react': '^4.0.0',
          vite: '^5.0.0',
        },
      },
      null,
      2,
    ),
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tiny Design Demo</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`,
    'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,
    'src/main.tsx': `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`,
    'src/App.tsx': sourceCode,
  };
}

/**
 * Open the demo source code in a new StackBlitz tab.
 * The sourceCode should be a standalone .tsx file with real imports.
 */
export function openInStackBlitz(sourceCode: string): void {
  const files = buildSandboxFiles(sourceCode);

  sdk.openProject(
    {
      title: 'Tiny Design Demo',
      template: 'node',
      files,
    },
    { openFile: 'src/App.tsx', newWindow: true },
  );
}

/**
 * Open the demo source code in a new CodeSandbox tab.
 * The sourceCode should be a standalone .tsx file with real imports.
 */
export function openInCodeSandbox(sourceCode: string): void {
  const files = buildSandboxFiles(sourceCode);

  // Convert to CodeSandbox's IFiles format
  const csFiles: Record<string, { content: string; isBinary: boolean }> = {};
  for (const [path, content] of Object.entries(files)) {
    csFiles[path] = { content, isBinary: false };
  }

  const parameters = getParameters({ files: csFiles });
  window.open(
    `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`,
    '_blank',
    'noopener,noreferrer',
  );
}
