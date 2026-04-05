import React from 'react';
import { SizeType } from '../_utils/props';
import { SpaceSize } from '../space/types';
import { Locale } from '../locale/types';
import { ThemeConfig } from './token-utils';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ConfigContextProps {
  prefixCls?: string;
  componentSize?: SizeType;
  shimmer?: boolean;
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
  shimmer: false,
  space: 'sm',
  getPopupContainer: () => document.body,
  getTargetContainer: () => window,
});

export function useConfig(): ConfigContextProps {
  return React.useContext(ConfigContext);
}
