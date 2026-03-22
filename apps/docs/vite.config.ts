import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import path from 'path';
import { readFileSync } from 'fs';

const reactPkg = path.resolve(__dirname, '../../packages/react/package.json');
const reactSrc = path.resolve(__dirname, '../../packages/react/src');
const iconsSrc = path.resolve(__dirname, '../../packages/icons/src');

const tinyVersion = JSON.parse(readFileSync(reactPkg, 'utf-8')).version;

export default defineConfig({
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
    alias: {
      '@tiny-design/react': reactSrc,
      '@tiny-design/icons': iconsSrc,
    },
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
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
});
