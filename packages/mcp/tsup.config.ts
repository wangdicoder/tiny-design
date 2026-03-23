import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  clean: true,
  banner: { js: '#!/usr/bin/env node' },
  loader: { '.json': 'json' },
});
