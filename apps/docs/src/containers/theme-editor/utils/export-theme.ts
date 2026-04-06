import type { ThemeDocument } from '@tiny-design/react';
import { generateThemeDocumentJSON } from '../../../utils/theme-document';

export function generateCSS(overrides: Record<string, string>): string {
  const lines = Object.entries(overrides)
    .map(([key, value]) => {
      const cssVarName = key.startsWith('--') ? key : `--ty-${key}`;
      return `  ${cssVarName}: ${value};`;
    })
    .join('\n');

  return `:root {\n${lines}\n}`;
}

export function generateJSON(themeDocument: ThemeDocument): string {
  return generateThemeDocumentJSON(themeDocument);
}
