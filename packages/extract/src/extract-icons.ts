import * as fs from 'node:fs';
import type { IconData, ExtractIconsOptions } from './types.js';

export function extractIcons(options: ExtractIconsOptions): IconData {
  const content = fs.readFileSync(options.iconsIndexPath, 'utf-8');

  const icons: string[] = [];
  const exportRegex = /export\s*\{\s*(\w+)\s*\}/g;
  let match: RegExpExecArray | null;

  while ((match = exportRegex.exec(content)) !== null) {
    const name = match[1];
    if (name !== 'IconProps') {
      icons.push(name);
    }
  }

  return {
    props: {
      size: { type: 'string | number', default: '"1em"' },
      color: { type: 'string', default: '"currentColor"' },
    },
    icons,
  };
}
