import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export type StatisticValue = number | string | null | undefined;
export type StatisticFormatType = 'number' | 'decimal' | 'percent' | 'currency' | 'compact' | 'duration' | 'custom';
export type StatisticAlign = 'start' | 'center' | 'end';
export type StatisticEmphasis = 'normal' | 'strong';
export type StatisticStatusType = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type StatisticTrendDirection = 'up' | 'down' | 'flat';
export type StatisticTrendSentiment = 'positive' | 'negative' | 'neutral';
export type StatisticDurationUnit = 'ms' | 's';

export interface StatisticRenderInfo {
  rawValue: StatisticValue;
  formattedValue: string;
  locale: string;
  isEmpty: boolean;
  isNumeric: boolean;
  parts?: Intl.NumberFormatPart[];
}

export interface StatisticFormatOptions {
  type?: StatisticFormatType;
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
  notation?: 'standard' | 'compact';
  compactDisplay?: 'short' | 'long';
  unit?: Intl.NumberFormatOptions['unit'];
  unitDisplay?: 'short' | 'long' | 'narrow';
  signDisplay?: 'auto' | 'always' | 'never' | 'exceptZero';
  durationUnit?: StatisticDurationUnit;
}

export interface StatisticTrend {
  direction?: StatisticTrendDirection;
  value?: React.ReactNode;
  label?: React.ReactNode;
  sentiment?: StatisticTrendSentiment;
  icon?: React.ReactNode;
}

export interface StatisticStatus {
  type?: StatisticStatusType;
  text?: React.ReactNode;
}

export interface StatisticProps
  extends BaseProps,
    Omit<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, 'title' | 'prefix'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: React.ReactNode;
  value?: StatisticValue;
  format?: StatisticFormatOptions;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  formatter?: (value: StatisticValue, info: StatisticRenderInfo) => React.ReactNode;
  trend?: StatisticTrend;
  status?: StatisticStatus;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  skeleton?: React.ReactNode;
  empty?: React.ReactNode;
  error?: React.ReactNode;
  size?: SizeType;
  emphasis?: StatisticEmphasis;
  align?: StatisticAlign;
  monospace?: boolean;
  valueClassName?: string;
  titleClassName?: string;
  trendClassName?: string;
  valueStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  trendStyle?: React.CSSProperties;
  'aria-label'?: string;
}
