import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export type NativeSelectGroupProps = React.ComponentPropsWithoutRef<'optgroup'>;

export type NativeSelectOptionProps = React.ComponentPropsWithoutRef<'option'>;

export interface NativeSelectProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'select'>, 'size'> {
  size?: SizeType;
  children:
    | React.ReactElement<NativeSelectGroupProps | NativeSelectOptionProps>
    | React.ReactElement<NativeSelectGroupProps | NativeSelectOptionProps>[];
}
