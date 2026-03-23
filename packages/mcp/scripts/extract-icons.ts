import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { IconData } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_INDEX = path.resolve(__dirname, '../../icons/src/index.ts');

export function extractIcons(): IconData {
  const content = fs.readFileSync(ICONS_INDEX, 'utf-8');

  const icons: string[] = [];
  const exportRegex = /export\s*\{\s*(\w+)\s*\}/g;
  let match: RegExpExecArray | null;

  while ((match = exportRegex.exec(content)) !== null) {
    const name = match[1];
    // Skip the IconProps type export
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
