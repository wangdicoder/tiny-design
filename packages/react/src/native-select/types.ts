import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export type NativeSelectGroupProps = React.PropsWithRef<JSX.IntrinsicElements['optgroup']>;

export type NativeSelectOptionProps = React.PropsWithRef<JSX.IntrinsicElements['option']>;

export interface NativeSelectProps
  extends BaseProps,
    Omit<React.PropsWithRef<JSX.IntrinsicElements['select']>, 'size'> {
  size?: SizeType;
  children:
    | React.ReactElement<NativeSelectGroupProps | NativeSelectOptionProps>
    | React.ReactElement<NativeSelectGroupProps | NativeSelectOptionProps>[];
}
