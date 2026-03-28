import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';
import { PaginationProps } from '../pagination/types';

export type SortOrder = 'ascend' | 'descend' | null;
export type ColumnAlign = 'left' | 'center' | 'right';

export interface ColumnType<T = any> {
  title: React.ReactNode;
  dataIndex?: string;
  key?: string;
  width?: number | string;
  align?: ColumnAlign;
  fixed?: 'left' | 'right';
  sorter?: boolean | ((a: T, b: T) => number);
  defaultSortOrder?: SortOrder;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  ellipsis?: boolean;
  className?: string;
}

export type RowSelection<T = any> = {
  selectedRowKeys?: React.Key[];
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  type?: 'checkbox' | 'radio';
};

export interface TablePaginationConfig extends Pick<PaginationProps, 'size' | 'align' | 'disabled'> {
  current?: number;
  pageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
}

export interface TableProps<T = any>
  extends BaseProps,
    Omit<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, 'onChange'> {
  columns: ColumnType<T>[];
  dataSource?: T[];
  rowKey?: string | ((record: T) => React.Key);
  loading?: boolean;
  bordered?: boolean;
  size?: SizeType;
  virtual?: boolean;
  height?: number;
  itemHeight?: number;
  scroll?: { x?: number | string; y?: number | string };
  rowSelection?: RowSelection<T>;
  pagination?: false | TablePaginationConfig;
  onChange?: (pagination: TablePaginationConfig, sorter: { field?: string; order?: SortOrder }) => void;
  emptyText?: React.ReactNode;
  showHeader?: boolean;
  rowClassName?: string | ((record: T, index: number) => string);
  onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>;
}
