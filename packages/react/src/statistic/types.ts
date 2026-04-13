import React from 'react';
import { BaseProps } from '../_utils/props';

export interface StatisticFormatterInfo {
  formattedValue: string;
  groupSeparator: string;
  decimalSeparator: string;
  precision?: number;
  isNumeric: boolean;
}

export interface StatisticProps
  extends BaseProps,
    Omit<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, 'title' | 'prefix'> {
  title?: React.ReactNode;
  value?: number | string;
  precision?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  groupSeparator?: string;
  decimalSeparator?: string;
  valueStyle?: React.CSSProperties;
  valueClassName?: string;
  empty?: React.ReactNode;
  formatter?: (value: number | string, info: StatisticFormatterInfo) => React.ReactNode;
}
