import type { ThemeMode } from '../config-provider/config-context';

const STORAGE_KEY = 'ty-theme';
const THEME_ATTR = 'data-tiny-theme';

function readDomTheme(): ThemeMode | null {
  if (typeof document === 'undefined') return null;
  const value = document.documentElement.getAttribute(THEME_ATTR);
  return value === 'light' || value === 'dark' || value === 'system' ? value : null;
}

function readStoredTheme(): ThemeMode | null {
  if (typeof localStorage === 'undefined') return null;
  const value = localStorage.getItem(STORAGE_KEY);
  return value === 'light' || value === 'dark' || value === 'system' ? value : null;
}

function readInitialTheme(): ThemeMode {
  return readDomTheme() ?? readStoredTheme() ?? 'light';
}

function applyTheme(mode: ThemeMode): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute(THEME_ATTR, mode);
}

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

let currentMode: ThemeMode = readInitialTheme();
const listeners = new Set<() => void>();
let initialized = false;

function emit(): void {
  listeners.forEach((cb) => cb());
}

function ensureInitialized(): void {
  if (initialized) return;
  initialized = true;

  // Respect any mode that's already on the DOM (e.g. written by an inline
  // pre-hydration script) before we start broadcasting.
  const dom = readDomTheme();
  if (dom) {
    currentMode = dom;
  } else if (typeof document !== 'undefined') {
    applyTheme(currentMode);
  }

  if (typeof window === 'undefined') return;

  if (typeof window.matchMedia === 'function') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (currentMode === 'system') emit();
    };
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler);
    } else if (typeof (mql as MediaQueryList).addListener === 'function') {
      (mql as MediaQueryList).addListener(handler);
    }
  }

  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    const next =
      event.newValue === 'light' || event.newValue === 'dark' || event.newValue === 'system'
        ? event.newValue
        : 'light';
    currentMode = next;
    applyTheme(currentMode);
    emit();
  });
}

export const themeStore = {
  subscribe(cb: () => void): () => void {
    ensureInitialized();
    const syncFromDom = () => {
      const dom = readDomTheme();
      if (dom && dom !== currentMode) {
        currentMode = dom;
        cb();
      }
    };
    listeners.add(cb);
    syncFromDom();

    const observer =
      typeof MutationObserver !== 'undefined' && typeof document !== 'undefined'
        ? new MutationObserver(syncFromDom)
        : null;
    observer?.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [THEME_ATTR],
    });

    return () => {
      listeners.delete(cb);
      observer?.disconnect();
    };
  },
  getSnapshot(): ThemeMode {
    return readDomTheme() ?? currentMode;
  },
  getServerSnapshot(): ThemeMode {
    return 'light';
  },
  setMode(next: ThemeMode): void {
    ensureInitialized();
    currentMode = next;
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore quota/privacy errors */
      }
    }
    applyTheme(next);
    emit();
  },
  /**
   * Initialize the store with an explicit mode before any render. Useful for
   * SSR hydration when the initial mode comes from a cookie or inline script.
   */
  hydrate(next: ThemeMode): void {
    currentMode = next;
    if (typeof document !== 'undefined') {
      applyTheme(next);
    }
    initialized = true;
  },
};
