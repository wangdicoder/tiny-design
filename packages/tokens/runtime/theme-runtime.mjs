import registry from '../dist/registry.json' with { type: 'json' };
import presetsDocument from '../dist/presets.json' with { type: 'json' };

const defaultPresets = presetsDocument;

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isTokenValue(value) {
  return typeof value === 'string' || typeof value === 'number';
}

function tokenKeyToCssVar(key) {
  return `--ty-${key.replace(/\./g, '-')}`;
}

function cloneTokens(tokens) {
  return {
    semantic: { ...((tokens && tokens.semantic) || {}) },
    components: { ...((tokens && tokens.components) || {}) },
  };
}

function cloneThemeDocument(theme) {
  return {
    ...(theme.$schema ? { $schema: theme.$schema } : {}),
    ...(theme.meta ? { meta: { ...theme.meta } } : {}),
    ...(theme.mode ? { mode: theme.mode } : {}),
    ...(theme.extends ? { extends: theme.extends } : {}),
    tokens: cloneTokens(theme.tokens),
  };
}

function normalizeThemeInput(input) {
  if (!isObject(input)) {
    return {
      meta: {},
      tokens: {
        semantic: {},
        components: {},
      },
    };
  }

  const mode = typeof input.mode === 'string'
    ? input.mode
    : input.meta && typeof input.meta.mode === 'string'
      ? input.meta.mode
      : undefined;

  return {
    ...(typeof input.$schema === 'string' ? { $schema: input.$schema } : {}),
    ...(isObject(input.meta) ? { meta: { ...input.meta } } : { meta: {} }),
    ...(mode ? { mode } : {}),
    ...(typeof input.extends === 'string' ? { extends: input.extends } : {}),
    tokens: {
      semantic: isObject(input.tokens && input.tokens.semantic) ? { ...input.tokens.semantic } : {},
      components: isObject(input.tokens && input.tokens.components) ? { ...input.tokens.components } : {},
    },
  };
}

function mergeThemeDocuments(baseTheme, overrideTheme) {
  const base = normalizeThemeInput(baseTheme);
  const override = normalizeThemeInput(overrideTheme);

  return {
    ...(base.$schema ? { $schema: base.$schema } : {}),
    ...(override.$schema ? { $schema: override.$schema } : {}),
    meta: {
      ...(base.meta || {}),
      ...(override.meta || {}),
    },
    ...(base.mode ? { mode: base.mode } : {}),
    ...(override.mode ? { mode: override.mode } : {}),
    ...(base.extends ? { extends: base.extends } : {}),
    ...(override.extends ? { extends: override.extends } : {}),
    tokens: {
      semantic: {
        ...((base.tokens && base.tokens.semantic) || {}),
        ...((override.tokens && override.tokens.semantic) || {}),
      },
      components: {
        ...((base.tokens && base.tokens.components) || {}),
        ...((override.tokens && override.tokens.components) || {}),
      },
    },
  };
}

function buildRegistryMaps(registryDocument) {
  const byKey = new Map();

  for (const token of registryDocument.tokens || []) {
    byKey.set(token.key, token);
  }

  return { byKey };
}

function resolveReferenceValue(rawValue, rawValues, cache, stack) {
  if (typeof rawValue !== 'string') {
    return String(rawValue);
  }

  const match = rawValue.match(/^\{([^}]+)\}$/);
  if (!match) {
    return rawValue;
  }

  const refKey = match[1];
  if (cache.has(refKey)) {
    return cache.get(refKey);
  }

  if (stack.has(refKey)) {
    return rawValue;
  }

  const nextRaw = rawValues[refKey];
  if (nextRaw == null) {
    return rawValue;
  }

  stack.add(refKey);
  const resolved = resolveReferenceValue(nextRaw, rawValues, cache, stack);
  stack.delete(refKey);
  cache.set(refKey, resolved);
  return resolved;
}

function resolvePresetChain(theme, presets, errors, warnings, visited) {
  if (!theme || !theme.extends) {
    return undefined;
  }

  const presetId = theme.extends;
  const preset = presets[presetId];
  if (!preset) {
    errors.push(`Unknown preset theme "${presetId}".`);
    return undefined;
  }

  if (visited.has(presetId)) {
    errors.push(`Circular preset extension detected for "${presetId}".`);
    return undefined;
  }

  visited.add(presetId);
  const normalizedPreset = normalizeThemeInput(preset);
  const basePreset = resolvePresetChain(normalizedPreset, presets, errors, warnings, visited);
  visited.delete(presetId);

  if (!normalizedPreset.mode && presetId === 'tiny-light') {
    normalizedPreset.mode = 'light';
  }
  if (!normalizedPreset.mode && presetId === 'tiny-dark') {
    normalizedPreset.mode = 'dark';
  }

  if (basePreset) {
    return mergeThemeDocuments(basePreset, {
      ...normalizedPreset,
      extends: undefined,
    });
  }

  return normalizedPreset;
}

function validateTokenSection(section, category, registryMaps, errors, warnings, strict) {
  if (!isObject(section)) {
    if (section !== undefined) {
      errors.push(`Theme tokens.${category} must be an object.`);
    }
    return;
  }

  for (const [key, value] of Object.entries(section)) {
    if (!isTokenValue(value)) {
      errors.push(`Theme token "${key}" must be a string or number.`);
      continue;
    }

    const registryToken = registryMaps.byKey.get(key);
    if (!registryToken) {
      const message = `Unknown theme token "${key}".`;
      if (strict) {
        errors.push(message);
      } else {
        warnings.push(message);
      }
      continue;
    }

    if (registryToken.category !== category) {
      warnings.push(
        `Theme token "${key}" is authored under "${category}" but belongs to "${registryToken.category}".`
      );
    }

    if (registryToken.status === 'deprecated') {
      warnings.push(`Theme token "${key}" is deprecated.`);
    }

    if (registryToken.status === 'internal') {
      const message = `Theme token "${key}" is internal and should not be authored by consumers.`;
      if (strict) {
        errors.push(message);
      } else {
        warnings.push(message);
      }
    }
  }
}

function validateThemeDocument(input, options) {
  const opts = options || {};
  const strict = Boolean(opts.strict);
  const errors = [];
  const warnings = [];
  const normalizedDocument = normalizeThemeInput(input);
  const presets = opts.presets || defaultPresets;
  const registryDocument = opts.registry || registry;
  const registryMaps = buildRegistryMaps(registryDocument);

  if (!isObject(input)) {
    errors.push('Theme input must be an object.');
  }

  if (normalizedDocument.mode !== undefined) {
    if (!['light', 'dark', 'system'].includes(normalizedDocument.mode)) {
      errors.push(`Theme mode "${normalizedDocument.mode}" is invalid.`);
    }
  }

  if (normalizedDocument.meta && normalizedDocument.meta.schemaVersion !== undefined) {
    if (normalizedDocument.meta.schemaVersion !== 1) {
      warnings.push(`Unexpected theme schemaVersion "${normalizedDocument.meta.schemaVersion}".`);
    }
  }

  if (normalizedDocument.extends !== undefined && typeof normalizedDocument.extends !== 'string') {
    errors.push('Theme extends must be a string.');
  }

  if (normalizedDocument.extends) {
    const visited = new Set();
    resolvePresetChain(normalizedDocument, presets, errors, warnings, visited);
  }

  validateTokenSection(
    normalizedDocument.tokens && normalizedDocument.tokens.semantic,
    'semantic',
    registryMaps,
    errors,
    warnings,
    strict
  );
  validateTokenSection(
    normalizedDocument.tokens && normalizedDocument.tokens.components,
    'component',
    registryMaps,
    errors,
    warnings,
    strict
  );

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    normalizedDocument,
  };
}

function resolveTheme(input, options) {
  const opts = options || {};
  const registryDocument = opts.registry || registry;
  const presets = opts.presets || defaultPresets;
  const validation = validateThemeDocument(input, opts);
  const normalizedInput = validation.normalizedDocument;
  const baseTheme = resolvePresetChain(
    normalizedInput,
    presets,
    validation.errors,
    validation.warnings,
    new Set()
  );

  const mergedTheme = baseTheme
    ? mergeThemeDocuments(baseTheme, { ...normalizedInput, extends: undefined })
    : cloneThemeDocument(normalizedInput);

  const effectiveMode = normalizedInput.mode || (baseTheme && baseTheme.mode) || undefined;

  const rawValues = {};
  for (const token of registryDocument.tokens || []) {
    rawValues[token.key] = String(token.defaultValue);
  }

  if (baseTheme && baseTheme.tokens) {
    for (const [key, value] of Object.entries(baseTheme.tokens.semantic || {})) {
      rawValues[key] = String(value);
    }
    for (const [key, value] of Object.entries(baseTheme.tokens.components || {})) {
      rawValues[key] = String(value);
    }
  }

  for (const [key, value] of Object.entries((normalizedInput.tokens && normalizedInput.tokens.semantic) || {})) {
    rawValues[key] = String(value);
  }
  for (const [key, value] of Object.entries((normalizedInput.tokens && normalizedInput.tokens.components) || {})) {
    rawValues[key] = String(value);
  }

  const cache = new Map();
  const cssVars = {};
  for (const token of registryDocument.tokens || []) {
    const resolvedValue = resolveReferenceValue(rawValues[token.key], rawValues, cache, new Set([token.key]));
    cssVars[tokenKeyToCssVar(token.key)] = resolvedValue;
  }

  const semanticTokens = (normalizedInput.tokens && normalizedInput.tokens.semantic) || {};
  const componentTokens = (normalizedInput.tokens && normalizedInput.tokens.components) || {};
  const registryKeys = new Set((registryDocument.tokens || []).map((token) => token.key));

  for (const [key, value] of Object.entries(semanticTokens)) {
    if (!registryKeys.has(key)) {
      cssVars[tokenKeyToCssVar(key)] = String(value);
    }
  }

  for (const [key, value] of Object.entries(componentTokens)) {
    if (!registryKeys.has(key)) {
      cssVars[tokenKeyToCssVar(key)] = String(value);
    }
  }

  return {
    mode: effectiveMode,
    cssVars,
    warnings: validation.warnings,
    errors: validation.errors,
    valid: validation.valid,
    normalizedDocument: mergedTheme,
  };
}

function escapeAttr(value) {
  return String(value).replace(/"/g, '\\"');
}

/**
 * Build a CSS stylesheet string that, when injected before hydration, applies
 * the given theme without FOUC. Only overrides (not the full registry) are
 * emitted — base.css already contains default values.
 */
function getThemeStylesheet(input, options) {
  const opts = options || {};
  const selector = opts.selector || ':root';
  const result = resolveTheme(input, opts);
  const mode = result.mode;

  const lines = [];
  const overrides = [];

  const merged = result.normalizedDocument && result.normalizedDocument.tokens;
  const semanticOverrides = (merged && merged.semantic) || {};
  const componentOverrides = (merged && merged.components) || {};

  for (const [key, value] of Object.entries(semanticOverrides)) {
    overrides.push(`  ${tokenKeyToCssVar(key)}: ${value};`);
  }
  for (const [key, value] of Object.entries(componentOverrides)) {
    overrides.push(`  ${tokenKeyToCssVar(key)}: ${value};`);
  }

  if (mode) {
    overrides.push(`  color-scheme: ${mode === 'system' ? 'light dark' : mode};`);
  }

  if (overrides.length === 0 && !mode) {
    return '';
  }

  const attr = mode ? `[data-tiny-theme="${escapeAttr(mode)}"]` : '';
  lines.push(`${selector}${attr} {`);
  lines.push(...overrides);
  lines.push('}');
  return lines.join('\n') + '\n';
}

export {
  defaultPresets,
  getThemeStylesheet,
  mergeThemeDocuments,
  normalizeThemeInput,
  resolveTheme,
  tokenKeyToCssVar,
  validateThemeDocument,
};
