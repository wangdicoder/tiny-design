import React, { ReactNode } from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export interface InputProps
  extends BaseProps,
    Omit<React.PropsWithRef<JSX.IntrinsicElements['input']>, 'size' | 'prefix'> {
  clearable?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>; // prevent covering keydown event by enter press
  size?: SizeType;
  disabled?: boolean;
  onClearClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export interface InputGroupProps
  extends BaseProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['div']> {
  size?: SizeType;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface InputGroupAddonProps
  extends BaseProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['div']> {
  noBorder?: boolean;
  disabled?: boolean;
  size?: SizeType;
  children: React.ReactNode;
}
