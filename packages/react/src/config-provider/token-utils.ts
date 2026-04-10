import React from 'react';
import {
  resolveTheme,
  type ThemeConfig,
  type ThemeDocument,
  type ThemeDocumentMeta,
  type ThemeDocumentTokens,
} from '@tiny-design/tokens/resolve-theme';

export type { ThemeConfig, ThemeDocument, ThemeDocumentMeta, ThemeDocumentTokens };
export type ThemeTokenValue = string | number;

/**
 * Builds a CSSProperties object from a ThemeConfig or ThemeDocument.
 */
export function buildCssVars(
  theme: ThemeConfig | ThemeDocument
): React.CSSProperties | undefined {
  const { cssVars } = resolveTheme(theme);
  const explicitSemantic = theme.tokens?.semantic ?? {};
  const explicitComponents = theme.tokens?.components ?? {};
  const shouldApplyResolvedPreset = Boolean(theme.extends);

  const selectedVars = shouldApplyResolvedPreset
    ? cssVars
    : {
        ...Object.fromEntries(
          Object.keys(explicitSemantic).map((key) => [`--ty-${key}`, cssVars[`--ty-${key}`]])
        ),
        ...Object.fromEntries(
          Object.keys(explicitComponents).map((key) => [`--ty-${key.replace(/\./g, '-')}`, cssVars[`--ty-${key.replace(/\./g, '-')}`]])
        ),
      };

  if (Object.keys(selectedVars).length === 0) return undefined;
  return selectedVars as React.CSSProperties;
}

export function resolveThemeMode(
  theme?: ThemeConfig | ThemeDocument
): 'light' | 'dark' | 'system' | undefined {
  if (!theme) {
    return undefined;
  }

  if (theme.mode) {
    return theme.mode;
  }

  const { mode } = resolveTheme(theme);
  return mode;
}
