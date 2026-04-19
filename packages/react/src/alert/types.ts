import React, { ReactNode } from 'react';
import { BaseProps } from '../_utils/props';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface AlertProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /** alert title */
  title?: string | ReactNode;

  /** alert type */
  type?: AlertType;

  /** display icon or customise an icon */
  icon?: boolean | ReactNode;

  /** icon size */
  iconSize?: number;

  /** whether the Alert can be closed */
  closable?: boolean;

  /** close text to show */
  closeText?: ReactNode;

  /** trigger when animation ending of Alert */
  afterClose?: () => void;

  /** close button callback */
  onClose?: React.MouseEventHandler<HTMLSpanElement>;
}
