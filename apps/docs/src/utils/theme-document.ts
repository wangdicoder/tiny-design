import type { ThemeDocument } from '@tiny-design/react';
import { deriveAllTokens } from '../containers/theme-studio/utils/color-utils';
import semanticColors from '../../../../packages/tokens/source/semantic/colors.json';
import semanticTypography from '../../../../packages/tokens/source/semantic/typography.json';
import semanticSize from '../../../../packages/tokens/source/semantic/size.json';
import semanticSpacing from '../../../../packages/tokens/source/semantic/spacing.json';
import semanticEffects from '../../../../packages/tokens/source/semantic/effects.json';
import buttonTokens from '../../../../packages/tokens/source/components/button.json';
import inputTokens from '../../../../packages/tokens/source/components/input.json';
import cardTokens from '../../../../packages/tokens/source/components/card.json';
import lightTheme from '../../../../packages/tokens/source/themes/light.json';
import darkTheme from '../../../../packages/tokens/source/themes/dark.json';

type TokenDefinition = {
  $value: string | number;
};

const META_KEYS = new Set(['shadow-intensity']);
const STUDIO_THEME_DOCUMENT_KEY = 'ty-theme-studio-document';

const SOURCE_TOKENS: Record<string, TokenDefinition> = {
  ...semanticColors,
  ...semanticTypography,
  ...semanticSize,
  ...semanticSpacing,
  ...semanticEffects,
  ...buttonTokens,
  ...inputTokens,
  ...cardTokens,
};

const SOURCE_TOKEN_KEYS = new Set(Object.keys(SOURCE_TOKENS));

const EDITOR_THEME_DOCUMENT_KEYS = new Set([
  ...Object.keys(semanticColors),
  ...Object.keys(semanticTypography),
  ...Object.keys(semanticSize),
  ...Object.keys(semanticEffects),
  'color-bg',
  'color-bg-elevated',
  'color-bg-layout',
  'color-bg-spotlight',
  'color-text-secondary',
  'color-text-tertiary',
  'color-border-light',
  'font-family',
  'font-family-monospace',
  'font-weight',
  'headings-font-weight',
  'letter-spacing',
  'shadow',
  'shadow-sm',
  'shadow-lg',
  'shadow-popup',
  'shadow-modal',
  'shadow-btn',
]);

const BASE_THEME_BY_ID = {
  'tiny-light': lightTheme,
  'tiny-dark': darkTheme,
} as const;

function getBaseTheme(theme: ThemeDocument): typeof lightTheme | typeof darkTheme {
  if (theme.extends && theme.extends in BASE_THEME_BY_ID) {
    return BASE_THEME_BY_ID[theme.extends as keyof typeof BASE_THEME_BY_ID];
  }
  return theme.mode === 'dark' ? darkTheme : lightTheme;
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

function componentTokenKeyToCssVar(key: string): string {
  return `--ty-${key.replace(/\./g, '-')}`;
}

export function buildThemeDocumentFromSeeds(
  seeds: Record<string, string>,
  isDark: boolean
): ThemeDocument {
  const derived = deriveAllTokens(seeds, isDark);
  const semantic: Record<string, string> = {};

  for (const [key, value] of Object.entries(derived)) {
    if (META_KEYS.has(key)) continue;
    if (!EDITOR_THEME_DOCUMENT_KEYS.has(key)) continue;
    semantic[key] = value;
  }

  return {
    meta: {
      id: 'docs-theme-studio',
      name: 'Docs Theme Studio',
      schemaVersion: 1,
    },
    mode: isDark ? 'dark' : 'light',
    extends: isDark ? 'tiny-dark' : 'tiny-light',
    tokens: {
      semantic,
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
  const baseOverrides = baseTheme.tokens?.semantic ?? {};
  const semanticOverrides = theme.tokens?.semantic ?? {};
  const componentOverrides = theme.tokens?.components ?? {};

  const rawValues: Record<string, string> = {};
  for (const [key, definition] of Object.entries(SOURCE_TOKENS)) {
    const override = key in componentOverrides
      ? componentOverrides[key]
      : key in semanticOverrides
        ? semanticOverrides[key]
        : key in baseOverrides
          ? baseOverrides[key]
          : definition.$value;
    rawValues[key] = String(override);
  }

  const cache = new Map<string, string>();
  const resolved: Record<string, string> = {};
  for (const key of Object.keys(SOURCE_TOKENS)) {
    const value = resolveTokenValue(key, rawValues, cache, new Set<string>());
    const cssVar = key.includes('.') ? componentTokenKeyToCssVar(key) : `--ty-${key}`;
    resolved[cssVar] = value;
  }

  for (const [key, value] of Object.entries(semanticOverrides)) {
    if (!SOURCE_TOKEN_KEYS.has(key)) {
      resolved[`--ty-${key}`] = String(value);
    }
  }

  for (const [key, value] of Object.entries(componentOverrides)) {
    if (!SOURCE_TOKEN_KEYS.has(key)) {
      resolved[componentTokenKeyToCssVar(key)] = String(value);
    }
  }

  return resolved;
}

export function buildLegacyPreviewOverrides(
  seeds: Record<string, string>,
  isDark: boolean
): Record<string, string> {
  const derived = deriveAllTokens(seeds, isDark);
  const extras: Record<string, string> = {};

  for (const [key, value] of Object.entries(derived)) {
    if (META_KEYS.has(key)) continue;
    if (EDITOR_THEME_DOCUMENT_KEYS.has(key)) continue;
    extras[key] = value;
  }

  return extras;
}

export function generateThemeDocumentJSON(theme: ThemeDocument): string {
  return JSON.stringify(theme, null, 2);
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

export function themeDocumentToEditableSeeds(theme: ThemeDocument): Record<string, string> {
  const semantic = theme.tokens?.semantic ?? {};
  const seeds: Record<string, string> = {};

  for (const [key, value] of Object.entries(semantic)) {
    if (EDITOR_THEME_DOCUMENT_KEYS.has(key)) {
      seeds[key] = String(value);
    }
  }

  return seeds;
}
