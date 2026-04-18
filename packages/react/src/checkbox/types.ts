import React from 'react';
import { BaseProps } from '../_utils/props';

export interface CheckboxGroupProps
  extends BaseProps,
    Omit<React.ComponentProps<'div'>, 'onChange'> {
  defaultValue?: string[];
  value?: string[];
  onChange?: (checkedValues: string[]) => void;
  disabled?: boolean;
}


export interface CheckboxProps
  extends BaseProps,
    Omit<React.ComponentProps<'label'>, 'onChange'> {
  /** Only required when use checkbox group */
  value?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkboxRef?: React.RefObject<HTMLInputElement>;
}
