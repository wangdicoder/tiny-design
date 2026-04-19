import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';
import { PaginationProps } from '../pagination/types';

export interface ListProps<T = any>
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  dataSource?: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  bordered?: boolean;
  split?: boolean;
  size?: SizeType;
  grid?: ListGridType;
  locale?: { emptyText?: React.ReactNode };
  virtual?: boolean;
  height?: number;
  itemHeight?: number;
  pagination?: false | ListPaginationProps;
  children?: React.ReactNode;
}

export interface ListGridType {
  gutter?: number;
  column?: number;
}

export interface ListPaginationProps extends Pick<PaginationProps, 'size' | 'align' | 'disabled'> {
  current?: number;
  pageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
}

export interface ListItemProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'li'> {
  extra?: React.ReactNode;
  actions?: React.ReactNode[];
  children?: React.ReactNode;
}

export interface ListItemMetaProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}
