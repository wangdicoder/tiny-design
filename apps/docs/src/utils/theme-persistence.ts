import { applyTokens, clearAllTokenOverrides } from '../containers/theme-editor/utils/apply-theme';
import { loadFontFromValue } from '../containers/theme-editor/utils/font-loader';
import {
  buildLegacyPreviewOverrides,
  buildThemeDocumentFromSeeds,
  resolveThemeDocument,
} from './theme-document';

const STORAGE_KEY = 'ty-theme-editor-overrides';
const STORAGE_KEY_DARK = 'ty-theme-editor-overrides-dark';

function detectDarkMode(): boolean {
  return document.documentElement.getAttribute('data-tiny-theme') === 'dark';
}

function loadSeeds(isDark: boolean): Record<string, string> {
  try {
    const key = isDark ? STORAGE_KEY_DARK : STORAGE_KEY;
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);

    // Fallback: if no dark-specific seeds, use light seeds
    // (for presets without darkSeeds, the derivation handles mode differences)
    if (isDark) {
      const lightRaw = localStorage.getItem(STORAGE_KEY);
      return lightRaw ? JSON.parse(lightRaw) : {};
    }

    return {};
  } catch {
    return {};
  }
}

let lastApplied: Record<string, string> = {};

/**
 * Apply theme tokens to the DOM. This is the single source of truth
 * for setting inline CSS custom properties.
 *
 * @param seeds - seed overrides (if omitted, reads from localStorage for current mode)
 * @param isDark - dark mode flag (if omitted, detects from DOM attribute)
 */
export function applyThemeToDOM(
  seeds?: Record<string, string>,
  isDark?: boolean
): Record<string, string> {
  const darkMode = isDark ?? detectDarkMode();
  const resolvedSeeds = seeds ?? loadSeeds(darkMode);

  // Clear previous overrides
  if (Object.keys(lastApplied).length > 0) {
    clearAllTokenOverrides(lastApplied);
    lastApplied = {};
  }

  if (Object.keys(resolvedSeeds).length === 0) {
    return {};
  }

  // Load custom fonts if present
  if (resolvedSeeds['font-family']) loadFontFromValue(resolvedSeeds['font-family']);
  if (resolvedSeeds['font-family-monospace']) loadFontFromValue(resolvedSeeds['font-family-monospace']);

  const themeDocument = buildThemeDocumentFromSeeds(resolvedSeeds, darkMode);
  const resolvedV2Vars = resolveThemeDocument(themeDocument);
  const legacyPreviewVars = buildLegacyPreviewOverrides(resolvedSeeds, darkMode);
  const applied = {
    ...resolvedV2Vars,
    ...legacyPreviewVars,
  };

  lastApplied = applied;
  applyTokens(applied);
  return applied;
}

/**
 * Clear all theme overrides from the DOM.
 */
export function clearThemeFromDOM(): void {
  if (Object.keys(lastApplied).length > 0) {
    clearAllTokenOverrides(lastApplied);
    lastApplied = {};
  }
}

/**
 * Save seeds for both light and dark modes.
 */
export function saveSeeds(
  lightSeeds: Record<string, string>,
  darkSeeds?: Record<string, string>
): void {
  if (Object.keys(lightSeeds).length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lightSeeds));
  }

  if (darkSeeds && Object.keys(darkSeeds).length > 0) {
    localStorage.setItem(STORAGE_KEY_DARK, JSON.stringify(darkSeeds));
  } else {
    localStorage.removeItem(STORAGE_KEY_DARK);
  }
}

/**
 * Clear all stored seeds.
 */
export function clearStoredSeeds(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY_DARK);
}

export { buildThemeDocumentFromSeeds } from './theme-document';

// Global MutationObserver: re-apply theme tokens when dark mode toggles,
// even when the theme editor page is not mounted.
const observer = new MutationObserver(() => {
  applyThemeToDOM();
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-tiny-theme'],
});

// Apply on initial load
applyThemeToDOM();
