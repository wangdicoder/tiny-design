import React, { CSSProperties } from 'react';
import { BaseProps } from '../_utils/props';

export interface ImageProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'img'>, 'placeholder'> {
  src?: string;
  placeholder?: React.ReactNode;
  alt?: string;
  width?: number | string;
  height?: number | string;
  round?: boolean;
  lazy?: boolean;
  fallback?: React.ReactNode;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  imageClassName?: string;
  imageStyle?: CSSProperties;
}
