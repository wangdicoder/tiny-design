import React from 'react';
import { BaseProps } from '../_utils/props';

export interface TextareaProps
  extends BaseProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  rows?: number;
  limit?: number;
  counter?: (count?: number) => React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  /**
   * Whether the textarea is resizable.
   */
  resizable?: boolean;
  /**
   * Custom resize handle element rendered at the bottom-right corner for vertical resizing.
   * When provided, replaces the default resize grip icon.
   */
  resizeHandle?: React.ReactNode;
}
