import React from 'react';
import { BaseProps } from '../_utils/props';

export type PaginationAlign = 'left' | 'center' | 'right';
export type PaginationSize = 'sm' | 'md';

export interface PaginationProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'ul'>, 'onChange'> {
  current?: number;
  total?: number;
  defaultCurrent?: number;
  disabled?: boolean;
  pageSize?: number;
  defaultPageSize?: number;
  size?: PaginationSize;
  align?: PaginationAlign;
  onChange?: (current: number, total: number, pageSize: number) => void;
}
