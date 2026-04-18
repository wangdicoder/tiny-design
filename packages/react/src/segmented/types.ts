import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export interface SegmentedOption {
  value: SegmentedValue;
  label?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  title?: string;
  className?: string;
}

export type SegmentedValue = string | number;

export interface SegmentedProps
  extends BaseProps,
    Omit<
      React.ComponentPropsWithoutRef<'div'>,
      'children' | 'defaultValue' | 'onChange'
    > {
  options: SegmentedOption[];
  name?: string;
  value?: SegmentedValue;
  defaultValue?: SegmentedValue;
  onChange?: (
    value: SegmentedValue,
    option: SegmentedOption,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  block?: boolean;
  disabled?: boolean;
  size?: SizeType;
}
