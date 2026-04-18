import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

export type ButtonColor = 'default' | 'primary' | 'info' | 'danger' | 'warning' | 'success';

export type ButtonShape = 'default' | 'round' | 'circle';

export type ButtonIconPosition = 'start' | 'end';

export type ButtonGroupInheritMode = 'fill' | 'override' | 'none';

export interface ButtonProps
  extends BaseProps, React.ComponentProps<'button'> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  size?: SizeType;
  round?: boolean;
  shape?: ButtonShape;
  icon?: React.ReactNode;
  iconPosition?: ButtonIconPosition;
  loadingIcon?: React.ReactNode;
}

export interface ButtonGroupProps
  extends BaseProps, React.ComponentProps<'div'> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: SizeType;
  round?: boolean;
  shape?: ButtonShape;
  disabled?: boolean;
  inheritMode?: ButtonGroupInheritMode;
  children: React.ReactNode;
}
