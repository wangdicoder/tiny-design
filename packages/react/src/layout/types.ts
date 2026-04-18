import React from 'react';
import { BaseProps } from '../_utils/props';

export interface LayoutProps extends BaseProps, React.ComponentProps<'div'> {}

export type SidebarTheme = 'light' | 'dark';

export interface SidebarProps extends BaseProps, React.ComponentProps<'div'> {
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  trigger?: React.ReactNode;
  width?: number | string;
  collapsedWidth?: number | string;
  theme?: SidebarTheme;
  children?: React.ReactNode;
}
