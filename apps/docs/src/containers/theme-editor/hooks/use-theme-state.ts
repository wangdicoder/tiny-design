import { useState, useCallback, useEffect, useRef } from 'react';
import { ALL_TOKENS } from '../constants/default-tokens';
import { deriveAllTokens } from '../utils/color-utils';
import { applyTokens, clearAllTokenOverrides } from '../utils/apply-theme';

const STORAGE_KEY = 'ty-theme-editor-overrides';
const PRIMARY_COLOR_KEY = 'ty-primary-color';

function loadFromStorage(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(seeds: Record<string, string>): void {
  if (Object.keys(seeds).length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
  }
}

export interface ThemeState {
  /** Raw seed overrides (only user-changed tokens) */
  seeds: Record<string, string>;
  /** All derived + seed tokens currently applied */
  applied: Record<string, string>;
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
  const appliedRef = useRef<Record<string, string>>({});

  const applyAll = useCallback((newSeeds: Record<string, string>) => {
    // Clear previous overrides
    if (Object.keys(appliedRef.current).length > 0) {
      clearAllTokenOverrides(appliedRef.current);
    }

    // Derive all tokens from seeds
    const derived = deriveAllTokens(newSeeds);
    appliedRef.current = derived;

    // Apply to DOM
    if (Object.keys(derived).length > 0) {
      applyTokens(derived);
    }

    // Sync primary color with header ColorCustomizer
    if (newSeeds['color-primary']) {
      localStorage.setItem(PRIMARY_COLOR_KEY, newSeeds['color-primary']);
    } else {
      localStorage.removeItem(PRIMARY_COLOR_KEY);
    }

    // Persist
    saveToStorage(newSeeds);
  }, []);

  // Apply on mount
  useEffect(() => {
    if (Object.keys(seeds).length > 0) {
      applyAll(seeds);
    }
    // Cleanup on unmount: don't clear — let theme persist across pages
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        return next;
      });
    },
    [applyAll]
  );

  const applyPreset = useCallback(
    (presetSeeds: Record<string, string>) => {
      setSeeds(presetSeeds);
      applyAll(presetSeeds);
    },
    [applyAll]
  );

  const reset = useCallback(() => {
    clearAllTokenOverrides(appliedRef.current);
    appliedRef.current = {};
    setSeeds({});
    saveToStorage({});
    localStorage.removeItem(PRIMARY_COLOR_KEY);
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
        return next;
      });
    },
    [applyAll]
  );

  return {
    seeds,
    applied: appliedRef.current,
    setSeed,
    applyPreset,
    reset,
    isOverridden,
    resetToken,
  };
}
