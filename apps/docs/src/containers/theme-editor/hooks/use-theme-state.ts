import { useState, useCallback, useEffect, useRef } from 'react';
import { ALL_TOKENS } from '../constants/default-tokens';
import {
  applyThemeToDOM,
  clearThemeFromDOM,
  saveSeeds,
  clearStoredSeeds,
} from '../../../utils/theme-persistence';

const STORAGE_KEY = 'ty-theme-editor-overrides';
const PRESET_ID_KEY = 'ty-theme-preset-id';

function loadFromStorage(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function detectDarkMode(): boolean {
  return document.documentElement.getAttribute('data-tiny-theme') === 'dark';
}

export interface ThemeState {
  /** Raw seed overrides (only user-changed tokens) */
  seeds: Record<string, string>;
  /** All derived + seed tokens currently applied */
  applied: Record<string, string>;
  /** Whether dark mode is active */
  isDark: boolean;
  /** Update a single seed token */
  setSeed: (key: string, value: string) => void;
  /** Apply a full preset (replaces all seeds) */
  applyPreset: (presetSeeds: Record<string, string>) => void;
  /** Reset everything to defaults */
  reset: () => void;
  /** Check if a token has been overridden */
  isOverridden: (key: string) => boolean;
  /** Reset a single token to default */
  resetToken: (key: string) => void;
}

export function useThemeState(): ThemeState {
  const [seeds, setSeeds] = useState<Record<string, string>>(loadFromStorage);
  const [isDark, setIsDark] = useState(detectDarkMode);
  const appliedRef = useRef<Record<string, string>>({});

  const applyAll = useCallback((newSeeds: Record<string, string>, dark?: boolean) => {
    const darkMode = dark ?? detectDarkMode();

    // Delegate DOM application to the global persistence module
    const derived = applyThemeToDOM(newSeeds, darkMode);
    appliedRef.current = derived;
  }, []);

  // Apply on mount
  useEffect(() => {
    if (Object.keys(seeds).length > 0) {
      applyAll(seeds);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Watch for dark mode changes to update isDark state for the UI.
  // The global theme-persistence module handles the actual DOM re-application.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(detectDarkMode());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-tiny-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const setSeed = useCallback(
    (key: string, value: string) => {
      setSeeds((prev) => {
        // Check if value matches default
        const def = ALL_TOKENS.find((t) => t.key === key);
        const isDefault = def && def.defaultValue === value;

        const next = { ...prev };
        if (isDefault) {
          delete next[key];
        } else {
          next[key] = value;
        }
        applyAll(next);
        // Save as current mode seeds (manual edit clears dark seeds since user is customizing)
        const dark = detectDarkMode();
        if (dark) {
          // Editing in dark mode: keep light seeds, update dark seeds
          const lightRaw = localStorage.getItem(STORAGE_KEY);
          const lightSeeds = lightRaw ? JSON.parse(lightRaw) : {};
          saveSeeds(lightSeeds, next);
        } else {
          saveSeeds(next);
        }
        return next;
      });
    },
    [applyAll]
  );

  const applyPreset = useCallback(
    (presetSeeds: Record<string, string>) => {
      setSeeds(presetSeeds);
      applyAll(presetSeeds);
      // Save for current mode only; dark seeds are saved separately via saveDarkSeeds
      const dark = detectDarkMode();
      if (dark) {
        const lightRaw = localStorage.getItem(STORAGE_KEY);
        const lightSeeds = lightRaw ? JSON.parse(lightRaw) : {};
        saveSeeds(lightSeeds, presetSeeds);
      } else {
        // Light mode: save light seeds, preserve existing dark seeds
        const darkRaw = localStorage.getItem('ty-theme-editor-overrides-dark');
        const darkSeeds = darkRaw ? JSON.parse(darkRaw) : undefined;
        saveSeeds(presetSeeds, darkSeeds);
      }
    },
    [applyAll]
  );

  const reset = useCallback(() => {
    clearThemeFromDOM();
    appliedRef.current = {};
    setSeeds({});
    clearStoredSeeds();
  }, []);

  const isOverridden = useCallback(
    (key: string) => key in seeds,
    [seeds]
  );

  const resetToken = useCallback(
    (key: string) => {
      setSeeds((prev) => {
        const next = { ...prev };
        delete next[key];
        applyAll(next);
        const dark = detectDarkMode();
        if (dark) {
          const lightRaw = localStorage.getItem(STORAGE_KEY);
          const lightSeeds = lightRaw ? JSON.parse(lightRaw) : {};
          saveSeeds(lightSeeds, next);
        } else {
          saveSeeds(next);
        }
        return next;
      });
    },
    [applyAll]
  );

  return {
    seeds,
    applied: appliedRef.current,
    isDark,
    setSeed,
    applyPreset,
    reset,
    isOverridden,
    resetToken,
  };
}
