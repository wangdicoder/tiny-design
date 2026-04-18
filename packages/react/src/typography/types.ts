import React from 'react';
import { BaseProps } from '../_utils/props';

export type TextType = 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type TypographyTextTag =
  | 'span'
  | 'label'
  | 'small'
  | 'strong'
  | 'em'
  | 'i'
  | 'b'
  | 'mark'
  | 'kbd'
  | 'time';
export type TypographyParagraphTag = 'p' | 'div' | 'blockquote';

export interface TypographyEllipsisConfig {
  rows?: number;
  tooltip?: boolean | React.ReactNode;
}

export interface TypographyCopyableConfig {
  text?: string;
  onCopy?: (copied: boolean, text: string) => void;
  icon?: React.ReactNode;
  copiedIcon?: React.ReactNode;
  resetDuration?: number;
}

export interface TypographyProps
  extends BaseProps,
    React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export interface ParagraphProps extends BaseProps, React.ComponentProps<'p'> {
  as?: TypographyParagraphTag;
  ellipsis?: boolean | TypographyEllipsisConfig;
  children?: React.ReactNode;
}

export interface HeadingProps
  extends BaseProps,
    React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
}

export interface TextProps extends BaseProps, React.ComponentProps<'span'> {
  as?: TypographyTextTag;
  type?: TextType;
  copyable?: boolean | TypographyCopyableConfig;
  ellipsis?: boolean | TypographyEllipsisConfig;
  code?: boolean;
  del?: boolean;
  underline?: boolean;
  strong?: boolean;
  italic?: boolean;
  mark?: boolean;
  sub?: boolean;
  sup?: boolean;
  children: React.ReactNode;
}
