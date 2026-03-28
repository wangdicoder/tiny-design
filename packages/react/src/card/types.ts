import React, { CSSProperties, ReactNode } from 'react';
import { BaseProps } from '../_utils/props';

export type CardVariant = 'outlined' | 'elevated' | 'filled';

export interface CardContentProps extends React.PropsWithoutRef<JSX.IntrinsicElements['div']> {
  prefixCls?: string;
  children: ReactNode;
}

export interface CardProps
  extends BaseProps,
    Omit<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, 'title'> {
  title?: ReactNode;
  extra?: ReactNode;
  /** Card surface style */
  variant?: CardVariant;
  hoverable?: boolean;
  active?: boolean;
  /** @deprecated Use `variant="outlined"` instead */
  bordered?: boolean;
  actions?: ReactNode[];
  header?: ReactNode;
  footer?: ReactNode;
  headerStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  footerStyle?: CSSProperties;
  children?: ReactNode | React.ReactElement<CardContentProps>;
}
