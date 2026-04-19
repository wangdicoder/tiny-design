import React from 'react';
import { BaseProps } from '../_utils/props';

export interface LinkProps extends BaseProps, React.ComponentPropsWithoutRef<'a'> {
  external?: boolean;
  disabled?: boolean;
  underline?: boolean;
  children?: React.ReactNode;
}
