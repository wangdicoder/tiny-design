import React, { CSSProperties } from 'react';
import { BaseProps } from '../_utils/props';

export type TimelinePosition = 'left' | 'center';

export interface TimelineProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'ul'> {
  position?: TimelinePosition;
  children: React.ReactNode;
}

export interface TimelineItemProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'li'> {
  dot?: React.ReactNode;
  dotStyle?: CSSProperties;
  children?: React.ReactNode;
}
