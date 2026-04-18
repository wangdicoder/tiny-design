import React from 'react';
import { ReactNode } from 'react';
import { BaseProps } from '../_utils/props';

export interface RateProps extends BaseProps,
  Omit<React.ComponentProps<'ul'>, 'onChange'> {
  color?: string;
  clearable?: boolean;
  half?: boolean;
  character?: ReactNode;
  count?: number;
  defaultValue?: number;
  value?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  children?: ReactNode;
}
