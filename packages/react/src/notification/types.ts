import React, { ReactNode } from 'react';
import { BaseProps } from '../_utils/props';

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | undefined;

export interface NotificationProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  type: NotificationType;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  onClose?: (e: React.MouseEvent) => void;
  icon?: ReactNode | boolean;
  willUnmount: (height: number) => void;
  didMount: () => void;
  duration?: number;
  children?: React.ReactNode;
}
