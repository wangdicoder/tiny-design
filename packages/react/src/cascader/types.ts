import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export interface CascaderOption {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  children?: CascaderOption[];
  isLeaf?: boolean;
}

export type CascaderValue = (string | number)[];

export interface CascaderProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  options: CascaderOption[];
  value?: CascaderValue;
  defaultValue?: CascaderValue;
  onChange?: (value: CascaderValue, selectedOptions: CascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  size?: SizeType;
  expandTrigger?: 'click' | 'hover';
  displayRender?: (labels: React.ReactNode[], selectedOptions: CascaderOption[]) => React.ReactNode;
  changeOnSelect?: boolean;
  open?: boolean;
  onDropdownVisibleChange?: (open: boolean) => void;
  notFoundContent?: React.ReactNode;
}
