import React, { ReactNode } from 'react';
import { BaseProps } from '../_utils/props';

export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | 'loading';

export interface ResultProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  status?: ResultStatus;
  icon?: ReactNode;
  extra?: ReactNode;
  children?: ReactNode;
}
