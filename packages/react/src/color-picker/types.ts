import React from 'react';
import { BaseProps } from '../_utils/props';

export type ColorFormat = 'hex' | 'rgb' | 'hsb' | 'oklch';

export interface Color {
  h: number; // 0-360
  s: number; // 0-100
  b: number; // 0-100 (brightness/value)
  a: number; // 0-1
}

export interface ColorChangeMeta {
  color: Color;
  format: ColorFormat;
}

export interface ColorPickerProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string, meta: ColorChangeMeta) => void;
  onChangeComplete?: (color: string, meta: ColorChangeMeta) => void;
  format?: ColorFormat;
  defaultFormat?: ColorFormat;
  formats?: ColorFormat[];
  onFormatChange?: (format: ColorFormat) => void;
  presets?: string[];
  showAlpha?: boolean;
  disabled?: boolean;
  trigger?: 'click' | 'hover';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}
