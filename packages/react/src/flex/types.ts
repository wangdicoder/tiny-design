import React from 'react';
import { BaseProps, SizeType } from '../_utils/props';

export interface FlexProps extends BaseProps, React.ComponentProps<'div'> {
  vertical?: boolean;
  wrap?: React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  gap?: SizeType | React.CSSProperties['gap'];
  flex?: React.CSSProperties['flex'];
  component?: React.ElementType;
}
