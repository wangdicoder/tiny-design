import React, { ReactNode } from 'react';
import { BaseProps, DirectionType } from '../_utils/props';

export type MenuMode = DirectionType | 'inline';
export type Theme = 'light' | 'dark';
export type MenuVariant = 'outline' | 'fill' | 'ghost';
export type MenuSelectionStyle = 'border' | 'background' | 'indicator' | 'mixed';
export type MenuSize = 'sm' | 'md' | 'lg';
export type MenuAppearance = 'navigation' | 'dropdown' | 'overlay';

export interface MenuSelectInfo {
  key: string;
  selectedKeys: string[];
}

export interface MenuProps
  extends BaseProps,
    Omit<React.PropsWithoutRef<JSX.IntrinsicElements['ul']>, 'onSelect'> {
  defaultIndex?: string;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  multiple?: boolean;

  /** color theme of the menu */
  theme?: Theme;

  /** type of menu: vertical, horizontal or inline */
  mode?: MenuMode;

  /** built-in visual variant */
  variant?: MenuVariant;

  /** visual scene */
  appearance?: MenuAppearance;

  /** selected state presentation */
  selectionStyle?: MenuSelectionStyle;

  /** item size */
  size?: MenuSize;

  /** indent (in pixels) of inline menu items on each level */
  inlineIndent?: number;

  /** called when a menu item is selected */
  onSelect?: (selectedIndex: string, info: MenuSelectInfo) => void;

  /** called when submenu open keys change */
  onOpenChange?: (openKeys: string[]) => void;

  overlayClassName?: string;
}

export interface MenuItemProps
  extends BaseProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['li']> {
  index?: string;
  disabled?: boolean;
  danger?: boolean;
  icon?: ReactNode;
  extra?: ReactNode;
  onClick?: React.MouseEventHandler;
}

export interface MenuItemGroupProps
  extends BaseProps,
    Omit<React.PropsWithoutRef<JSX.IntrinsicElements['li']>, 'title'> {
  index?: string;
  title?: ReactNode;
}

export interface SubMenuProps
  extends BaseProps,
    Omit<React.PropsWithoutRef<JSX.IntrinsicElements['li']>, 'title'> {
  title: ReactNode;
  index?: string;
  disabled?: boolean;
  danger?: boolean;
  icon?: ReactNode;
  extra?: ReactNode;
  overlayClassName?: string;
}
