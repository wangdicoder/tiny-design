import React from 'react';
import { BaseProps } from '../_utils/props';

export interface TextLoopProps
  extends BaseProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['div']> {
  /** Time each item stays visible, in ms (default: 3000) */
  interval?: number;
  /** Pause cycling on hover (default: true) */
  pauseOnHover?: boolean;
  /** Loop infinitely or stop after one full cycle (default: true) */
  infinite?: boolean;
  /** Cycling direction (default: 'up') */
  direction?: 'up' | 'down' | 'left' | 'right';
}
