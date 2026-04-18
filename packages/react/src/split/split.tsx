import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import Resizer from './resizer';
import Pane from './split-pane';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import warning from '../_utils/warning';
import { SplitPaneProps, SplitProps, SplitSize } from './types';

type Constraints = {
  min: number;
  max: number;
};

type PaneRuntimeConfig = {
  props: SplitPaneProps;
  content: React.ReactNode;
};

const DEFAULT_SEPARATOR_SIZE = 2;
const DEFAULT_SEPARATOR_HIT_AREA_SIZE = 16;
const DEFAULT_KEYBOARD_STEP = 12;

const isSplitPaneElement = (
  child: React.ReactNode
): child is React.ReactElement<SplitPaneProps, typeof Pane> =>
  React.isValidElement(child) && child.type === Pane;

const getPointerPosition = (event: MouseEvent | TouchEvent, orientation: SplitProps['orientation']): number => {
  const key = orientation === 'horizontal' ? 'clientX' : 'clientY';
  if ('touches' in event) {
    const touch = event.touches[0] ?? event.changedTouches[0];
    return touch?.[key] ?? 0;
  }
  return event[key];
};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const extractPaneConfig = (child: React.ReactNode): PaneRuntimeConfig => {
  if (isSplitPaneElement(child)) {
    const { children, ...paneProps } = child.props;
    return { props: paneProps, content: children };
  }

  return {
    props: {},
    content: child,
  };
};

const getRootSize = (element: HTMLElement, orientation: SplitProps['orientation']): number => {
  const rect = element.getBoundingClientRect();
  return orientation === 'horizontal' ? rect.width : rect.height;
};

const Split = (props: SplitProps): JSX.Element => {
  const {
    orientation = 'horizontal',
    primary = 'first',
    disabled = false,
    size,
    defaultSize,
    min,
    max,
    collapsible = false,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    collapsedSize,
    onCollapseChange,
    dragStep,
    keyboardStep = DEFAULT_KEYBOARD_STEP,
    separatorSize,
    separatorHitAreaSize = DEFAULT_SEPARATOR_HIT_AREA_SIZE,
    separatorClassName,
    separatorStyle,
    separatorRender,
    onResize,
    onResizeStart,
    onResizeEnd,
    prefixCls: customisedCls,
    style,
    className,
    children,
    ...otherProps
  } = props;
  const resolvedSeparatorSize = separatorSize ?? DEFAULT_SEPARATOR_SIZE;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('split', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_${orientation}`]: orientation,
    [`${prefixCls}_disabled`]: disabled,
  });
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState(0);
  const [uncontrolledSize, setUncontrolledSize] = useState<number>();
  const [dragging, setDragging] = useState(false);
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(false);
  const didInitRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startPointerRef = useRef(0);
  const startSizeRef = useRef(0);
  const activeSizeRef = useRef<number>();
  const lastExpandedSizeRef = useRef<number>();

  const parseSize = useCallback(
    (value: SplitSize | undefined, currentContainerSize: number, name: string): number | undefined => {
      if (value === undefined) {
        return undefined;
      }

      if (typeof value === 'number') {
        return value;
      }

      const trimmedValue = value.trim();
      const pxMatch = trimmedValue.match(/^(-?\d+(?:\.\d+)?)px$/);
      if (pxMatch) {
        return Number(pxMatch[1]);
      }

      const percentMatch = trimmedValue.match(/^(-?\d+(?:\.\d+)?)%$/);
      if (percentMatch) {
        if (currentContainerSize <= 0) {
          return undefined;
        }
        return (currentContainerSize * Number(percentMatch[1])) / 100;
      }

      warning(true, `Split \`${name}\` only supports numbers, px strings, or percent strings.`);
      return undefined;
    },
    []
  );

  const childList = React.Children.toArray(children).filter((child) => child !== null && child !== undefined);
  warning(childList.length !== 2, 'Split expects exactly two children.');

  const paneConfigs = [extractPaneConfig(childList[0]), extractPaneConfig(childList[1])];
  const primaryIndex = primary === 'first' ? 0 : 1;
  const secondaryIndex = primaryIndex === 0 ? 1 : 0;
  const secondaryPane = paneConfigs[secondaryIndex];
  const directionSign = primaryIndex === 0 ? 1 : -1;

  const measureContainer = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    setContainerSize(getRootSize(wrapper, orientation));
  }, [orientation]);

  useEffect(() => {
    measureContainer();
  }, [measureContainer]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        measureContainer();
      });
      observer.observe(wrapper);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', measureContainer);
    return () => window.removeEventListener('resize', measureContainer);
  }, [measureContainer]);

  const getConstraints = useCallback(
    (currentContainerSize: number): Constraints => {
      const available = Math.max(0, currentContainerSize - resolvedSeparatorSize);
      const resolvedPrimaryMin = parseSize(min, currentContainerSize, 'min') ?? 0;
      const resolvedPrimaryMax = parseSize(max, currentContainerSize, 'max') ?? available;
      const resolvedSecondaryMin =
        parseSize(secondaryPane.props.min, currentContainerSize, 'secondaryPane.min') ?? 0;
      const resolvedSecondaryMax = parseSize(secondaryPane.props.max, currentContainerSize, 'secondaryPane.max');

      let minConstraint = Math.max(0, resolvedPrimaryMin);
      let maxConstraint = Math.min(available, Math.max(minConstraint, resolvedPrimaryMax));

      if (resolvedSecondaryMin > 0) {
        maxConstraint = Math.min(maxConstraint, Math.max(minConstraint, available - resolvedSecondaryMin));
      }

      if (resolvedSecondaryMax !== undefined) {
        minConstraint = Math.max(minConstraint, available - resolvedSecondaryMax);
      }

      return {
        min: Math.max(0, minConstraint),
        max: Math.max(Math.max(0, minConstraint), maxConstraint),
      };
    },
    [
      max,
      min,
      parseSize,
      resolvedSeparatorSize,
      secondaryPane.props.max,
      secondaryPane.props.min,
    ]
  );

  const expandedConstraints = useMemo(
    () => getConstraints(containerSize),
    [containerSize, getConstraints]
  );
  const resolvedCollapsedSize = useMemo(
    () =>
      clamp(
        parseSize(collapsedSize, containerSize, 'collapsedSize') ?? 0,
        0,
        Math.max(0, containerSize - resolvedSeparatorSize)
      ),
    [collapsedSize, containerSize, parseSize, resolvedSeparatorSize]
  );

  const isControlled = size !== undefined;
  const isCollapsedControlled = collapsedProp !== undefined;

  useEffect(() => {
    if (didInitRef.current || containerSize <= 0) {
      return;
    }

    const defaultExpandedSize =
      parseSize(defaultSize, containerSize, 'defaultSize') ?? expandedConstraints.min;
    const initialExpandedSize = clamp(defaultExpandedSize, expandedConstraints.min, expandedConstraints.max);
    const initialCollapsed = defaultCollapsed;

    setUncontrolledSize(initialExpandedSize);
    setUncontrolledCollapsed(initialCollapsed);
    lastExpandedSizeRef.current = initialExpandedSize;
    didInitRef.current = true;
  }, [
    containerSize,
    expandedConstraints.max,
    expandedConstraints.min,
    defaultCollapsed,
    defaultSize,
    parseSize,
  ]);

  const controlledSize = useMemo(() => {
    if (!isControlled) {
      return undefined;
    }
    const resolved = parseSize(size, containerSize, 'size');
    if (resolved === undefined) {
      return undefined;
    }
    return clamp(resolved, expandedConstraints.min, expandedConstraints.max);
  }, [containerSize, expandedConstraints.max, expandedConstraints.min, isControlled, parseSize, size]);

  const collapsed = isCollapsedControlled ? !!collapsedProp : uncontrolledCollapsed;
  const expandedSize = isControlled
    ? controlledSize ?? expandedConstraints.min
    : uncontrolledSize ?? expandedConstraints.min;
  const currentSize = collapsed ? resolvedCollapsedSize : expandedSize;

  useEffect(() => {
    activeSizeRef.current = currentSize;
  }, [currentSize]);

  useEffect(() => {
    if (collapsed || isControlled || uncontrolledSize === undefined) {
      return;
    }

    const clamped = clamp(uncontrolledSize, expandedConstraints.min, expandedConstraints.max);
    if (clamped !== uncontrolledSize) {
      setUncontrolledSize(clamped);
    }
  }, [collapsed, expandedConstraints.max, expandedConstraints.min, isControlled, uncontrolledSize]);

  useEffect(() => {
    if (!collapsed) {
      lastExpandedSizeRef.current = expandedSize;
    }
  }, [collapsed, expandedSize]);

  const emitCollapseChange = useCallback(
    (next: boolean) => {
      onCollapseChange?.(next);
    },
    [onCollapseChange]
  );

  const setCollapsedState = useCallback(
    (next: boolean) => {
      if (!isCollapsedControlled) {
        setUncontrolledCollapsed(next);
      }
      emitCollapseChange(next);
    },
    [emitCollapseChange, isCollapsedControlled]
  );

  const applyExpandedSize = useCallback(
    (nextSize: number, options?: { allowExpand?: boolean }) => {
      const clamped = clamp(nextSize, expandedConstraints.min, expandedConstraints.max);

      if (collapsed && options?.allowExpand && clamped !== resolvedCollapsedSize) {
        setCollapsedState(false);
      }

      if (!isControlled) {
        setUncontrolledSize(clamped);
      }

      lastExpandedSizeRef.current = clamped;
      activeSizeRef.current = collapsed && clamped === resolvedCollapsedSize ? resolvedCollapsedSize : clamped;
      onResize?.(activeSizeRef.current);
      return clamped;
    },
    [
      collapsed,
      expandedConstraints.max,
      expandedConstraints.min,
      isControlled,
      onResize,
      resolvedCollapsedSize,
      setCollapsedState,
    ]
  );

  const collapsePane = useCallback(() => {
    if (!collapsible || collapsed) {
      return resolvedCollapsedSize;
    }

    lastExpandedSizeRef.current = expandedSize;
    setCollapsedState(true);
    activeSizeRef.current = resolvedCollapsedSize;
    onResize?.(resolvedCollapsedSize);
    return resolvedCollapsedSize;
  }, [
    collapsed,
    expandedSize,
    onResize,
    collapsible,
    resolvedCollapsedSize,
    setCollapsedState,
  ]);

  const expandPane = useCallback(() => {
    if (!collapsed) {
      return expandedSize;
    }

    const restoredSize = clamp(
      lastExpandedSizeRef.current ?? expandedConstraints.min,
      expandedConstraints.min,
      expandedConstraints.max
    );
    setCollapsedState(false);

    if (!isControlled) {
      setUncontrolledSize(restoredSize);
    }

    lastExpandedSizeRef.current = restoredSize;
    activeSizeRef.current = restoredSize;
    onResize?.(restoredSize);
    return restoredSize;
  }, [
    collapsed,
    expandedConstraints.max,
    expandedConstraints.min,
    expandedSize,
    isControlled,
    onResize,
    setCollapsedState,
  ]);

  const endInteraction = useCallback(() => {
    if (!isDraggingRef.current) {
      return;
    }

    isDraggingRef.current = false;
    setDragging(false);
    onResizeEnd?.(activeSizeRef.current ?? currentSize);
  }, [currentSize, onResizeEnd]);

  const startInteraction = useCallback(
    (pointer: number) => {
      if (disabled) {
        return;
      }

      isDraggingRef.current = true;
      setDragging(true);
      startPointerRef.current = pointer;
      startSizeRef.current = activeSizeRef.current ?? currentSize;
      onResizeStart?.(currentSize);
    },
    [currentSize, disabled, onResizeStart]
  );

  const applyStep = useCallback(
    (delta: number, dragStep?: number) => {
      if (!dragStep || dragStep <= 0) {
        return delta;
      }

      if (Math.abs(delta) < dragStep) {
        return 0;
      }

      return Math.round(delta / dragStep) * dragStep;
    },
    []
  );

  const onPointerMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (disabled || !isDraggingRef.current) {
        return;
      }

      if ('cancelable' in event && event.cancelable) {
        event.preventDefault();
      }

      const pointer = getPointerPosition(event, orientation);
      const delta = applyStep(pointer - startPointerRef.current, dragStep);

      if (delta === 0) {
        return;
      }

      applyExpandedSize(startSizeRef.current + delta * directionSign, { allowExpand: true });
    },
    [applyExpandedSize, applyStep, directionSign, disabled, dragStep, orientation]
  );

  useEffect(() => {
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', endInteraction);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', endInteraction);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', endInteraction);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', endInteraction);
    };
  }, [endInteraction, onPointerMove]);

  const onSeparatorMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      startInteraction(orientation === 'horizontal' ? event.clientX : event.clientY);
    },
    [orientation, startInteraction]
  );

  const onSeparatorTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];
      if (!touch) return;
      startInteraction(orientation === 'horizontal' ? touch.clientX : touch.clientY);
    },
    [orientation, startInteraction]
  );

  const onSeparatorToggleCollapse = useCallback(() => {
    if (!collapsible || disabled) {
      return;
    }

    onResizeStart?.(currentSize);
    const finalSize = collapsed ? expandPane() : collapsePane();
    onResizeEnd?.(finalSize);
  }, [collapsePane, collapsed, collapsible, currentSize, disabled, expandPane, onResizeEnd, onResizeStart]);

  const onSeparatorKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      if ((event.key === 'Enter' || event.key === ' ') && collapsible) {
        event.preventDefault();
        onSeparatorToggleCollapse();
        return;
      }

      const mainStep = event.shiftKey ? keyboardStep * 5 : keyboardStep;
      let nextSize: number | null = null;

      if (orientation === 'horizontal') {
        if (event.key === 'ArrowLeft') {
          nextSize = currentSize - mainStep * directionSign;
        } else if (event.key === 'ArrowRight') {
          nextSize = currentSize + mainStep * directionSign;
        }
      } else if (event.key === 'ArrowUp') {
        nextSize = currentSize - mainStep * directionSign;
      } else if (event.key === 'ArrowDown') {
        nextSize = currentSize + mainStep * directionSign;
      }

      if (event.key === 'Home') {
        nextSize = expandedConstraints.min;
      }

      if (event.key === 'End') {
        nextSize = expandedConstraints.max;
      }

      if (nextSize === null) {
        return;
      }

      event.preventDefault();
      onResizeStart?.(currentSize);
      const finalSize = applyExpandedSize(nextSize, { allowExpand: true });
      onResizeEnd?.(finalSize);
    },
    [
      applyExpandedSize,
      currentSize,
      directionSign,
      disabled,
      expandedConstraints.max,
      expandedConstraints.min,
      keyboardStep,
      onResizeEnd,
      onResizeStart,
      onSeparatorToggleCollapse,
      orientation,
      collapsible,
    ]
  );

  warning(
    separatorHitAreaSize < resolvedSeparatorSize,
    'Split `separatorHitAreaSize` should be greater than or equal to `separatorSize`.'
  );

  const visualPaneSize = currentSize;
  const paneStyles: [React.CSSProperties, React.CSSProperties] =
    primaryIndex === 0
      ? [
          orientation === 'horizontal'
            ? { width: visualPaneSize, flex: '0 0 auto' }
            : { height: visualPaneSize, flex: '0 0 auto' },
          { flex: '1 1 0%' },
        ]
      : [
          { flex: '1 1 0%' },
          orientation === 'horizontal'
            ? { width: visualPaneSize, flex: '0 0 auto' }
            : { height: visualPaneSize, flex: '0 0 auto' },
        ];

  const renderPane = (config: PaneRuntimeConfig, paneStyle: React.CSSProperties, isPrimaryPane: boolean) => (
    <Pane
      {...config.props}
      style={{ ...config.props.style, ...paneStyle }}
      className={classNames(config.props.className, {
        [`${prefixCls}-pane_primary`]: isPrimaryPane,
        [`${prefixCls}-pane_secondary`]: !isPrimaryPane,
      })}>
      {config.content}
    </Pane>
  );

  return (
    <div ref={wrapperRef} {...otherProps} className={cls} style={style}>
      {renderPane(paneConfigs[0], paneStyles[0], primaryIndex === 0)}
      {childList.length === 2 ? (
        <Resizer
          visualSize={separatorSize}
          hitAreaSize={separatorHitAreaSize}
          disabled={disabled}
          dragging={dragging}
          collapsed={collapsed}
          collapsible={collapsible}
          orientation={orientation}
          separatorRender={separatorRender}
          className={separatorClassName}
          style={separatorStyle}
          aria-valuemin={Math.round(expandedConstraints.min)}
          aria-valuemax={Math.round(expandedConstraints.max)}
          aria-valuenow={Math.round(currentSize)}
          onDragStart={onSeparatorMouseDown}
          onTouchDragStart={onSeparatorTouchStart}
          onKeyStep={onSeparatorKeyDown}
          onToggleCollapse={onSeparatorToggleCollapse}
        />
      ) : null}
      {renderPane(paneConfigs[1], paneStyles[1], primaryIndex === 1)}
    </div>
  );
};

Split.displayName = 'Split';

export default Split;
