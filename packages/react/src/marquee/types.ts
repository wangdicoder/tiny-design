import React from 'react';
import { BaseProps } from '../_utils/props';

export interface MarqueeProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'div'> {
  /** Scroll direction */
  direction?: 'left' | 'right';

  /** Animation duration in seconds */
  duration?: number;

  /** Pause animation on hover */
  pauseOnHover?: boolean;

  /** Gap between items in pixels */
  gap?: number;

  /** Apply edge fade mask */
  fade?: boolean;

  /** Loop the animation infinitely (duplicates children for seamless loop) */
  infinite?: boolean;
}
