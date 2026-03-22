import { ALL_TOKENS } from '../constants/default-tokens';

export function generateCSS(overrides: Record<string, string>): string {
  const lines = Object.entries(overrides)
    .map(([key, value]) => `  --ty-${key}: ${value};`)
    .join('\n');

  return `:root {\n${lines}\n}`;
}

export function generateSCSS(seeds: Record<string, string>): string {
  const scssMap = new Map<string, string>();
  for (const def of ALL_TOKENS) {
    if (def.scssVar) {
      scssMap.set(def.key, def.scssVar);
    }
  }

  const lines: string[] = [];
  for (const [key, value] of Object.entries(seeds)) {
    const scssVar = scssMap.get(key);
    if (scssVar) {
      lines.push(`${scssVar}: ${value};`);
    }
  }

  if (lines.length === 0) {
    return '// No SCSS variable overrides';
  }

  return `// Override these before importing @tiny-design/tokens\n${lines.join('\n')}`;
}
