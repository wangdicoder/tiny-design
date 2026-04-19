import React from 'react';
import { BaseProps } from '../_utils/props';

export interface LoadingBarProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'div'> {
  didMount?: () => void;
  children?: React.ReactNode;
}
