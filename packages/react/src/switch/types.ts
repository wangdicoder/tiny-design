import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export interface SwitchProps
  extends BaseProps,
    Omit<React.ComponentProps<'label'>, 'onChange' | 'onClick'> {
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: SizeType;
  onChange?: (checked: boolean, event: React.MouseEvent) => void;
  onClick?: (checked: boolean, event: React.MouseEvent) => void;
  checkedText?: React.ReactNode;
  uncheckedText?: React.ReactNode;
}
