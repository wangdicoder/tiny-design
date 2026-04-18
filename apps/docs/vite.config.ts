import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import path from 'path';
import { readFileSync } from 'fs';

const reactPkg = path.resolve(__dirname, '../../packages/react/package.json');
const reactDir = path.resolve(__dirname, '../../packages/react');
const reactSrc = path.join(reactDir, 'src');
const reactEs = path.join(reactDir, 'es/index.js');
const iconsDir = path.resolve(__dirname, '../../packages/icons');
const iconsSrc = path.join(iconsDir, 'src');
const iconsEs = path.join(iconsDir, 'es/index.js');
const chartsDir = path.resolve(__dirname, '../../packages/charts');
const chartsSrc = path.join(chartsDir, 'src');
const chartsEs = path.join(chartsDir, 'es/index.js');
const tokensDir = path.resolve(__dirname, '../../packages/tokens');

const tinyVersion = JSON.parse(readFileSync(reactPkg, 'utf-8')).version;

function getPackageName(id: string): string | null {
  const match = id.match(
    /\/node_modules\/(?:\.pnpm\/[^/]+\/node_modules\/)?((?:@[^/]+\/)?[^/]+)/
  );

  return match?.[1] || null;
}

function sanitizeChunkName(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, '-');
}

function createWorkspaceAliases(mode: 'src' | 'es') {
  const useSource = mode === 'src';

  return [
    {
      find: /^@tiny-design\/react$/,
      replacement: useSource ? reactSrc : reactEs,
    },
    {
      find: /^@tiny-design\/react\/(.*)$/,
      replacement: path.join(reactDir, `${useSource ? 'src' : 'es'}/$1`),
    },
    {
      find: /^@tiny-design\/icons$/,
      replacement: useSource ? iconsSrc : iconsEs,
    },
    {
      find: /^@tiny-design\/icons\/(.*)$/,
      replacement: path.join(iconsDir, `${useSource ? 'src' : 'es'}/$1`),
    },
    {
      find: /^@tiny-design\/charts$/,
      replacement: useSource ? chartsSrc : chartsEs,
    },
    {
      find: /^@tiny-design\/charts\/(.*)$/,
      replacement: path.join(chartsDir, `${useSource ? 'src' : 'es'}/$1`),
    },
    { find: '@tiny-design/tokens/registry-runtime', replacement: path.join(tokensDir, 'runtime/registry.mjs') },
    { find: '@mdx-js/react', replacement: path.resolve(__dirname, 'node_modules/@mdx-js/react') },
  ];
}

export default defineConfig(({ command }) => {
  const aliasMode = command === 'serve' ? 'src' : 'es';

  return {
    base: process.env.VITE_BASE || '/',
    define: {
      __TINY_VERSION__: JSON.stringify(tinyVersion),
    },
    plugins: [
      { enforce: 'pre', ...mdx({
        mdxExtensions: ['.mdx', '.md'],
        mdExtensions: [],
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeMdxCodeProps],
      }) },
      react({ include: /\.(jsx|tsx|md|mdx)$/ }),
    ],
    resolve: {
      alias: createWorkspaceAliases(aliasMode),
      dedupe: ['react', 'react-dom'],
    },
    server: {
      port: 3000,
      open: true,
      fs: {
        allow: ['../..'],
      },
    },
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 750,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/packages/react/es/')) {
              return 'tiny-react';
            }

            if (id.includes('/packages/icons/es/')) {
              return 'tiny-icons';
            }

            if (id.includes('/packages/charts/es/')) {
              return 'tiny-charts';
            }

            if (id.includes('/apps/docs/src/containers/home/')) {
              return 'docs-home';
            }

            if (!id.includes('node_modules')) {
              return undefined;
            }

            const packageName = getPackageName(id);

            if (packageName && ['react', 'react-dom', 'scheduler'].includes(packageName)) {
              return 'vendor-react';
            }

            if (packageName && ['@babel/runtime', 'dom-helpers'].includes(packageName)) {
              return 'vendor-react';
            }

            if (
              packageName &&
              (
                packageName.startsWith('@mdx-js') ||
                packageName.startsWith('remark-') ||
                packageName.startsWith('rehype-') ||
                [
                  'unified',
                  'micromark',
                  'mdast-util-from-markdown',
                  'mdast-util-mdx',
                  'mdast-util-mdx-expression',
                  'mdast-util-mdx-jsx',
                  'mdast-util-mdxjs-esm',
                  'mdast-util-to-hast',
                  'hast-util-to-jsx-runtime',
                  'hast-util-from-html',
                  'vfile',
                ].includes(packageName)
              )
            ) {
              return 'vendor-mdx';
            }

            if (packageName && ['prism-react-renderer', 'react-runner'].includes(packageName)) {
              return 'vendor-code';
            }

            if (packageName === 'recharts' || packageName === 'victory-vendor') {
              return 'vendor-charts';
            }

            return packageName ? `vendor-${sanitizeChunkName(packageName)}` : 'vendor';
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  };
});
