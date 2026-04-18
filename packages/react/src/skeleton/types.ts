import React from 'react';
import { BaseProps } from '../_utils/props';

export interface SkeletonProps extends BaseProps, React.ComponentProps<'div'> {
  active?: boolean;
  rounded?: boolean;
  children?: React.ReactNode;
}
