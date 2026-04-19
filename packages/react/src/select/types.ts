import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export interface SelectOptGroupProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'li'> {
  label?: string;
  children?: React.ReactNode;
}

export interface SelectOptionsProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'li'> {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface SelectOptionItem {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
}

export type SelectValue = string | string[];

export interface SelectProps
  extends BaseProps,
    Omit<
      React.ComponentPropsWithoutRef<'div'>,
      'onSelect' | 'onChange' | 'defaultValue'
    > {
  value?: SelectValue;
  defaultValue?: SelectValue;
  mode?: 'multiple' | 'tags';
  showSearch?: boolean;
  filterOption?: boolean | ((inputValue: string, option: SelectOptionItem) => boolean);
  onSearch?: (value: string) => void;
  allowClear?: boolean;
  loading?: boolean;
  size?: SizeType;
  maxTagCount?: number;
  notFoundContent?: React.ReactNode;
  options?: SelectOptionItem[];
  onChange?: (value: SelectValue, option?: SelectOptionItem | SelectOptionItem[]) => void;
  onSelect?: (value: SelectValue) => void;
  optionRender?: (option: SelectOptionItem, info: { index: number }) => React.ReactNode;
  labelRender?: (props: { label: React.ReactNode; value: string }) => React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onDropdownVisibleChange?: (open: boolean) => void;
  scrollToSelected?: boolean;
  dropdownStyle?: React.CSSProperties;
  children?: React.ReactNode;
}
