import React from 'react';
import { BaseProps } from '../_utils/props';

export interface KeyboardProps extends BaseProps, React.ComponentPropsWithoutRef<'kbd'> {
  children?: React.ReactNode;
}
