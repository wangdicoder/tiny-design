import React from 'react';
import { BaseProps } from '../_utils/props';

export interface SkeletonProps extends BaseProps, React.ComponentPropsWithoutRef<'div'> {
  active?: boolean;
  rounded?: boolean;
  children?: React.ReactNode;
}
