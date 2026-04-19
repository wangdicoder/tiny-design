import React, { ReactNode } from 'react';
import { BaseProps, DirectionType } from '../_utils/props';
import { Placement } from '../popup/types';

export type SliderValue = number | [number, number];
export type SliderMarks = {
  [key: string]:
    | React.ReactNode
    | {
    style: React.CSSProperties;
    label: ReactNode;
  };
};

export interface SliderProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  value?: SliderValue;
  defaultValue?: SliderValue;
  min?: number;
  max?: number;
  marks?: SliderMarks;
  dots?: boolean;
  direction?: DirectionType;
  step?: number;
  disabled?: boolean;
  track?: boolean;
  tooltipVisible?: boolean;
  tooltipPlacement?: Placement;
  tipFormatter?: (value: number) => ReactNode;
  onChange?: (value: SliderValue) => void;
  onAfterChange?: (value: SliderValue) => void;
  children?: ReactNode;
}
