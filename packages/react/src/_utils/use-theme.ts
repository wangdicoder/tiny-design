import { useSyncExternalStore, useCallback } from 'react';
import type { ThemeMode } from '../config-provider/config-context';

const STORAGE_KEY = 'ty-theme';
const THEME_ATTR = 'data-tiny-theme';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(mode: ThemeMode): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute(THEME_ATTR, mode);
}

function readDomTheme(): ThemeMode | null {
  if (typeof document === 'undefined') return null;
  const value = document.documentElement.getAttribute(THEME_ATTR);
  return value === 'light' || value === 'dark' || value === 'system' ? value : null;
}

function readStoredTheme(): ThemeMode {
  if (typeof localStorage === 'undefined') return 'light';
  return (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'light';
}

function readInitialTheme(): ThemeMode {
  return readDomTheme() ?? readStoredTheme();
}

// ---- Shared store ----
let currentMode: ThemeMode = readInitialTheme();
const listeners = new Set<() => void>();

function getSnapshot(): ThemeMode {
  return readDomTheme() ?? currentMode;
}

function getServerSnapshot(): ThemeMode {
  return 'light';
}

function subscribe(cb: () => void): () => void {
  const syncFromDom = () => {
    const domTheme = readDomTheme();

    if (domTheme && domTheme !== currentMode) {
      currentMode = domTheme;
      cb();
    }
  };

  listeners.add(cb);
  syncFromDom();

  const observer =
    typeof MutationObserver !== 'undefined' && typeof document !== 'undefined'
      ? new MutationObserver(() => {
          syncFromDom();
        })
      : null;

  observer?.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [THEME_ATTR],
  });

  return () => {
    listeners.delete(cb);
    observer?.disconnect();
  };
}

function setThemeMode(next: ThemeMode): void {
  currentMode = next;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, next);
  }
  applyTheme(next);
  listeners.forEach((cb) => cb());
}

function emit(): void {
  listeners.forEach((cb) => cb());
}

// Listen for system preference changes at module level
if (typeof document !== 'undefined') {
  applyTheme(currentMode);
}

if (typeof window !== 'undefined') {
  if (typeof window.matchMedia === 'function') {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (currentMode === 'system') {
        emit();
      }
    };

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', handleSystemThemeChange);
    } else if (typeof mediaQueryList.addListener === 'function') {
      mediaQueryList.addListener(handleSystemThemeChange);
    }
  }

  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) {
      return;
    }

    currentMode = event.newValue === 'light' || event.newValue === 'dark' || event.newValue === 'system'
      ? event.newValue
      : 'light';
    applyTheme(currentMode);
    emit();
  });
}

// ---- Hook ----
export function useTheme() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const resolvedTheme: 'light' | 'dark' = mode === 'system' ? getSystemTheme() : mode;

  const setMode = useCallback((newMode: ThemeMode) => {
    setThemeMode(newMode);
  }, []);

  const toggle = useCallback(() => {
    const resolved = currentMode === 'system' ? getSystemTheme() : currentMode;
    setThemeMode(resolved === 'light' ? 'dark' : 'light');
  }, []);

  return { mode, resolvedTheme, setMode, toggle };
}
