import React from 'react';
import { StaticConfig } from './static-config';
import { ConfigContextProps } from './config-context';

export interface ConfigProviderProps extends Omit<ConfigContextProps, 'theme' | 'themeConfig'> {
  // Props accept both ThemeMode and ThemeConfig so callers can provide token overrides.
  // Context keeps `theme` normalized as ThemeMode and stores ThemeConfig internally.
  theme?: ConfigContextProps['theme'] | import('./token-utils').ThemeConfig;
  children: React.ReactNode;
}

export interface ConfigProviderComponent extends React.FC<ConfigProviderProps> {
  config: (config: StaticConfig) => void;
  useConfig: typeof import('./config-context').useConfig;
}
