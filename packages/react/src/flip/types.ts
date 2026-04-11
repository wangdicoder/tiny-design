import React from 'react';
import { BaseProps, DirectionType } from '../_utils/props';

export interface FlipProps extends BaseProps, React.PropsWithoutRef<JSX.IntrinsicElements['div']> {
  /** a certain parent width and height to prevent the hover empty issue */
  width: string | number;
  height: string | number;

  /** flip direction */
  direction?: DirectionType;

  /** flip from left to right or reverse */
  reverse?: boolean;
  children: React.ReactElement<FlipItemProps> | React.ReactElement<FlipItemProps>[];
}

export interface FlipItemProps
  extends Omit<BaseProps, 'prefixCls'>,
    React.PropsWithoutRef<JSX.IntrinsicElements['div']> {
  children?: React.ReactNode;
}
