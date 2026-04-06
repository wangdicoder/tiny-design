import React from 'react';

function dotToKebab(str: string): string {
  return str.replace(/\./g, '-');
}

export type ThemeTokenValue = string | number;

export interface ThemeDocumentMeta {
  id?: string;
  name?: string;
  author?: string;
  schemaVersion?: number;
}

export interface ThemeDocumentTokens {
  semantic?: Record<string, ThemeTokenValue>;
  components?: Record<string, ThemeTokenValue>;
}

export interface ThemeDocument {
  meta?: ThemeDocumentMeta;
  mode: 'light' | 'dark' | 'system';
  extends?: string;
  tokens?: ThemeDocumentTokens;
}

export interface ThemeConfig {
  mode?: 'light' | 'dark' | 'system';
  tokens?: ThemeDocumentTokens;
  extends?: string;
  meta?: ThemeDocumentMeta;
}

function buildDocumentCssVars(tokens?: ThemeDocumentTokens): Record<string, string> {
  const vars: Record<string, string> = {};
  if (!tokens) return vars;

  if (tokens.semantic) {
    for (const [key, value] of Object.entries(tokens.semantic)) {
      vars[`--ty-${key}`] = String(value);
    }
  }

  if (tokens.components) {
    for (const [key, value] of Object.entries(tokens.components)) {
      vars[`--ty-${dotToKebab(key)}`] = String(value);
    }
  }

  return vars;
}

/**
 * Builds a CSSProperties object from a ThemeConfig.
 */
export function buildCssVars(
  theme: ThemeConfig
): React.CSSProperties | undefined {
  const vars = buildDocumentCssVars(theme.tokens);

  if (Object.keys(vars).length === 0) return undefined;
  return vars as React.CSSProperties;
}
