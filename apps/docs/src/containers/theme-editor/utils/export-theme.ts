/** Keys that should be excluded from CSS variable export (they are meta-seeds, not real tokens) */
const META_KEYS = new Set(['shadow-intensity']);

export function generateCSS(overrides: Record<string, string>): string {
  const lines = Object.entries(overrides)
    .filter(([key]) => !META_KEYS.has(key))
    .map(([key, value]) => `  --ty-${key}: ${value};`)
    .join('\n');

  return `:root {\n${lines}\n}`;
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
