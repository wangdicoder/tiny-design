import React from 'react';
import { BaseProps, DirectionType, SizeType } from '../_utils/props';
import { ResponsiveValue } from '../grid/responsive';

export type DescriptionsSpan = number | 'fill';
export type DescriptionsSemantic = 'auto' | 'table' | 'list';
export type DescriptionsAlign = 'start' | 'center' | 'end';

export interface DescriptionsItemType extends BaseProps {
  key?: React.Key;
  label: React.ReactNode;
  content?: React.ReactNode;
  span?: DescriptionsSpan;
  hidden?: boolean;
  extra?: React.ReactNode;
}

export interface DescriptionsProps
  extends BaseProps,
    Omit<React.ComponentProps<'div'>, 'title'> {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  columns?: ResponsiveValue<number>;
  size?: SizeType;
  layout?: DirectionType;
  colon?: boolean;
  separator?: React.ReactNode;
  items?: DescriptionsItemType[];
  empty?: React.ReactNode;
  semantic?: DescriptionsSemantic;
  labelAlign?: DescriptionsAlign;
  contentAlign?: DescriptionsAlign;
  labelRender?: (item: DescriptionsItemType, index: number) => React.ReactNode;
  contentRender?: (item: DescriptionsItemType, index: number) => React.ReactNode;
}

export interface DescriptionsItemProps extends BaseProps {
  label: React.ReactNode;
  span?: DescriptionsSpan;
  hidden?: boolean;
  extra?: React.ReactNode;
  children?: React.ReactNode;
}
