import React from 'react';
import { BaseProps } from '../_utils/props';

export interface AnchorProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'ul'>, 'children' | 'onChange' | 'onClick'> {
  affix?: boolean;
  type?: 'dot' | 'line';
  offsetBottom?: number;
  offsetTop?: number;
  getContainer?: () => HTMLElement | Window;
  onChange?: (currentActiveLink: string) => void;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>, link: { title: string; href: string }) => void;
  children?: React.ReactNode;
}

export interface AnchorLinkProps extends BaseProps, React.ComponentPropsWithoutRef<'a'> {
  href: string;
  title: string;
  children?: React.ReactElement<AnchorLinkProps>[];
}
