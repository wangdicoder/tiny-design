import React, { RefObject } from 'react';
import { BaseProps } from '../_utils/props';

export interface RadioProps
  extends BaseProps,
    Omit<React.ComponentProps<'label'>, 'onChange'> {
  radioRef?: RefObject<HTMLInputElement>;
  value?: string | number;
  name?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends BaseProps,
    Omit<React.ComponentProps<'div'>, 'onChange'> {
  name?: string;
  defaultValue?: number | string;
  value?: number | string;
  onChange?: (value: number | string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}
