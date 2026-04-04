import React from 'react';
import { BaseProps } from '../_utils/props';
import { Placement } from '../popup/types';

export interface TourStepProps {
  /** The element the tour step points to */
  target?: HTMLElement | (() => HTMLElement | null) | null;

  /** Step title */
  title?: React.ReactNode;

  /** Step description */
  description?: React.ReactNode;

  /** Cover image or video */
  cover?: React.ReactNode;

  /** Position of the step card relative to the target */
  placement?: Placement;

  /** Whether to show the arrow */
  arrow?: boolean;

  /** Whether to show the mask */
  mask?: boolean;

  /** Whether to disable interaction on the highlighted area */
  disabledInteraction?: boolean;

  /** Props for the next button */
  nextButtonProps?: {
    children?: React.ReactNode;
    onClick?: () => void;
  };

  /** Props for the previous button */
  prevButtonProps?: {
    children?: React.ReactNode;
    onClick?: () => void;
  };

  /** Custom scroll behavior */
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;

  /** Callback when this step is closed */
  onClose?: () => void;
}

export interface TourProps extends BaseProps {
  /** Whether the tour is open */
  open?: boolean;

  /** Current step index (controlled) */
  current?: number;

  /** Tour steps */
  steps?: TourStepProps[];

  /** Default placement for all steps */
  placement?: Placement;

  /** Whether to show arrows */
  arrow?: boolean;

  /** Whether to show the mask overlay */
  mask?: boolean;

  /** Whether to disable interaction on the highlighted area */
  disabledInteraction?: boolean;

  /** Visual type */
  type?: 'default' | 'primary';

  /** Gap between the spotlight and the target element */
  gap?: { offset?: number; radius?: number };

  /** Z-index of the tour layer */
  zIndex?: number;

  /** Enable keyboard navigation (Escape to close, arrow keys to navigate) */
  keyboard?: boolean;

  /** Scroll into view options */
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;

  /** Custom indicator renderer */
  indicatorsRender?: (current: number, total: number) => React.ReactNode;

  /** Callback when the current step changes */
  onChange?: (current: number) => void;

  /** Callback when the tour is closed */
  onClose?: () => void;

  /** Callback after the tour finishes (last step next button clicked) */
  onFinish?: () => void;
}
