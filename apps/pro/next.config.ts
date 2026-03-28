import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  sassOptions: {
    includePaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'),
      path.resolve(__dirname, '../../packages/react/src'),
    ],
  },
  webpack(config) {
    // Source alias: resolve to package source (same pattern as docs app)
    config.resolve.alias['@tiny-design/react'] = path.resolve(
      __dirname,
      '../../packages/react/src'
    );
    config.resolve.alias['@tiny-design/icons'] = path.resolve(
      __dirname,
      '../../packages/icons/src'
    );

    // ?raw imports: embed file contents as strings at build time
    config.module.rules.push({
      resourceQuery: /raw/,
      type: 'asset/source',
    });

    return config;
  },
};

export default nextConfig;
