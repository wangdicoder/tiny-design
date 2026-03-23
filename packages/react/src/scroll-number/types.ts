import React from 'react';
import { BaseProps } from '../_utils/props';

export interface ScrollNumberProps
  extends BaseProps,
    Omit<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, 'title' | 'prefix'> {
  /** The numeric value to display */
  value?: number | string;
  /** Title displayed above the value */
  title?: React.ReactNode;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Number of decimal places to display */
  precision?: number;
  /** Thousands separator character */
  groupSeparator?: string;
  /** Prefix node rendered before the number */
  prefix?: React.ReactNode;
  /** Suffix node rendered after the number */
  suffix?: React.ReactNode;
  /** Custom style applied to the value container */
  valueStyle?: React.CSSProperties;
}
