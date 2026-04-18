import React from 'react';
import { BaseProps } from '../_utils/props';

export type strokeLineCaps = 'round' | 'square';

export const strokePresetColors = ['primary', 'blue', 'green', 'yellow', 'red'];

export type BarBackgroundType = 'impulse' | 'striped';

export interface BarProps extends BaseProps, React.ComponentPropsWithoutRef<'div'> {
  percent?: number;
  /** Customise label style for both outer and inner label */
  format?: (percent: number) => React.ReactNode;
  /** Determine display the label */
  showInfo?: boolean;
  strokeLinecap?: strokeLineCaps;
  strokeColor?: string | string[];
  strokeWidth?: number;
  /** Determine display the label in the bar or right of bar */
  innerText?: boolean;
  backgroundType?: BarBackgroundType;
  children?: React.ReactNode;
}

export interface CircleProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'div'> {
  percent?: number;
  /** Customise label style for both outer and inner label */
  format?: (percent: number) => React.ReactNode;
  width?: number;
  strokeWidth?: number;
  strokeLinecap?: strokeLineCaps;
  strokeColor?: string;
  reverse?: boolean;
  prefixCls?: string;
  textStyle?: React.CSSProperties;
  children?: React.ReactNode;
}
