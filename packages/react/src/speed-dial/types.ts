import React from 'react';
import { BaseProps } from '../_utils/props';

export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right';
export type SpeedDialTrigger = 'hover' | 'click';

export interface SpeedDialProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  icon?: React.ReactNode;
  openIcon?: React.ReactNode;
  direction?: SpeedDialDirection;
  open?: boolean;
  trigger?: SpeedDialTrigger;
  onOpen?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface SpeedDialActionProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  icon: React.ReactNode;
  tooltip?: string;
  tooltipPlacement?: 'left' | 'right' | 'top' | 'bottom';
  disabled?: boolean;
}
