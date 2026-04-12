import React from 'react';
import {
  MenuDensity,
  MenuMode,
  MenuAppearance,
  MenuSelectInfo,
  MenuSelectionStyle,
  MenuSize,
  MenuVariant,
  Theme,
} from './types';

type Props = {
  selectedKeys: string[];
  openKeys: string[];
  mode: MenuMode;
  theme: Theme;
  appearance: MenuAppearance;
  variant: MenuVariant;
  selectionStyle: MenuSelectionStyle;
  size: MenuSize;
  density: MenuDensity;
  multiple: boolean;
  inlineIndent: number;
  isSelected: (key?: string) => boolean;
  isSubMenuSelected: (key?: string) => boolean;
  isOpen: (key?: string) => boolean;
  handleSelect?: (selectedIndex: string) => void;
  onSelectChange?: (selectedIndex: string, info: MenuSelectInfo) => void;
  setOpen?: (key: string, open: boolean) => void;
  registerKey?: (key: string, ancestorKeys: string[]) => void;
  unregisterKey?: (key: string) => void;
};

export const MenuContext = React.createContext<Props>({
  selectedKeys: ['0'],
  openKeys: [],
  inlineIndent: 20,
  mode: 'horizontal',
  theme: 'light',
  appearance: 'navigation',
  variant: 'outline',
  selectionStyle: 'mixed',
  size: 'md',
  density: 'comfortable',
  multiple: false,
  isSelected: () => false,
  isSubMenuSelected: () => false,
  isOpen: () => false,
});
