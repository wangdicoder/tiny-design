import React, { ReactElement } from 'react';
import { BaseProps } from '../_utils/props';

export interface BreadcrumbProps
  extends BaseProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['nav']> {
  separator?: React.ReactNode;
  children: ReactElement<BreadcrumbItemProps> | ReactElement<BreadcrumbItemProps>[];
}

export interface BreadcrumbItemProps
  extends BaseProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['li']> {
  separator?: React.ReactNode;
  children?: React.ReactNode;
}
