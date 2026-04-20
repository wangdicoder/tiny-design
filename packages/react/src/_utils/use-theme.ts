import { useSyncExternalStore, useCallback, useContext } from 'react';
import type { ThemeMode } from '../config-provider/config-context';
import { ConfigContext } from '../config-provider/config-context';
import { getSystemTheme, themeStore } from './theme-store';

export interface UseThemeOptions {
  /**
   * Initial mode to hydrate the store with. Use on first mount for SSR to
   * align with the mode written to the document by a pre-hydration script.
   */
  initialMode?: ThemeMode;
}

export function useTheme(options?: UseThemeOptions) {
  if (options?.initialMode) {
    themeStore.hydrate(options.initialMode);
  }

  const contextMode = useContext(ConfigContext).theme;
  const storeMode = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );
  const mode: ThemeMode = contextMode ?? storeMode;

  const resolvedTheme: 'light' | 'dark' = mode === 'system' ? getSystemTheme() : mode;

  const setMode = useCallback((next: ThemeMode) => {
    themeStore.setMode(next);
  }, []);

  const toggle = useCallback(() => {
    const active = themeStore.getSnapshot();
    const resolved = active === 'system' ? getSystemTheme() : active;
    themeStore.setMode(resolved === 'light' ? 'dark' : 'light');
  }, []);

  return { mode, resolvedTheme, setMode, toggle };
}
