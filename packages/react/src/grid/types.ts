import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';
import { Breakpoint, ResponsiveValue } from './responsive';

export type RowAlign = 'top' | 'center' | 'bottom' | 'baseline';
export type RowJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

export interface RowProps extends BaseProps, React.ComponentPropsWithoutRef<'div'> {
  gutter?: number | [number, number];
  gutterSide?: boolean;
  align?: RowAlign;
  justify?: RowJustify;
}

export interface ColSize {
  span?: number;
  offset?: number;
  order?: number;
}

export type GridBreakpoint = Breakpoint;
export type GridTrackValue = number | React.CSSProperties['gridTemplateColumns'];
export type GridItemSize = number | 'auto' | 'grow' | 'full';
export type GridItemOffset = number | 'auto';

export interface GridProps extends BaseProps, React.ComponentPropsWithoutRef<'div'> {
  columns?: ResponsiveValue<GridTrackValue>;
  rows?: ResponsiveValue<React.CSSProperties['gridTemplateRows']>;
  spacing?: ResponsiveValue<SizeType | React.CSSProperties['gap']>;
  gap?: ResponsiveValue<SizeType | React.CSSProperties['gap']>;
  columnSpacing?: ResponsiveValue<SizeType | React.CSSProperties['columnGap']>;
  columnGap?: ResponsiveValue<SizeType | React.CSSProperties['columnGap']>;
  rowSpacing?: ResponsiveValue<SizeType | React.CSSProperties['rowGap']>;
  rowGap?: ResponsiveValue<SizeType | React.CSSProperties['rowGap']>;
  minColumnWidth?: ResponsiveValue<number | string>;
  autoFlow?: ResponsiveValue<React.CSSProperties['gridAutoFlow']>;
  autoFit?: boolean;
  justify?: ResponsiveValue<React.CSSProperties['justifyItems']>;
  align?: ResponsiveValue<React.CSSProperties['alignItems']>;
  justifyContent?: ResponsiveValue<React.CSSProperties['justifyContent']>;
  alignContent?: ResponsiveValue<React.CSSProperties['alignContent']>;
  placeItems?: ResponsiveValue<React.CSSProperties['placeItems']>;
  placeContent?: ResponsiveValue<React.CSSProperties['placeContent']>;
  areas?: ResponsiveValue<string | string[]>;
  component?: React.ElementType;
}

export interface GridItemProps extends BaseProps, React.ComponentPropsWithoutRef<'div'> {
  size?: ResponsiveValue<GridItemSize>;
  offset?: ResponsiveValue<GridItemOffset>;
  column?: ResponsiveValue<React.CSSProperties['gridColumn']>;
  row?: ResponsiveValue<React.CSSProperties['gridRow']>;
  colSpan?: ResponsiveValue<number | 'full'>;
  rowSpan?: ResponsiveValue<number | 'full'>;
  area?: ResponsiveValue<React.CSSProperties['gridArea']>;
  justifySelf?: ResponsiveValue<React.CSSProperties['justifySelf']>;
  alignSelf?: ResponsiveValue<React.CSSProperties['alignSelf']>;
  component?: React.ElementType;
}

export interface ColProps extends BaseProps, React.ComponentPropsWithoutRef<'div'> {
  span?: number;
  offset?: number;
  order?: number;
  xs?: number | ColSize;
  sm?: number | ColSize;
  md?: number | ColSize;
  lg?: number | ColSize;
  xl?: number | ColSize;
  xxl?: number | ColSize;
}
