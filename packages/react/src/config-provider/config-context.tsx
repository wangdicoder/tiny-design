import React from 'react';
import { SizeType } from '../_utils/props';
import { SpaceSize } from '../space/types';
import { Locale } from '../locale/types';
import { SkeletonAnimation } from '../skeleton/types';
import { themeStore } from '../_utils/theme-store';
import { ThemeConfig } from './token-utils';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface SkeletonConfig {
  animation?: SkeletonAnimation;
}

export interface ConfigContextProps {
  prefixCls?: string;
  componentSize?: SizeType;
  skeleton?: SkeletonConfig;
  space?: SpaceSize;
  theme?: ThemeMode;
  themeConfig?: ThemeConfig;
  locale?: Locale;
  getPopupContainer?: (trigger?: HTMLElement | null) => HTMLElement;
  getTargetContainer?: () => HTMLElement | Window;
}

export const ConfigContext = React.createContext<ConfigContextProps>({
  prefixCls: 'ty',
  componentSize: 'md',
  skeleton: undefined,
  space: 'sm',
  getPopupContainer: () => document.body,
  getTargetContainer: () => window,
});

export function useConfig(): ConfigContextProps {
  return React.useContext(ConfigContext);
}

/**
 * Returns the theme that is actually taking effect in this part of the tree.
 *
 * Resolution order:
 *   1. The nearest ConfigProvider's `theme` prop (scoped override)
 *   2. The document-level theme store driven by `useTheme().setMode(...)`
 *
 * `themeConfig` is the full ThemeConfig object when the nearest provider was
 * configured with one; otherwise undefined.
 */
export function useActiveTheme(): {
  mode: ThemeMode | undefined;
  themeConfig: ThemeConfig | undefined;
} {
  const ctx = React.useContext(ConfigContext);
  const storeSnapshot = React.useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  return {
    mode: ctx.theme ?? storeSnapshot,
    themeConfig: ctx.themeConfig,
  };
}
