import React from 'react';
import { BaseProps } from '../_utils/props';

export interface BadgeProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'span'> {
  /** the number to show in badge */
  count?: React.ReactNode;

  /** background color */
  color?: string;

  /** max count to show */
  max?: number;

  /** display a dot only */
  dot?: boolean;

  /** display wave effect */
  processing?: boolean;

  /** when value is equal to zero, the badge will be hidden by default */
  showZero?: boolean;

  /** text to show when hovering over the badge */
  title?: string;

  /** internal badge style */
  badgeStyle?: React.CSSProperties;
}
