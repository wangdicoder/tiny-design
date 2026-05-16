import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export interface InputNumberProps
  extends
    BaseProps,
    Omit<
      React.ComponentPropsWithoutRef<'input'>,
      | 'className'
      | 'children'
      | 'defaultValue'
      | 'max'
      | 'min'
      | 'onChange'
      | 'size'
      | 'style'
      | 'value'
    > {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (
    value: number,
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLSpanElement>
  ) => void;
  size?: SizeType;
  disabled?: boolean;
  /** Determine whether always display the control button  */
  controls?: boolean;
}
