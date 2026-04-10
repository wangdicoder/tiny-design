import React from 'react';
import { TextProps, TypographyCopyableConfig, TypographyEllipsisConfig } from './types';

export function extractTextContent(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join('');
  }

  if (React.isValidElement(node)) {
    return extractTextContent(node.props.children);
  }

  return '';
}

export function resolveCopyableConfig(
  copyable: TextProps['copyable']
): TypographyCopyableConfig | null {
  if (!copyable) {
    return null;
  }

  return copyable === true ? {} : copyable;
}

export function resolveEllipsisConfig(
  ellipsis: boolean | TypographyEllipsisConfig | undefined
): TypographyEllipsisConfig | null {
  if (!ellipsis) {
    return null;
  }

  if (ellipsis === true) {
    return { rows: 1 };
  }

  return {
    rows: ellipsis.rows && ellipsis.rows > 0 ? ellipsis.rows : 1,
    tooltip: ellipsis.tooltip,
  };
}
