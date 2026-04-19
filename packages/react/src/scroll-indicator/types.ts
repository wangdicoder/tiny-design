import React from 'react';
import { BaseProps } from '../_utils/props';
import { Target } from '../_utils/dom';

export interface ScrollIndicatorProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'div'> {
  fixed?: boolean;
  target?: () => Target;
}
