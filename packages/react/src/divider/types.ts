import React from 'react';
import { BaseProps, DirectionType } from '../_utils/props';

export type DividerOrientation = DirectionType;
export type DividerTitlePlacement = 'start' | 'center' | 'end';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'div'> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  titlePlacement?: DividerTitlePlacement;
  plain?: boolean;
  titleGap?: string | number;
  children?: React.ReactNode;
}
