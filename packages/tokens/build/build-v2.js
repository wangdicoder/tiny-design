const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'source');
const DIST_DIR = path.join(ROOT, 'dist');
const DIST_CSS_DIR = path.join(DIST_DIR, 'css');
const REGISTRY_DTS_PATH = path.join(DIST_DIR, 'registry.d.ts');
const PRESETS_DTS_PATH = path.join(DIST_DIR, 'presets.d.ts');
const LEGACY_ALIAS_MAP_JSON_PATH = path.join(DIST_DIR, 'alias-map.json');
const LEGACY_ALIAS_MAP_DTS_PATH = path.join(DIST_DIR, 'alias-map.d.ts');
const SCHEMA_DIST_DIR = path.join(DIST_DIR, 'schema');
const THEME_SCHEMA_PATH = path.join(SOURCE_DIR, 'schema', 'theme.v1.schema.json');

const SEMANTIC_DIR = path.join(SOURCE_DIR, 'semantic');
const COMPONENT_DIR = path.join(SOURCE_DIR, 'components');
const THEMES_DIR = path.join(SOURCE_DIR, 'themes');

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}

function removeIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
  }
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

function validateTokens(tokens) {
  const keys = new Set();
  const cssVars = new Set();

  for (const token of tokens) {
    assert(!keys.has(token.key), `Duplicate token key: ${token.key}`);
    keys.add(token.key);

    const cssVar = tokenKeyToCssVar(token.key);
    assert(!cssVars.has(cssVar), `Duplicate css var: ${cssVar}`);
    cssVars.add(cssVar);

    if (token.category === 'component') {
      assert(token.component, `Missing component name for token: ${token.key}`);
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
        : 'Semantic',
      description: token.description || '',
      source: token.source,
      defaultValue: token.$value,
      ...(token.fallback ? { fallback: token.fallback } : {}),
      status: token.status || 'active',
    })),
  };
}

function buildCss(tokens, resolvedValues) {
  const rootLines = [':root {'];

  for (const token of tokens) {
    rootLines.push(`  ${tokenKeyToCssVar(token.key)}: ${resolvedValues.get(token.key)};`);
  }

  rootLines.push('}');
  rootLines.push('');

  return rootLines.join('\n');
}

function buildThemeCss(tokens, resolvedValues, overrides, selector) {
  const lines = [`${selector} {`];

  for (const token of tokens) {
    const overrideValue = overrides[token.key];
    const value = overrideValue !== undefined ? String(overrideValue) : resolvedValues.get(token.key);
    lines.push(`  ${tokenKeyToCssVar(token.key)}: ${value};`);
  }

  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

function buildBaseThemeCss(tokens, resolvedValues, lightTheme, darkTheme) {
  const lightOverrides = {
    ...((lightTheme && lightTheme.tokens && lightTheme.tokens.semantic) || {}),
    ...((lightTheme && lightTheme.tokens && lightTheme.tokens.components) || {}),
  };
  const darkOverrides = {
    ...((darkTheme && darkTheme.tokens && darkTheme.tokens.semantic) || {}),
    ...((darkTheme && darkTheme.tokens && darkTheme.tokens.components) || {}),
  };

  const parts = [];
  parts.push(buildThemeCss(tokens, resolvedValues, lightOverrides, ':root'));
  parts.push(buildThemeCss(tokens, resolvedValues, darkOverrides, "[data-tiny-theme='dark']"));
  parts.push('@media (prefers-color-scheme: dark) {');
  parts.push(buildThemeCss(tokens, resolvedValues, darkOverrides, "  [data-tiny-theme='system']").trimEnd());
  parts.push('}');
  parts.push('');

  return parts.join('\n');
}

function buildRegistryDts() {
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
`;
}

function buildPresetsDts(presets) {
  const ids = Object.keys(presets);
  const presetUnion = ids.length > 0 ? ids.map((id) => `'${id}'`).join(' | ') : 'string';

  return `export type PresetThemeId = ${presetUnion};

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

export interface ThemeDocument {
  $schema?: string;
  meta?: ThemeDocumentMeta;
  mode: 'light' | 'dark' | 'system';
  extends?: string;
  tokens?: ThemeDocumentTokens;
}

declare const presets: Record<PresetThemeId, ThemeDocument>;
export default presets;
`;
}

function buildRuntimeTokens() {
  console.log('Building runtime tokens...\n');

  const semanticTokens = loadTokenFiles(SEMANTIC_DIR, 'semantic');
  const componentTokens = loadTokenFiles(COMPONENT_DIR, 'component');
  const allTokens = [...semanticTokens, ...componentTokens];
  const themes = loadThemes();

  validateTokens(allTokens);

  const tokenMap = new Map(allTokens.map((token) => [token.key, token]));
  const resolvedValues = new Map(
    allTokens.map((token) => [token.key, resolveTokenValue(token.$value, tokenMap)])
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
    resolvedValues,
    lightThemeOverrides,
    ':root'
  );
  const darkCss = buildThemeCss(
    allTokens,
    resolvedValues,
    darkThemeOverrides,
    "[data-tiny-theme='dark']"
  );
  const baseCss = buildBaseThemeCss(allTokens, resolvedValues, lightTheme, darkTheme);

  mkdirp(DIST_CSS_DIR);
  mkdirp(SCHEMA_DIST_DIR);
  removeIfExists(LEGACY_ALIAS_MAP_JSON_PATH);
  removeIfExists(LEGACY_ALIAS_MAP_DTS_PATH);
  writeJson(path.join(DIST_DIR, 'registry.json'), registry);
  writeJson(path.join(DIST_DIR, 'presets.json'), presets);
  fs.writeFileSync(path.join(DIST_CSS_DIR, 'v2-light.css'), lightCss);
  fs.writeFileSync(path.join(DIST_CSS_DIR, 'v2-dark.css'), darkCss);
  fs.writeFileSync(path.join(DIST_CSS_DIR, 'base.css'), baseCss);
  fs.writeFileSync(REGISTRY_DTS_PATH, buildRegistryDts());
  fs.writeFileSync(PRESETS_DTS_PATH, buildPresetsDts(presets));
  fs.copyFileSync(THEME_SCHEMA_PATH, path.join(SCHEMA_DIST_DIR, 'theme.v1.schema.json'));

  console.log('  dist/registry.json');
  console.log('  dist/registry.d.ts');
  console.log('  dist/presets.json');
  console.log('  dist/presets.d.ts');
  console.log('  dist/schema/theme.v1.schema.json');
  console.log('  dist/css/v2-light.css');
  console.log('  dist/css/v2-dark.css');
  console.log('  dist/css/base.css');
  console.log('\nRuntime tokens done.');
}

module.exports = { buildRuntimeTokens };

if (require.main === module) {
  buildRuntimeTokens();
}
