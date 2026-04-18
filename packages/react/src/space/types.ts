import React from 'react';
import { BaseProps, DirectionType, SizeType } from '../_utils/props';

export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';
export type SpaceSize = SizeType | number;

export interface SpaceProps extends BaseProps, React.ComponentPropsWithoutRef<'div'> {
  align?: SpaceAlign;
  direction?: DirectionType;
  size?: SpaceSize;
}
