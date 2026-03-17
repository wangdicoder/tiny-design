import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export interface InputOTPProps extends BaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onInput'> {
  /** Number of OTP input cells */
  length?: number;
  /** Size of the input */
  size?: SizeType;
  /** Default value of the OTP input */
  defaultValue?: string;
  /** Controlled value of the OTP input */
  value?: string;
  /** Callback when all cells are filled */
  onChange?: (value: string) => void;
  /** Custom formatter to restrict/modify input */
  formatter?: (value: string) => string;
  /** Separator element between cells */
  separator?: ((index: number) => React.ReactNode) | React.ReactNode;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether to mask the values, or a custom mask character */
  mask?: boolean | string;
  /** Auto focus the first cell on mount */
  autoFocus?: boolean;
  /** Autocomplete attribute */
  autoComplete?: string;
}

export interface OTPInputCellProps {
  index: number;
  value: string;
  disabled?: boolean;
  mask?: boolean | string;
  size?: SizeType;
  autoFocus?: boolean;
  autoComplete?: string;
  prefixCls: string;
  onChange: (index: number, value: string) => void;
  onActiveChange: (index: number) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
