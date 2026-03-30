import { ALL_TOKENS } from '../constants/default-tokens';

/** Keys that should be excluded from CSS variable export (they are meta-seeds, not real tokens) */
const META_KEYS = new Set(['shadow-intensity']);

export function generateCSS(overrides: Record<string, string>): string {
  const lines = Object.entries(overrides)
    .filter(([key]) => !META_KEYS.has(key))
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
    if (META_KEYS.has(key)) continue;
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

export function generateJSON(seeds: Record<string, string>): string {
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(seeds)) {
    if (!META_KEYS.has(key)) {
      clean[key] = value;
    }
  }
  return JSON.stringify(clean, null, 2);
}
