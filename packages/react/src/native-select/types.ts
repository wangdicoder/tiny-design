import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export type NativeSelectGroupProps = React.ComponentProps<'optgroup'>;

export type NativeSelectOptionProps = React.ComponentProps<'option'>;

export interface NativeSelectProps
  extends BaseProps,
    Omit<React.ComponentProps<'select'>, 'size'> {
  size?: SizeType;
  children:
    | React.ReactElement<NativeSelectGroupProps | NativeSelectOptionProps>
    | React.ReactElement<NativeSelectGroupProps | NativeSelectOptionProps>[];
}
