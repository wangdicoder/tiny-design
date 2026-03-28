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

    // ?raw imports: embed original file contents as strings at build time.
    // We must exclude ?raw from existing oneOf rules so Next.js/SWC doesn't
    // compile the TSX before we read it as plain text.
    const rawQuery = /raw/;

    for (const rule of config.module.rules) {
      if (rule && typeof rule === 'object' && rule.oneOf) {
        for (const oneOfRule of rule.oneOf) {
          if (oneOfRule && typeof oneOfRule === 'object') {
            // Add resourceQuery exclusion to each sub-rule
            if (!oneOfRule.resourceQuery) {
              oneOfRule.resourceQuery = { not: [rawQuery] };
            } else if (oneOfRule.resourceQuery instanceof RegExp) {
              oneOfRule.resourceQuery = {
                and: [oneOfRule.resourceQuery],
                not: [rawQuery],
              };
            }
          }
        }
      }
    }

    config.module.rules.push({
      resourceQuery: rawQuery,
      type: 'asset/source',
    });

    return config;
  },
};

export default nextConfig;
