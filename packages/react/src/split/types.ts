import React from 'react';
import { BaseProps, DirectionType } from '../_utils/props';

export type SplitOrientation = DirectionType;
export type SplitPrimary = 'first' | 'second';
export type SplitSize = number | `${number}px` | `${number}%`;

export type SplitSeparatorRenderProps = {
  orientation: SplitOrientation;
  disabled: boolean;
  dragging: boolean;
  collapsed: boolean;
  collapsible: boolean;
  size: number;
  hitAreaSize: number;
  toggleCollapse: () => void;
};

export interface SplitPaneProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  /** Minimum pane size */
  min?: SplitSize;

  /** Maximum pane size */
  max?: SplitSize;

  children?: React.ReactNode;
}

export interface SplitProps
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  /** Pane arrangement: horizontal => left/right, vertical => top/bottom */
  orientation?: SplitOrientation;

  /** Which pane owns the resizable size model */
  primary?: SplitPrimary;

  /** Disabled flag */
  disabled?: boolean;

  /** Controlled size for the primary pane */
  size?: SplitSize;

  /** Initial size for the primary pane */
  defaultSize?: SplitSize;

  /** Minimum size for the primary pane */
  min?: SplitSize;

  /** Maximum size for the primary pane */
  max?: SplitSize;

  /** Allow the primary pane to collapse */
  collapsible?: boolean;

  /** Controlled collapsed state for the primary pane */
  collapsed?: boolean;

  /** Initial collapsed state for the primary pane */
  defaultCollapsed?: boolean;

  /** Size of the primary pane while collapsed */
  collapsedSize?: SplitSize;

  onCollapseChange?: (collapsed: boolean) => void;

  /** Pointer drag step */
  dragStep?: number;

  /** Keyboard drag step */
  keyboardStep?: number;

  /** Visual separator size */
  separatorSize?: number;

  /** Interactive separator hit area size */
  separatorHitAreaSize?: number;

  /** Class name applied to the separator interaction container */
  separatorClassName?: string;

  /** Inline style applied to the separator interaction container */
  separatorStyle?: React.CSSProperties;

  /** Custom separator content renderer */
  separatorRender?: (props: SplitSeparatorRenderProps) => React.ReactNode;

  onResize?: (size: number) => void;
  onResizeStart?: (size: number) => void;
  onResizeEnd?: (size: number) => void;

  children: [React.ReactNode, React.ReactNode];
}
