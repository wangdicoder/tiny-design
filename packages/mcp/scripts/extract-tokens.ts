import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { TokenData } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VARIABLES_PATH = path.resolve(__dirname, '../../tokens/scss/_variables.scss');

// Map variable name prefixes to categories
const CATEGORY_RULES: Array<{ test: (name: string) => boolean; category: string }> = [
  { test: (n) => /^(box-)?shadow/.test(n), category: 'shadows' },
  { test: (n) => /^size-(xs|sm|md|lg|xl|xxl)$/.test(n), category: 'breakpoints' },
  { test: (n) => /^(font|line-height|heading|h\d-)/.test(n), category: 'typography' },
  { test: (n) => /^(spacer|height-)/.test(n), category: 'spacing' },
  {
    test: (n) =>
      /color$/.test(n) ||
      /^(white|black|gray|red|orange|yellow|green|teal|cyan|blue|indigo|purple|magenta)-/.test(n) ||
      /^(info|success|warning|danger|primary)-/.test(n) ||
      /^(body-bg|body-color)/.test(n),
    category: 'colors',
  },
];

function categorize(name: string): string | null {
  for (const rule of CATEGORY_RULES) {
    if (rule.test(name)) return rule.category;
  }
  return null;
}

export function extractTokens(): TokenData {
  const content = fs.readFileSync(VARIABLES_PATH, 'utf-8');
  const result: TokenData = {
    colors: {},
    typography: {},
    spacing: {},
    breakpoints: {},
    shadows: {},
  };

  // Match SCSS variable declarations: $name: value !default;
  const varRegex = /^\$([a-z0-9-]+):\s*(.+?)\s*!default\s*;/gm;
  let match: RegExpExecArray | null;

  while ((match = varRegex.exec(content)) !== null) {
    const name = match[1];
    const value = match[2];
    const category = categorize(name);

    if (category) {
      result[category][name] = {
        variable: `$${name}`,
        value,
      };
    }
  }

  return result;
}
