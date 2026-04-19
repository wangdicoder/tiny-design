import React from 'react';
import { BaseProps } from '../_utils/props';

export type QuickActionsDirection = 'up' | 'down' | 'left' | 'right';
export type QuickActionsTrigger = 'click' | 'hover';
export type QuickActionsOpenSource =
  | 'trigger-click'
  | 'trigger-hover'
  | 'focus'
  | 'outside'
  | 'escape'
  | 'action-click';

export interface QuickActionsOpenChangeContext {
  source: QuickActionsOpenSource;
}

export interface QuickActionsProps
  extends BaseProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  icon?: React.ReactNode;
  openIcon?: React.ReactNode;
  label?: string;
  direction?: QuickActionsDirection;
  trigger?: QuickActionsTrigger;
  open?: boolean;
  defaultOpen?: boolean;
  closeOnActionClick?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onOpenChange?: (open: boolean, context: QuickActionsOpenChangeContext) => void;
}

export interface QuickActionsActionProps
  extends BaseProps, Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  description?: React.ReactNode;
  danger?: boolean;
  loading?: boolean;
  keepOpen?: boolean;
}
