import React from 'react';
import { BaseProps } from '../_utils/props';

export interface StrengthIndicatorProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'div'> {
  /** the number of indicator, default is 3 */
  blocks?: number;

  /** current value */
  current?: number;

  /** block colors */
  colors?: string[];

  /** hint labels */
  labels?: boolean | React.ReactNode[];
}
