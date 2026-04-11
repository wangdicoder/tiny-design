import React, { ReactNode } from 'react';
import { BaseProps } from '../_utils/props';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface WaterfallItem<T = any> {
  key: React.Key;
  /** Pin this item to a specific column index */
  column?: number;
  /** Direct content — takes priority over itemRender */
  children?: ReactNode;
  /** Custom data passed to itemRender */
  data?: T;
}

export interface WaterfallProps<T = any>
  extends BaseProps,
    Omit<React.PropsWithRef<JSX.IntrinsicElements['div']>, 'children'> {
  /** Number of columns, or responsive breakpoint config. Default: 3 */
  columns?: number | Partial<Record<Breakpoint, number>>;
  /** Spacing between items: number or [horizontal, vertical] */
  gutter?: number | [number, number];
  /** Array of items to render */
  items?: WaterfallItem<T>[];
  /** Custom render function for each item */
  itemRender?: (item: WaterfallItem<T> & { index: number; column: number }) => ReactNode;
  /** Callback when layout order changes */
  onLayoutChange?: (sortInfo: { key: React.Key; column: number }[]) => void;
}
