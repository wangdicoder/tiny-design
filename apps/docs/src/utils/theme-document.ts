import type { ThemeDocument } from '@tiny-design/react';
import presets from '@tiny-design/tokens/presets';
import { resolveTheme } from '@tiny-design/tokens/resolve-theme';

export type ThemeTokenChange = {
  key: string;
  category: 'semantic' | 'component';
  value: string;
  cssVar: string;
};

export type ThemeTokenComparison = ThemeTokenChange & {
  baseValue: string;
};

const STUDIO_THEME_DOCUMENT_KEY = 'ty-theme-studio-document';
const BASE_THEME_BY_ID = presets as Record<string, ThemeDocument>;

function tokenKeyToCssVar(key: string): string {
  return `--ty-${key.replace(/\./g, '-')}`;
}

function getBaseTheme(theme: ThemeDocument): ThemeDocument {
  if (theme.extends && theme.extends in BASE_THEME_BY_ID) {
    return BASE_THEME_BY_ID[theme.extends];
  }

  return theme.mode === 'dark'
    ? BASE_THEME_BY_ID['tiny-dark']
    : BASE_THEME_BY_ID['tiny-light'];
}

export function buildThemeDocumentFromSeeds(
  seeds: Record<string, string>,
  isDark: boolean
): ThemeDocument {
  return {
    meta: {
      id: 'docs-theme-studio',
      name: 'Docs Theme Studio',
      schemaVersion: 1,
    },
    mode: isDark ? 'dark' : 'light',
    extends: isDark ? 'tiny-dark' : 'tiny-light',
    tokens: {
      semantic: { ...seeds },
      components: {},
    },
  };
}

export function mergeThemeDocuments(
  baseTheme: ThemeDocument | undefined,
  overrideTheme: ThemeDocument
): ThemeDocument {
  if (!baseTheme) return overrideTheme;

  return {
    ...baseTheme,
    ...overrideTheme,
    meta: {
      ...baseTheme.meta,
      ...overrideTheme.meta,
    },
    mode: overrideTheme.mode ?? baseTheme.mode,
    extends: overrideTheme.extends ?? baseTheme.extends,
    tokens: {
      semantic: {
        ...(baseTheme.tokens?.semantic ?? {}),
        ...(overrideTheme.tokens?.semantic ?? {}),
      },
      components: {
        ...(baseTheme.tokens?.components ?? {}),
        ...(overrideTheme.tokens?.components ?? {}),
      },
    },
  };
}

export function resolveThemeDocument(theme: ThemeDocument): Record<string, string> {
  return resolveTheme(theme).cssVars;
}

export function generateThemeDocumentJSON(theme: ThemeDocument): string {
  return JSON.stringify(theme, null, 2);
}

export function listChangedThemeTokens(theme: ThemeDocument): ThemeTokenChange[] {
  const semanticEntries = Object.entries(theme.tokens?.semantic ?? {}).map(([key, value]) => ({
    key,
    category: 'semantic' as const,
    value: String(value),
    cssVar: `--ty-${key}`,
  }));

  const componentEntries = Object.entries(theme.tokens?.components ?? {}).map(([key, value]) => ({
    key,
    category: 'component' as const,
    value: String(value),
    cssVar: tokenKeyToCssVar(key),
  }));

  return [...semanticEntries, ...componentEntries];
}

export function generateThemeCssVariables(theme: ThemeDocument): string {
  const resolvedVars = resolveThemeDocument(theme);
  const lines = Object.entries(resolvedVars)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([cssVar, value]) => `  ${cssVar}: ${value};`);

  return [':root {', ...lines, '}'].join('\n');
}

export function compareThemeAgainstBase(theme: ThemeDocument): ThemeTokenComparison[] {
  const baseResolved = resolveTheme(getBaseTheme(theme)).cssVars;

  return listChangedThemeTokens(theme).map((change) => ({
    ...change,
    baseValue: baseResolved[change.cssVar] ?? '',
  }));
}

export function savePendingThemeDocument(theme: ThemeDocument): void {
  localStorage.setItem(STUDIO_THEME_DOCUMENT_KEY, JSON.stringify(theme));
}

export function loadPendingThemeDocument(): ThemeDocument | undefined {
  try {
    const raw = localStorage.getItem(STUDIO_THEME_DOCUMENT_KEY);
    return raw ? JSON.parse(raw) as ThemeDocument : undefined;
  } catch {
    return undefined;
  }
}

export function clearPendingThemeDocument(): void {
  localStorage.removeItem(STUDIO_THEME_DOCUMENT_KEY);
}
