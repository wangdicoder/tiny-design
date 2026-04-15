import sdk from '@stackblitz/sdk';
import { getParameters } from 'codesandbox/lib/api/define';

declare const __TINY_VERSION__: string;

const TINY_VERSION = `^${__TINY_VERSION__}`;
const TINY_DESIGN_VERSION = TINY_VERSION;
const TINY_ICONS_VERSION = TINY_VERSION;
const TINY_CHARTS_VERSION = TINY_VERSION;
const RECHARTS_VERSION = '^3.8.1';
const REACT_IS_VERSION = '^18.3.1';

const BOOTSTRAP_CODE = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`;

function getSandboxDependencies(sourceCode: string): Record<string, string> {
  const dependencies: Record<string, string> = {
    react: '^18.2.0',
    'react-dom': '^18.2.0',
    '@tiny-design/react': TINY_DESIGN_VERSION,
    '@tiny-design/icons': TINY_ICONS_VERSION,
  };

  const importPattern = /(?:from\s+|import\s+)['"]([^'"]+)['"]/g;
  const importedPackages = new Set<string>();

  for (const match of sourceCode.matchAll(importPattern)) {
    importedPackages.add(match[1]);
  }

  if (
    importedPackages.has('@tiny-design/charts') ||
    importedPackages.has('@tiny-design/charts/style')
  ) {
    dependencies['@tiny-design/charts'] = TINY_CHARTS_VERSION;
  }

  if (importedPackages.has('recharts')) {
    dependencies.recharts = RECHARTS_VERSION;
    dependencies['react-is'] = REACT_IS_VERSION;
  }

  return dependencies;
}

/**
 * Generate the file set for StackBlitz (Vite-based).
 */
function buildStackBlitzFiles(sourceCode: string): Record<string, string> {
  return {
    'package.json': JSON.stringify(
      {
        name: 'tiny-design-demo',
        private: true,
        scripts: { dev: 'vite', build: 'vite build' },
        dependencies: getSandboxDependencies(sourceCode),
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
  <style>body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }</style>
</head>
<body>
  <div id="root" style="padding: 24px"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`,
    'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,
    'src/main.tsx': BOOTSTRAP_CODE,
    'src/App.tsx': sourceCode,
  };
}

/**
 * Generate the file set for CodeSandbox (classic browser sandbox).
 *
 * Classic sandboxes use an in-browser bundler — no Vite needed.
 * Entry point must be src/index.tsx and HTML goes in public/.
 */
function buildCodeSandboxFiles(sourceCode: string): Record<string, string> {
  return {
    'package.json': JSON.stringify(
      {
        name: 'tiny-design-demo',
        private: true,
        dependencies: getSandboxDependencies(sourceCode),
      },
      null,
      2,
    ),
    'public/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tiny Design Demo</title>
  <style>body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }</style>
</head>
<body>
  <div id="root" style="padding: 24px"></div>
</body>
</html>`,
    'src/index.tsx': BOOTSTRAP_CODE,
    'src/App.tsx': sourceCode,
  };
}

/**
 * Open the demo source code in a new StackBlitz tab.
 * The sourceCode should be a standalone .tsx file with real imports.
 */
export function openInStackBlitz(sourceCode: string): void {
  const files = buildStackBlitzFiles(sourceCode);

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
  const files = buildCodeSandboxFiles(sourceCode);

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
