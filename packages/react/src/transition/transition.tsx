import React from 'react';
import useTransition, { TransitionState } from './use-transition';

export type AnimationName =
  | 'zoom-center-top'
  | 'zoom-center-bottom'
  | 'zoom-center-left'
  | 'zoom-center-right'
  | 'zoom-top-start'
  | 'zoom-top'
  | 'zoom-top-end'
  | 'zoom-bottom-start'
  | 'zoom-bottom'
  | 'zoom-bottom-end'
  | 'zoom-left-start'
  | 'zoom-left'
  | 'zoom-left-end'
  | 'zoom-right-start'
  | 'zoom-right'
  | 'zoom-right-end'
  | 'slide-up'
  | 'slide-down';

export type TransitionProps = {
  in?: boolean;
  timeout?: number | { enter: number; exit: number };
  appear?: boolean;
  unmountOnExit?: boolean;
  mountOnEnter?: boolean;

  /** Animation prefix */
  prefix?: string;

  /** Preset animation name */
  animation?: AnimationName;

  /** Custom class name base (overrides prefix + animation) */
  classNames?: string;

  /** Prevent the transition conflict with the inner component */
  wrapper?: boolean;

  nodeRef?: React.RefObject<HTMLElement | null>;

  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;

  children?: React.ReactNode;
};

function getTransitionClasses(base: string, state: TransitionState): string {
  switch (state) {
    case 'enter':
      return `${base}-enter`;
    case 'entering':
      return `${base}-enter ${base}-enter-active`;
    case 'entered':
      return `${base}-enter-done`;
    case 'exit':
      return `${base}-exit`;
    case 'exiting':
      return `${base}-exit ${base}-exit-active`;
    case 'exited':
      return `${base}-exit-done`;
    default:
      return '';
  }
}

const Transition = (props: TransitionProps): React.ReactElement | null => {
  const {
    in: inProp = false,
    timeout = 300,
    unmountOnExit = true,
    mountOnEnter,
    appear = true,
    prefix = 'ty',
    animation,
    classNames: classNamesProp,
    nodeRef,
    children,
    wrapper,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  } = props;

  const { state, shouldMount } = useTransition({
    in: inProp,
    timeout,
    appear,
    unmountOnExit,
    mountOnEnter,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    nodeRef,
  });

  if (!shouldMount) {
    return null;
  }

  const base = classNamesProp ? classNamesProp : `${prefix}-${animation}`;
  const transitionClasses = getTransitionClasses(base, state);

  const child = wrapper ? <div>{children}</div> : children;

  if (React.isValidElement(child)) {
    const existingClassName = (child.props as { className?: string }).className || '';
    const mergedClassName = existingClassName
      ? `${existingClassName} ${transitionClasses}`.trim()
      : transitionClasses;

    return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
      className: mergedClassName || undefined,
    });
  }

  return child as React.ReactElement;
};

Transition.displayName = 'Transition';

export default Transition;
