const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'source');
const DIST_DIR = path.join(ROOT, 'dist');
const DIST_CSS_DIR = path.join(DIST_DIR, 'css');
const REGISTRY_DTS_PATH = path.join(DIST_DIR, 'registry.d.ts');
const PRESETS_DTS_PATH = path.join(DIST_DIR, 'presets.d.ts');
const SCHEMA_DIST_DIR = path.join(DIST_DIR, 'schema');
const THEME_SCHEMA_PATH = path.join(SOURCE_DIR, 'schema', 'theme.schema.json');

const PRIMITIVE_DIR = path.join(SOURCE_DIR, 'primitive');
const SEMANTIC_DIR = path.join(SOURCE_DIR, 'semantic');
const COMPONENT_DIR = path.join(SOURCE_DIR, 'components');
const THEMES_DIR = path.join(SOURCE_DIR, 'themes');

const COLOR_FN_PREFIXES = [
  'rgb',
  'rgba',
  'hsl',
  'hsla',
  'hwb',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'color',
  'color-mix',
  'linear-gradient',
  'radial-gradient',
  'conic-gradient',
  'var',
];
const COLOR_FN_PATTERN = new RegExp(`^(${COLOR_FN_PREFIXES.join('|')})\\(.+\\)$`);
const COLOR_KEYWORD_PATTERN = /^(transparent|currentColor|inherit|initial|unset|none)$/;
const COLOR_HEX_PATTERN = /^#[0-9a-fA-F]{3,8}$/;
const SINGLE_DIMENSION = '(auto|0|-?\\d*\\.?\\d+(px|em|rem|%|vh|vw|vmin|vmax|ch|ex)|calc\\(.+?\\)|var\\(.+?\\))';
const DIMENSION_PATTERN = new RegExp(`^${SINGLE_DIMENSION}(\\s+${SINGLE_DIMENSION}){0,3}$`);
const NUMBER_PATTERN = /^-?\d*\.?\d+$/;

function looksLikeColor(value) {
  return COLOR_HEX_PATTERN.test(value) || COLOR_KEYWORD_PATTERN.test(value) || COLOR_FN_PATTERN.test(value);
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}

function listJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .sort()
    .map((name) => path.join(dir, name));
}

function tokenKeyToCssVar(key) {
  return `--ty-${key.replace(/\./g, '-')}`;
}

function getComponentName(key) {
  return key.includes('.') ? key.split('.')[0] : null;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function resolveTokenValue(rawValue, tokenMap, stack = []) {
  if (typeof rawValue !== 'string') {
    return String(rawValue);
  }

  const match = rawValue.match(/^\{([^}]+)\}$/);
  if (!match) {
    return rawValue;
  }

  const refKey = match[1];
  if (stack.includes(refKey)) {
    throw new Error(`Circular token reference detected: ${[...stack, refKey].join(' -> ')}`);
  }

  const refToken = tokenMap.get(refKey);
  if (!refToken) {
    throw new Error(`Unresolved token reference: ${refKey}`);
  }

  return resolveTokenValue(refToken.$value, tokenMap, [...stack, refKey]);
}

function toCssValue(rawValue, tokenMap) {
  if (typeof rawValue !== 'string') {
    return String(rawValue);
  }

  const match = rawValue.match(/^\{([^}]+)\}$/);
  if (!match) {
    return rawValue;
  }

  const refKey = match[1];
  if (!tokenMap.has(refKey)) {
    throw new Error(`Unresolved token reference: ${refKey}`);
  }

  return `var(${tokenKeyToCssVar(refKey)})`;
}

function loadTokenFiles(dir, category) {
  return listJsonFiles(dir).flatMap((filePath) => {
    const fileData = readJson(filePath);
    return Object.entries(fileData).map(([key, value]) => ({
      key,
      ...value,
      category,
      source: path.relative(ROOT, filePath),
      component: category === 'component' ? getComponentName(key) : undefined,
    }));
  });
}

function isReferenceValue(value) {
  return typeof value === 'string' && /^\{[^}]+\}$/.test(value);
}

function typeMatchesValue(type, rawValue, tokenMap) {
  if (isReferenceValue(rawValue)) {
    const refKey = rawValue.slice(1, -1);
    const refToken = tokenMap.get(refKey);
    if (!refToken) return true;
    return refToken.$type === type;
  }
  const value = String(rawValue).trim();
  switch (type) {
    case 'color':
      return looksLikeColor(value);
    case 'dimension':
      return DIMENSION_PATTERN.test(value);
    case 'number':
      return NUMBER_PATTERN.test(value);
    default:
      return true;
  }
}

function validateTokens(tokens) {
  const keys = new Set();
  const cssVars = new Set();
  const tokenMap = new Map(tokens.map((t) => [t.key, t]));

  for (const token of tokens) {
    assert(!keys.has(token.key), `Duplicate token key: ${token.key}`);
    keys.add(token.key);

    const cssVar = tokenKeyToCssVar(token.key);
    assert(!cssVars.has(cssVar), `Duplicate css var: ${cssVar}`);
    cssVars.add(cssVar);

    if (token.category === 'component') {
      assert(token.component, `Missing component name for token: ${token.key}`);
    }

    if (token.$type && !typeMatchesValue(token.$type, token.$value, tokenMap)) {
      throw new Error(
        `Token "${token.key}" declares $type "${token.$type}" but $value "${token.$value}" does not match.`
      );
    }
  }

  for (const token of tokens) {
    if (!token.fallback) continue;
    if (!token.fallback.startsWith('--ty-')) {
      throw new Error(
        `Token "${token.key}" has invalid fallback "${token.fallback}"; must reference a --ty-* custom property.`
      );
    }
    if (!cssVars.has(token.fallback)) {
      throw new Error(
        `Token "${token.key}" fallback "${token.fallback}" does not match any registered CSS var.`
      );
    }
  }
}

function loadThemes() {
  return listJsonFiles(THEMES_DIR).map((filePath) => {
    const fileData = readJson(filePath);
    return {
      source: path.relative(ROOT, filePath),
      ...fileData,
    };
  });
}

function buildPresetMap(themes) {
  return themes.reduce((acc, theme) => {
    if (theme.meta && theme.meta.id) {
      acc[theme.meta.id] = theme;
    }
    return acc;
  }, {});
}

function buildRegistry(tokens) {
  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    tokens: tokens.map((token) => ({
      key: token.key,
      cssVar: tokenKeyToCssVar(token.key),
      category: token.category,
      ...(token.component ? { component: token.component } : {}),
      type: token.$type,
      group: token.component
        ? token.component.charAt(0).toUpperCase() + token.component.slice(1)
        : token.category === 'primitive'
          ? 'Primitive'
          : 'Semantic',
      description: token.description || '',
      source: token.source,
      defaultValue: token.$value,
      ...(token.fallback ? { fallback: token.fallback } : {}),
      status: token.status || 'active',
    })),
  };
}

function buildCss(tokens, cssValues) {
  const rootLines = [':root {'];

  for (const token of tokens) {
    rootLines.push(`  ${tokenKeyToCssVar(token.key)}: ${cssValues.get(token.key)};`);
  }

  rootLines.push('}');
  rootLines.push('');

  return rootLines.join('\n');
}

function buildThemeCss(tokens, cssValues, tokenMap, overrides, selector) {
  const lines = [`${selector} {`];

  for (const token of tokens) {
    const overrideValue = overrides[token.key];
    const value = overrideValue !== undefined ? toCssValue(overrideValue, tokenMap) : cssValues.get(token.key);
    lines.push(`  ${tokenKeyToCssVar(token.key)}: ${value};`);
  }

  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

function buildBaseThemeCss(tokens, cssValues, tokenMap, lightTheme, darkTheme) {
  const lightOverrides = {
    ...((lightTheme && lightTheme.tokens && lightTheme.tokens.semantic) || {}),
    ...((lightTheme && lightTheme.tokens && lightTheme.tokens.components) || {}),
  };
  const darkOverrides = {
    ...((darkTheme && darkTheme.tokens && darkTheme.tokens.semantic) || {}),
    ...((darkTheme && darkTheme.tokens && darkTheme.tokens.components) || {}),
  };

  const parts = [];
  parts.push(
    buildThemeCss(tokens, cssValues, tokenMap, lightOverrides, ":root, [data-tiny-theme='light']")
  );
  parts.push(buildThemeCss(tokens, cssValues, tokenMap, darkOverrides, "[data-tiny-theme='dark']"));
  parts.push('@media (prefers-color-scheme: dark) {');
  parts.push(buildThemeCss(tokens, cssValues, tokenMap, darkOverrides, "  [data-tiny-theme='system']").trimEnd());
  parts.push('}');
  parts.push('');

  return parts.join('\n');
}

function buildKeyUnion(keys) {
  if (keys.length === 0) return 'never';
  return keys.map((k) => `'${k}'`).join('\n  | ');
}

function buildRegistryDts(tokens) {
  const primitiveKeys = tokens.filter((t) => t.category === 'primitive').map((t) => t.key);
  const semanticKeys = tokens.filter((t) => t.category === 'semantic').map((t) => t.key);
  const componentKeys = tokens.filter((t) => t.category === 'component').map((t) => t.key);

  return `export type TokenCategory = 'primitive' | 'semantic' | 'component';
export type TokenType =
  | 'color'
  | 'dimension'
  | 'number'
  | 'font-family'
  | 'font-weight'
  | 'line-height'
  | 'shadow'
  | 'duration'
  | 'easing'
  | 'transition'
  | 'string';

export interface TokenRegistryEntry {
  key: string;
  cssVar: string;
  category: TokenCategory;
  component?: string;
  type: TokenType;
  group: string;
  description: string;
  source: string;
  defaultValue: string | number;
  fallback?: string;
  status: 'active' | 'deprecated' | 'internal';
}

export interface TokenRegistryDocument {
  version: number;
  generatedAt: string;
  tokens: TokenRegistryEntry[];
}

export type PrimitiveTokenKey =
  | ${buildKeyUnion(primitiveKeys)};

export type SemanticTokenKey =
  | ${buildKeyUnion(semanticKeys)};

export type ComponentTokenKey =
  | ${buildKeyUnion(componentKeys)};

export type TokenKey = PrimitiveTokenKey | SemanticTokenKey | ComponentTokenKey;
`;
}

function buildPresetsDts(presets) {
  const ids = Object.keys(presets);
  const presetUnion = ids.length > 0 ? ids.map((id) => `'${id}'`).join(' | ') : 'string';

  return `import type { SemanticTokenKey, ComponentTokenKey } from './registry';

export type PresetThemeId = ${presetUnion};

export interface ThemeDocumentMeta {
  id?: string;
  name?: string;
  author?: string;
  description?: string;
  version?: string;
  schemaVersion?: number;
  tags?: string[];
}

export interface ThemeDocumentTokens {
  semantic?: Record<string, string | number>;
  components?: Record<string, string | number>;
}

/** Same shape as ThemeDocumentTokens but with typed, autocompleted keys. */
export interface TypedThemeDocumentTokens {
  semantic?: Partial<Record<SemanticTokenKey, string | number>> &
    Record<string, string | number>;
  components?: Partial<Record<ComponentTokenKey, string | number>> &
    Record<string, string | number>;
}

export interface ThemeDocument {
  $schema?: string;
  meta?: ThemeDocumentMeta;
  mode: 'light' | 'dark' | 'system';
  extends?: string;
  tokens?: ThemeDocumentTokens;
}

/** Theme document with autocompletion and type-checking on token keys. */
export interface TypedThemeDocument {
  $schema?: string;
  meta?: ThemeDocumentMeta;
  mode: 'light' | 'dark' | 'system';
  extends?: PresetThemeId | (string & {});
  tokens?: TypedThemeDocumentTokens;
}

declare const presets: Record<PresetThemeId, ThemeDocument>;
export default presets;
`;
}

function buildRuntimeTokens() {
  console.log('Building runtime tokens...\n');

  const primitiveTokens = loadTokenFiles(PRIMITIVE_DIR, 'primitive');
  const semanticTokens = loadTokenFiles(SEMANTIC_DIR, 'semantic');
  const componentTokens = loadTokenFiles(COMPONENT_DIR, 'component');
  const allTokens = [...primitiveTokens, ...semanticTokens, ...componentTokens];
  const themes = loadThemes();

  validateTokens(allTokens);

  const tokenMap = new Map(allTokens.map((token) => [token.key, token]));
  const resolvedValues = new Map(
    allTokens.map((token) => [token.key, resolveTokenValue(token.$value, tokenMap)])
  );
  const cssValues = new Map(
    allTokens.map((token) => [token.key, toCssValue(token.$value, tokenMap)])
  );

  const registry = buildRegistry(allTokens);
  const lightTheme = themes.find((theme) => theme.mode === 'light');
  const darkTheme = themes.find((theme) => theme.mode === 'dark');
  const presets = buildPresetMap(themes);
  const lightThemeOverrides = {
    ...((lightTheme && lightTheme.tokens && lightTheme.tokens.semantic) || {}),
    ...((lightTheme && lightTheme.tokens && lightTheme.tokens.components) || {}),
  };
  const darkThemeOverrides = {
    ...((darkTheme && darkTheme.tokens && darkTheme.tokens.semantic) || {}),
    ...((darkTheme && darkTheme.tokens && darkTheme.tokens.components) || {}),
  };
  const lightCss = buildThemeCss(
    allTokens,
    cssValues,
    tokenMap,
    lightThemeOverrides,
    ':root'
  );
  const darkCss = buildThemeCss(
    allTokens,
    cssValues,
    tokenMap,
    darkThemeOverrides,
    "[data-tiny-theme='dark']"
  );
  const baseCss = buildBaseThemeCss(allTokens, cssValues, tokenMap, lightTheme, darkTheme);

  mkdirp(DIST_CSS_DIR);
  mkdirp(SCHEMA_DIST_DIR);
  writeJson(path.join(DIST_DIR, 'registry.json'), registry);
  writeJson(path.join(DIST_DIR, 'presets.json'), presets);
  fs.writeFileSync(path.join(DIST_CSS_DIR, 'light.css'), lightCss);
  fs.writeFileSync(path.join(DIST_CSS_DIR, 'dark.css'), darkCss);
  fs.writeFileSync(path.join(DIST_CSS_DIR, 'base.css'), baseCss);
  fs.writeFileSync(REGISTRY_DTS_PATH, buildRegistryDts(allTokens));
  fs.writeFileSync(PRESETS_DTS_PATH, buildPresetsDts(presets));
  fs.copyFileSync(THEME_SCHEMA_PATH, path.join(SCHEMA_DIST_DIR, 'theme.schema.json'));

  console.log('  dist/registry.json');
  console.log('  dist/registry.d.ts');
  console.log('  dist/presets.json');
  console.log('  dist/presets.d.ts');
  console.log('  dist/schema/theme.schema.json');
  console.log('  dist/css/light.css');
  console.log('  dist/css/dark.css');
  console.log('  dist/css/base.css');
  console.log('\nRuntime tokens done.');
}

module.exports = { buildRuntimeTokens };

if (require.main === module) {
  buildRuntimeTokens();
}
