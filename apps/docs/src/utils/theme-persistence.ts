import type { ThemeDocument } from '@tiny-design/react';
import { buildThemeDocumentFromDraft, getPresetById, getPresetDraft, inferPresetIdFromThemeDocument, type ThemeMode } from '../containers/theme-studio/presets';
import { resolveThemeDocument } from './theme-document';

const STORAGE_KEY = 'ty-theme-studio-active-document';

let lastApplied: string[] = [];

function detectDarkMode(): boolean {
  return document.documentElement.getAttribute('data-tiny-theme') === 'dark';
}

function getThemeTargets(): HTMLElement[] {
  const targets: HTMLElement[] = [document.documentElement];
  if (document.body) targets.push(document.body);

  const root = document.getElementById('root');
  if (root) targets.push(root);

  return targets;
}

function applyCssVars(vars: Record<string, string>): void {
  const targets = getThemeTargets();
  targets.forEach((target) => {
    lastApplied.forEach((key) => target.style.removeProperty(key));
  });
  lastApplied = Object.keys(vars);

  targets.forEach((target) => {
    for (const [key, value] of Object.entries(vars)) {
      target.style.setProperty(key, value);
    }
  });
}

function clearCssVars(): void {
  getThemeTargets().forEach((target) => {
    lastApplied.forEach((key) => target.style.removeProperty(key));
  });
  lastApplied = [];
}

export function saveThemeDocument(theme: ThemeDocument): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
}

export function loadStoredThemeDocument(): ThemeDocument | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as ThemeDocument : undefined;
  } catch {
    return undefined;
  }
}

export function clearStoredThemeDocument(): void {
  localStorage.removeItem(STORAGE_KEY);
  clearCssVars();
}

export function applyThemeDocumentToDOM(
  theme?: ThemeDocument,
  options?: { respectThemeMode?: boolean }
): Record<string, string> {
  let stored = theme ?? loadStoredThemeDocument();
  if (!stored) {
    clearCssVars();
    return {};
  }

  const currentMode: ThemeMode = detectDarkMode() ? 'dark' : 'light';
  const presetId = inferPresetIdFromThemeDocument(stored);

  if (!options?.respectThemeMode && getPresetById(presetId).id === presetId && stored.mode !== currentMode) {
    const nextDraft = getPresetDraft(presetId, currentMode);
    const nextTheme = buildThemeDocumentFromDraft({
      ...nextDraft,
      meta: {
        name: stored.meta?.name ?? nextDraft.meta.name,
        author: stored.meta?.author ?? nextDraft.meta.author,
      },
    });
    saveThemeDocument(nextTheme);
    stored = nextTheme;
  }

  const preferThemeMode = options?.respectThemeMode && stored.mode;
  const isDark = preferThemeMode ? stored.mode === 'dark' : currentMode === 'dark';
  const effectiveTheme: ThemeDocument = {
    ...stored,
    mode: isDark ? 'dark' : 'light',
    extends: isDark ? 'tiny-dark' : 'tiny-light',
  };
  const vars = resolveThemeDocument(effectiveTheme);
  applyCssVars(vars);
  return vars;
}

const observer = new MutationObserver(() => {
  applyThemeDocumentToDOM();
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-tiny-theme'],
});

applyThemeDocumentToDOM();
