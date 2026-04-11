import React from 'react';

export type ChartThemeName = 'light' | 'dark';

export interface ChartIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface ChartConfigItem {
  label?: React.ReactNode;
  icon?: React.ComponentType<ChartIconProps>;
  color?: string;
  theme?: Partial<Record<ChartThemeName, string>>;
}

export type ChartConfig = Record<string, ChartConfigItem>;
