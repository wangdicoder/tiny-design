import React from 'react';
import { BaseProps } from '../_utils/props';

export type TriggerType = 'hover' | 'focus' | 'click' | 'contextmenu' | 'manual';
export type PopoverTheme = 'light' | 'dark';
export type Placement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end';

export interface PopupProps extends BaseProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'content'> {
  disabled?: boolean;
  content?: React.ReactNode;
  placement?: Placement;
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;

  /** Determine whether using a portal to wrap the content */
  usePortal?: boolean;

  /** Provide white and black backgrounds */
  theme?: PopoverTheme;

  flip?: boolean;

  /** Determine whether display an arrow */
  arrow?: boolean;

  /** The distance between popup window and trigger target */
  offset?: number;

  /** Delay in seconds, before tooltip is shown on mouse enter */
  mouseEnterDelay?: number;

  /** Delay in seconds, before tooltip is hidden on mouse leave */
  mouseLeaveDelay?: number;

  /** Trigger mode */
  trigger?: TriggerType;

  /** Determine using a bidirectional effect of the zoom animation */
  biZoom?: boolean;

  children: React.ReactElement;
}
