import * as fs from 'node:fs';
import type { TokenData, ExtractTokensOptions } from './types.js';

// Map variable name prefixes to categories
const CATEGORY_RULES: Array<{ test: (name: string) => boolean; category: string }> = [
  { test: (n) => /^shadow/.test(n), category: 'shadows' },
  { test: (n) => /^size-(xs|sm|md|lg|xl|xxl)$/.test(n), category: 'breakpoints' },
  { test: (n) => /^(font|line-height|heading|h\d-)/.test(n), category: 'typography' },
  { test: (n) => /^(spacer|height-)/.test(n), category: 'spacing' },
  {
    test: (n) =>
      /^color-/.test(n) ||
      /^(white|black|gray|red|orange|yellow|green|teal|cyan|blue|indigo|purple|magenta)-/.test(n) ||
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

export function extractTokens(options: ExtractTokensOptions): TokenData {
  const result: TokenData = {
    colors: {},
    typography: {},
    spacing: {},
    breakpoints: {},
    shadows: {},
  };

  if (options.registryPath) {
    const registry = JSON.parse(fs.readFileSync(options.registryPath, 'utf-8')) as {
      tokens?: Array<{
        key: string;
        cssVar: string;
        type: string;
        defaultValue: string | number;
        resolvedValue?: string | number;
      }>;
    };

    for (const token of registry.tokens ?? []) {
      const category = categorize(token.key);

      if (category) {
        result[category][token.key] = {
          variable: token.cssVar,
          value: String(token.resolvedValue ?? token.defaultValue),
        };
      }
    }
  }

  if (!options.variablesPath) {
    return result;
  }

  const variablesContent = fs.readFileSync(options.variablesPath, 'utf-8');

  // Parse SCSS variable declarations: $name: value !default;
  const varRegex = /^\$([a-z0-9-]+):\s*(.+?)\s*!default\s*;/gm;
  let match: RegExpExecArray | null;

  while ((match = varRegex.exec(variablesContent)) !== null) {
    const name = match[1];
    const value = match[2];
    const category = categorize(name);

    if (category) {
      result[category][name] ??= {
        variable: `$${name}`,
        value,
      };
    }
  }

  return result;
}
