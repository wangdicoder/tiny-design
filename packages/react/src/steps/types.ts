import React, { ReactNode } from 'react';
import { BaseProps, DirectionType } from '../_utils/props';

export type StepsStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepsProps
  extends BaseProps,
    Omit<React.ComponentProps<'div'>, 'onChange'> {
  current?: number;
  defaultCurrent?: number;
  direction?: DirectionType;
  status?: StepsStatus;
  labelPlacement?: DirectionType;
  onChange?: (current: number) => void;
}

export interface StepsItemProps
  extends BaseProps,
    Omit<React.ComponentProps<'div'>, 'title'> {
  stepIndex?: number;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  status?: StepsStatus;
  disabled?: boolean;
}
