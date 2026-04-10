import { FocusEventHandler, ReactNode } from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export interface AutoCompleteOption {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
}

export interface AutoCompleteProps extends BaseProps {
  options?: AutoCompleteOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  defaultActiveFirstOption?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  notFoundContent?: ReactNode;
  size?: SizeType;
  filterOption?: boolean | ((inputValue: string, option: AutoCompleteOption) => boolean);
  onChange?: (value: string) => void;
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  onOpenChange?: (open: boolean) => void;
  onSearch?: (value: string) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}
