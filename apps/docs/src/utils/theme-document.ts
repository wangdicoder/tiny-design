import type { ThemeDocument } from '@tiny-design/react';
import tokenRegistry from '../../../../packages/tokens/dist/registry.json';
import lightTheme from '../../../../packages/tokens/source/themes/light.json';
import darkTheme from '../../../../packages/tokens/source/themes/dark.json';

type TokenRegistryEntry = {
  key: string;
  defaultValue: string | number;
};

type TokenRegistryDocument = {
  tokens: TokenRegistryEntry[];
};

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
const BASE_THEME_BY_ID = {
  'tiny-light': lightTheme,
  'tiny-dark': darkTheme,
} as const;

const REGISTRY_TOKENS = (tokenRegistry as TokenRegistryDocument).tokens;
const SOURCE_VALUES = REGISTRY_TOKENS.reduce<Record<string, string>>((acc, token) => {
  acc[token.key] = String(token.defaultValue);
  return acc;
}, {});

function componentTokenKeyToCssVar(key: string): string {
  return `--ty-${key.replace(/\./g, '-')}`;
}

function getBaseTheme(theme: ThemeDocument): ThemeDocument {
  if (theme.extends && theme.extends in BASE_THEME_BY_ID) {
    return BASE_THEME_BY_ID[theme.extends as keyof typeof BASE_THEME_BY_ID] as ThemeDocument;
  }

  return theme.mode === 'dark'
    ? darkTheme as ThemeDocument
    : lightTheme as ThemeDocument;
}

function resolveTokenValue(
  key: string,
  rawValues: Record<string, string>,
  cache: Map<string, string>,
  stack: Set<string>
): string {
  const cached = cache.get(key);
  if (cached) return cached;

  const raw = rawValues[key];
  if (raw == null) return '';
  if (stack.has(key)) return raw;

  const match = /^\{(.+)\}$/.exec(raw);
  if (!match) {
    cache.set(key, raw);
    return raw;
  }

  stack.add(key);
  const resolved = resolveTokenValue(match[1], rawValues, cache, stack) || raw;
  stack.delete(key);
  cache.set(key, resolved);
  return resolved;
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
  const baseTheme = getBaseTheme(theme);
  const baseSemantic = baseTheme.tokens?.semantic ?? {};
  const baseComponents = baseTheme.tokens?.components ?? {};
  const semantic = theme.tokens?.semantic ?? {};
  const components = theme.tokens?.components ?? {};

  const rawValues: Record<string, string> = { ...SOURCE_VALUES };

  for (const [key, value] of Object.entries(baseSemantic)) rawValues[key] = String(value);
  for (const [key, value] of Object.entries(baseComponents)) rawValues[key] = String(value);
  for (const [key, value] of Object.entries(semantic)) rawValues[key] = String(value);
  for (const [key, value] of Object.entries(components)) rawValues[key] = String(value);

  const cache = new Map<string, string>();
  const resolved: Record<string, string> = {};

  for (const token of REGISTRY_TOKENS) {
    const value = resolveTokenValue(token.key, rawValues, cache, new Set<string>());
    resolved[token.key.includes('.') ? componentTokenKeyToCssVar(token.key) : `--ty-${token.key}`] = value;
  }

  for (const [key, value] of Object.entries(semantic)) {
    if (!(key in SOURCE_VALUES)) resolved[`--ty-${key}`] = String(value);
  }

  for (const [key, value] of Object.entries(components)) {
    if (!(key in SOURCE_VALUES)) resolved[componentTokenKeyToCssVar(key)] = String(value);
  }

  return resolved;
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
    cssVar: componentTokenKeyToCssVar(key),
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
  const baseResolved = resolveThemeDocument(getBaseTheme(theme));

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
