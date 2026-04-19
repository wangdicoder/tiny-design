import React from 'react';
import { BaseProps } from '../_utils/props';

export type SkeletonShape = 'rect' | 'round' | 'circle';
export type SkeletonAnimation = boolean | 'pulse' | 'shimmer';
export type SkeletonSize = 'sm' | 'md' | 'lg' | number;

export interface SkeletonAvatarConfig {
  shape?: 'circle' | 'square';
  size?: SkeletonSize;
}

export interface SkeletonTitleConfig {
  width?: number | string;
}

export interface SkeletonParagraphConfig {
  rows?: number;
  widths?: Array<number | string>;
}

export interface SkeletonBlockProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'title'> {
  shape?: SkeletonShape;
  width?: number | string;
  height?: number | string;
  animation?: SkeletonAnimation;
}

export interface SkeletonTextProps extends SkeletonBlockProps {
  rows?: number;
  widths?: Array<number | string>;
}

export interface SkeletonAvatarProps extends Omit<SkeletonBlockProps, 'shape' | 'width' | 'height'> {
  shape?: 'circle' | 'square';
  size?: SkeletonSize;
}

export interface SkeletonProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'>, BaseProps {
  loading?: boolean;
  shape?: SkeletonShape;
  width?: number | string;
  height?: number | string;
  animation?: SkeletonAnimation;
  avatar?: boolean | SkeletonAvatarConfig;
  title?: boolean | SkeletonTitleConfig;
  paragraph?: boolean | SkeletonParagraphConfig;
  children?: React.ReactNode;
}
