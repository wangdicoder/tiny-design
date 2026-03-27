import { defineConfig } from 'tsdown';

const shared = {
  entry: ['src/index.ts'],
  unbundle: true,
  dts: true,
  sourcemap: true,
  target: 'es2020' as const,
  platform: 'browser' as const,
  outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
  deps: {
    skipNodeModulesBundle: true,
  },
};

export default defineConfig([
  {
    ...shared,
    format: 'esm',
    outDir: 'es',
  },
  {
    ...shared,
    format: 'cjs',
    outDir: 'lib',
  },
]);
