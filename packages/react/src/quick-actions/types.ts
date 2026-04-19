import React from 'react';
import { BaseProps } from '../_utils/props';

export type QuickActionsDirection = 'up' | 'down' | 'left' | 'right';
export type QuickActionsTrigger = 'hover' | 'click';

export interface QuickActionsProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  icon?: React.ReactNode;
  openIcon?: React.ReactNode;
  direction?: QuickActionsDirection;
  open?: boolean;
  trigger?: QuickActionsTrigger;
  onOpen?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface QuickActionsActionProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  icon: React.ReactNode;
  tooltip?: string;
  tooltipPlacement?: 'left' | 'right' | 'top' | 'bottom';
  disabled?: boolean;
}
