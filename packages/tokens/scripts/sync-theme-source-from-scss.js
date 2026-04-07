const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'source');
const SEMANTIC_DIR = path.join(SOURCE_DIR, 'semantic');
const COMPONENT_DIR = path.join(SOURCE_DIR, 'components');
const THEMES_DIR = path.join(SOURCE_DIR, 'themes');
const LIGHT_THEME_PATH = path.join(ROOT, 'scss', 'themes', '_light.scss');
const DARK_THEME_PATH = path.join(ROOT, 'scss', 'themes', '_dark.scss');

const COMPONENT_PREFIX_MAP = {
  alert: 'alert',
  anchor: 'anchor',
  avatar: 'avatar',
  'back-top': 'back-top',
  badge: 'badge',
  btn: 'button',
  calendar: 'calendar',
  card: 'card',
  carousel: 'carousel',
  cascader: 'cascader',
  checkbox: 'checkbox',
  collapse: 'collapse',
  descriptions: 'descriptions',
  description: 'descriptions',
  divider: 'divider',
  drawer: 'drawer',
  empty: 'empty',
  form: 'form',
  input: 'input',
  'input-number': 'input-number',
  kbd: 'keyboard',
  keyboard: 'keyboard',
  layout: 'layout',
  list: 'list',
  marquee: 'marquee',
  menu: 'menu',
  message: 'message',
  modal: 'modal',
  'native-select': 'native-select',
  notification: 'notification',
  pagination: 'pagination',
  picker: 'picker',
  popover: 'popover',
  popup: 'popup',
  progress: 'progress',
  radio: 'radio',
  result: 'result',
  segmented: 'segmented',
  select: 'select',
  skeleton: 'skeleton',
  slider: 'slider',
  'speed-dial': 'speed-dial',
  split: 'split',
  steps: 'steps',
  'strength-indicator': 'strength-indicator',
  switch: 'switch',
  table: 'table',
  tabs: 'tabs',
  tag: 'tag',
  textarea: 'textarea',
  timeline: 'timeline',
  tooltip: 'tooltip',
  transfer: 'transfer',
  tree: 'tree',
  typography: 'typography',
  upload: 'upload',
};

const SEMANTIC_EXACT_KEYS = new Set([
  'border-radius',
  'font-family',
  'font-family-monospace',
  'font-size-base',
  'font-size-lg',
  'font-size-sm',
  'font-weight',
  'headings-font-weight',
  'height-lg',
  'height-md',
  'height-sm',
  'line-height-base',
  'spacer',
]);
const SKIP_COMPONENT_PREFIXES = new Set(['btn', 'input', 'card']);

// When multiple semantic keys share the same light+dark value pair,
// prefer more general tokens over specific ones for component fallback matching.
const SEMANTIC_PREFERENCE_ORDER = [
  'color-bg-container',
  'color-bg-elevated',
  'color-bg',
  'color-bg-layout',
  'color-bg-disabled',
  'color-bg-spotlight',
  'color-text',
  'color-text-secondary',
  'color-text-heading',
  'color-text-label',
  'color-fill',
  'color-fill-secondary',
  'color-fill-tertiary',
  'color-border',
  'color-border-secondary',
  'color-border-light',
  'color-primary',
  'color-primary-hover',
  'color-info',
  'color-success',
  'color-warning',
  'color-danger',
];

function getSemanticFileName(key) {
  if (/^chart-\d+$/.test(key)) return 'charts.json';
  if (key.startsWith('color-')) return 'colors.json';
  if (key.startsWith('shadow-')) return 'effects.json';
  if (
    key.startsWith('font-') ||
    key.startsWith('line-') ||
    /^h[1-6]-font-size$/.test(key) ||
    key === 'headings-font-weight'
  ) {
    return 'typography.json';
  }
  if (key === 'spacer' || key.startsWith('spacing-')) return 'spacing.json';
  if (key === 'border-radius' || key.startsWith('height-')) return 'size.json';
  return 'misc.json';
}

function preferredSemanticKey(existingKey, newKey) {
  const existingRank = SEMANTIC_PREFERENCE_ORDER.indexOf(existingKey);
  const newRank = SEMANTIC_PREFERENCE_ORDER.indexOf(newKey);
  // Lower index = higher preference. -1 means not in the list (lowest priority).
  if (existingRank === -1 && newRank === -1) return existingKey;
  if (existingRank === -1) return newKey;
  if (newRank === -1) return existingKey;
  return newRank < existingRank ? newKey : existingKey;
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function listJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .sort()
    .map((name) => path.join(dir, name));
}

function stripCommentLines(source) {
  return source
    .split('\n')
    .filter((line) => !line.trim().startsWith('//'))
    .join('\n');
}

function splitTopLevel(source, separator) {
  const parts = [];
  let current = '';
  let parenDepth = 0;
  let braceDepth = 0;
  let bracketDepth = 0;
  let quote = null;
  let escape = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      current += char;
      if (escape) {
        escape = false;
        continue;
      }
      if (char === '\\') {
        escape = true;
        continue;
      }
      if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === '\'') {
      quote = char;
      current += char;
      continue;
    }

    if (char === '(') parenDepth += 1;
    if (char === ')') parenDepth -= 1;
    if (char === '{') braceDepth += 1;
    if (char === '}') braceDepth -= 1;
    if (char === '[') bracketDepth += 1;
    if (char === ']') bracketDepth -= 1;

    if (
      char === separator &&
      parenDepth === 0 &&
      braceDepth === 0 &&
      bracketDepth === 0
    ) {
      const trimmed = current.trim();
      if (trimmed) parts.push(trimmed);
      current = '';
      continue;
    }

    current += char;
  }

  const trimmed = current.trim();
  if (trimmed) parts.push(trimmed);
  return parts;
}

function splitEntry(entry) {
  let parenDepth = 0;
  let braceDepth = 0;
  let bracketDepth = 0;
  let quote = null;
  let escape = false;

  for (let i = 0; i < entry.length; i += 1) {
    const char = entry[i];

    if (quote) {
      if (escape) {
        escape = false;
        continue;
      }
      if (char === '\\') {
        escape = true;
        continue;
      }
      if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === '\'') {
      quote = char;
      continue;
    }

    if (char === '(') parenDepth += 1;
    if (char === ')') parenDepth -= 1;
    if (char === '{') braceDepth += 1;
    if (char === '}') braceDepth -= 1;
    if (char === '[') bracketDepth += 1;
    if (char === ']') bracketDepth -= 1;

    if (char === ':' && parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
      return [entry.slice(0, i).trim(), entry.slice(i + 1).trim()];
    }
  }

  throw new Error(`Failed to parse theme entry: ${entry}`);
}

function normalizeScssValue(rawValue) {
  return rawValue
    .replace(/#\{\s*([^}]+)\s*\}/g, '$1')
    .replace(/'\s*,\s*'/g, ',')
    .replace(/\s+/g, ' ')
    .replace(/\s+,/g, ',')
    .trim();
}

function parseThemeMap(filePath) {
  const source = stripCommentLines(fs.readFileSync(filePath, 'utf8'));
  const start = source.indexOf('(');
  const end = source.lastIndexOf(');');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`Failed to locate theme map in ${filePath}`);
  }

  const body = source.slice(start + 1, end);
  const entries = splitTopLevel(body, ',');
  const tokens = {};

  for (const entry of entries) {
    const [key, value] = splitEntry(entry);
    tokens[key] = normalizeScssValue(value);
  }

  return tokens;
}

function titleCase(input) {
  return input
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function cssVarForTokenKey(key) {
  return `--ty-${key.replace(/\./g, '-')}`;
}

function isSemanticKey(key) {
  if (key.startsWith('color-picker-')) return false;
  if (SEMANTIC_EXACT_KEYS.has(key)) return true;
  if (/^h[1-6]-font-size$/.test(key)) return true;
  if (/^chart-\d+$/.test(key)) return true;
  return (
    key.startsWith('color-') ||
    key.startsWith('shadow-') ||
    key.startsWith('font-') ||
    key.startsWith('line-') ||
    key.startsWith('height-')
  );
}

function inferTokenType(key, value) {
  const lowerValue = String(value).toLowerCase();

  if (key.includes('font-family')) return 'font-family';
  if (key.includes('font-weight') || key === 'font-weight') return 'font-weight';
  if (key.includes('line-height')) return 'line-height';
  if (key.includes('duration')) return 'duration';
  if (key.includes('transition')) return 'transition';
  if (key.includes('shadow')) return 'shadow';

  if (
    lowerValue.startsWith('#') ||
    lowerValue.startsWith('rgb') ||
    lowerValue.startsWith('hsl') ||
    lowerValue === 'transparent' ||
    lowerValue === 'currentcolor'
  ) {
    return 'color';
  }

  if (/^-?\d+(\.\d+)?$/.test(lowerValue)) {
    return key.includes('opacity') ? 'number' : 'string';
  }

  if (
    /-?\d/.test(lowerValue) &&
    /(px|rem|em|%|vh|vw|ch)$/.test(lowerValue)
  ) {
    return 'dimension';
  }

  if (lowerValue.startsWith('linear-gradient')) return 'string';

  return 'string';
}

function inferDescription(key, category, componentName) {
  const suffix = category === 'component' ? key.split('.').slice(1).join(' ') : key;
  const label = suffix.replace(/-/g, ' ');
  if (category === 'component') {
    return `${titleCase(componentName)} ${label}.`;
  }
  return `${label.replace(/\b\w/g, (char) => char.toUpperCase())}.`;
}

function findComponentPrefix(key) {
  const prefixes = Object.keys(COMPONENT_PREFIX_MAP).sort((a, b) => b.length - a.length);
  return prefixes.find((prefix) => key === prefix || key.startsWith(`${prefix}-`));
}

function loadExistingTokenKeys(dir) {
  const keys = new Set();
  for (const filePath of listJsonFiles(dir)) {
    for (const key of Object.keys(readJson(filePath))) {
      keys.add(key);
    }
  }
  return keys;
}

function syncThemeSourceFromScss() {
  const lightTheme = parseThemeMap(LIGHT_THEME_PATH);
  const darkTheme = parseThemeMap(DARK_THEME_PATH);
  const semanticKeys = loadExistingTokenKeys(SEMANTIC_DIR);
  const componentKeys = loadExistingTokenKeys(COMPONENT_DIR);

  const generatedSemantic = {};
  const generatedComponents = {};
  const darkSemanticOverrides = {};
  const darkComponentOverrides = {};
  const semanticValueIndex = new Map();

  for (const [key, lightValue] of Object.entries(lightTheme)) {
    if (!isSemanticKey(key)) continue;

    const darkValue = darkTheme[key];
    const indexKey = `${lightValue}:::${darkValue}`;
    const existingKey = semanticValueIndex.get(indexKey);
    if (existingKey) {
      semanticValueIndex.set(indexKey, preferredSemanticKey(existingKey, key));
    } else {
      semanticValueIndex.set(indexKey, key);
    }

    if (!semanticKeys.has(key)) {
      generatedSemantic[key] = {
        $value: lightValue,
        $type: inferTokenType(key, lightValue),
        description: inferDescription(key, 'semantic'),
      };
    }

    if (darkValue !== undefined && darkValue !== lightValue) {
      darkSemanticOverrides[key] = darkValue;
    }
  }

  for (const [legacyKey, lightValue] of Object.entries(lightTheme)) {
    if (isSemanticKey(legacyKey)) continue;

    const prefix = findComponentPrefix(legacyKey);
    if (!prefix) continue;
    if (SKIP_COMPONENT_PREFIXES.has(prefix)) continue;

    const componentName = COMPONENT_PREFIX_MAP[prefix];
    const suffix = legacyKey === prefix ? '' : legacyKey.slice(prefix.length + 1);
    const tokenKey = suffix ? `${componentName}.${suffix}` : componentName;
    const darkValue = darkTheme[legacyKey];
    if (!componentKeys.has(tokenKey)) {
      const semanticMatch = semanticValueIndex.get(`${lightValue}:::${darkValue}`);
      const primaryCssVar = cssVarForTokenKey(tokenKey);
      const legacyCssVar = `--ty-${legacyKey}`;
      const definition = {
        $value: semanticMatch ? `{${semanticMatch}}` : lightValue,
        $type: inferTokenType(tokenKey, lightValue),
        description: inferDescription(tokenKey, 'component', componentName),
      };

      if (semanticMatch) {
        definition.fallback = `--ty-${semanticMatch}`;
      }

      if (legacyCssVar !== primaryCssVar) {
        definition.aliases = [legacyCssVar];
      }

      if (!generatedComponents[componentName]) {
        generatedComponents[componentName] = {};
      }
      generatedComponents[componentName][tokenKey] = definition;
    }

    if (darkValue !== undefined && darkValue !== lightValue) {
      darkComponentOverrides[tokenKey] = darkValue;
    }
  }

  mkdirp(SEMANTIC_DIR);
  mkdirp(COMPONENT_DIR);
  mkdirp(THEMES_DIR);

  if (Object.keys(generatedSemantic).length > 0) {
    const semanticGroups = new Map();

    for (const key of Object.keys(generatedSemantic).sort()) {
      const fileName = getSemanticFileName(key);
      if (!semanticGroups.has(fileName)) {
        semanticGroups.set(fileName, {});
      }
      semanticGroups.get(fileName)[key] = generatedSemantic[key];
    }

    for (const [fileName, tokenMap] of semanticGroups.entries()) {
      writeJson(path.join(SEMANTIC_DIR, fileName), tokenMap);
    }
  }

  for (const [componentName, tokenMap] of Object.entries(generatedComponents)) {
    const componentOut = {};
    for (const key of Object.keys(tokenMap).sort()) {
      componentOut[key] = tokenMap[key];
    }
    writeJson(path.join(COMPONENT_DIR, `${componentName}.json`), componentOut);
  }

  writeJson(path.join(THEMES_DIR, 'light.json'), {
    meta: {
      id: 'tiny-light',
      name: 'Tiny Light',
      mode: 'light',
    },
    tokens: {
      semantic: {},
      components: {},
    },
  });

  const persistedComponentKeys = loadExistingTokenKeys(COMPONENT_DIR);
  const resolvedDarkComponentOverrides = {};

  for (const [legacyKey, lightValue] of Object.entries(lightTheme)) {
    if (isSemanticKey(legacyKey)) continue;

    const prefix = findComponentPrefix(legacyKey);
    if (!prefix) continue;
    if (SKIP_COMPONENT_PREFIXES.has(prefix)) continue;

    const componentName = COMPONENT_PREFIX_MAP[prefix];
    const suffix = legacyKey === prefix ? '' : legacyKey.slice(prefix.length + 1);
    const tokenKey = suffix ? `${componentName}.${suffix}` : componentName;
    if (!persistedComponentKeys.has(tokenKey)) continue;

    const darkValue = darkTheme[legacyKey];
    if (darkValue !== undefined && darkValue !== lightValue) {
      resolvedDarkComponentOverrides[tokenKey] = darkValue;
    }
  }

  const darkThemeOut = {
    meta: {
      id: 'tiny-dark',
      name: 'Tiny Dark',
      mode: 'dark',
    },
    tokens: {
      semantic: {},
      components: {},
    },
  };

  for (const key of Object.keys(darkSemanticOverrides).sort()) {
    darkThemeOut.tokens.semantic[key] = darkSemanticOverrides[key];
  }

  for (const key of Object.keys(resolvedDarkComponentOverrides).sort()) {
    darkThemeOut.tokens.components[key] = resolvedDarkComponentOverrides[key];
  }

  writeJson(path.join(THEMES_DIR, 'dark.json'), darkThemeOut);
}

module.exports = { parseThemeMap, syncThemeSourceFromScss };

if (require.main === module) {
  syncThemeSourceFromScss();
}
