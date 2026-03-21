import React from 'react';
import { BaseProps } from '../_utils/props';

export interface CheckableTagProps extends BaseProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean, e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export type StatusColor = 'success' | 'warning' | 'info' | 'danger';

export const StatusColors: StatusColor[] = ['success', 'info', 'warning', 'danger'];

export const PresetColors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
  ...StatusColors,
];

export interface TagProps extends BaseProps, React.PropsWithoutRef<JSX.IntrinsicElements['div']> {
  color?: string | StatusColor;
  closable?: boolean;
  onClose?: React.MouseEventHandler;
  onClick?: React.MouseEventHandler;
  defaultVisible?: boolean;
  visible?: boolean;
  children?: React.ReactNode;
}
