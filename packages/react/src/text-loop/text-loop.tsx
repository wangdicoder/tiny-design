import React, { useContext, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { TextLoopProps } from './types';

const TextLoop = React.forwardRef<HTMLDivElement, TextLoopProps>((props, forwardedRef) => {
  const {
    interval = 3000,
    pauseOnHover = true,
    infinite = true,
    direction = 'up',
    prefixCls: customisedCls,
    className,
    style,
    children,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('text-loop', configContext.prefixCls, customisedCls);

  const isReverse = direction === 'down';

  const childArray = useMemo(() => React.Children.toArray(children), [children]);
  const count = childArray.length;

  // Build items list with duplicate for seamless infinite loop
  const items = useMemo(() => {
    if (count <= 1 || !infinite) return childArray;
    if (isReverse) {
      // Prepend duplicate of last child
      return [childArray[count - 1], ...childArray];
    }
    // Append duplicate of first child
    return [...childArray, childArray[0]];
  }, [childArray, count, infinite, isReverse]);

  const getInitialIndex = useCallback(() => {
    if (count <= 1) return 0;
    if (isReverse) return infinite ? count : count - 1;
    return 0;
  }, [count, isReverse, infinite]);

  const [index, setIndex] = useState(getInitialIndex);
  const [itemSize, setItemSize] = useState(0);
  const [transitioning, setTransitioning] = useState(true);

  const firstItemRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  // Measure the first item's height
  const measure = useCallback(() => {
    if (!firstItemRef.current) return;
    const size = firstItemRef.current.offsetHeight;
    if (size > 0) setItemSize(size);
  }, []);

  useEffect(() => {
    measure();
  }, [measure, childArray]);

  // Start/stop the cycling timer
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (count <= 1) return;
    timerRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setTransitioning(true);
        setIndex((prev) => (isReverse ? prev - 1 : prev + 1));
      }
    }, interval);
  }, [count, interval, isReverse]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  // Reset index when children or direction change
  useEffect(() => {
    setIndex(getInitialIndex());
    setTransitioning(false);
  }, [getInitialIndex]);

  // Handle seamless loop reset and finite mode stop
  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target !== e.currentTarget) return;

      if (infinite) {
        if (!isReverse && index >= count) {
          // Forward: reached appended duplicate → reset to 0
          setTransitioning(false);
          setIndex(0);
        } else if (isReverse && index <= 0) {
          // Reverse: reached prepended duplicate → reset to count
          setTransitioning(false);
          setIndex(count);
        }
      } else {
        if ((!isReverse && index >= count - 1) || (isReverse && index <= 0)) {
          stopTimer();
        }
      }
    },
    [infinite, isReverse, index, count, stopTimer]
  );

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) isPausedRef.current = true;
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) isPausedRef.current = false;
  }, [pauseOnHover]);

  const offset = itemSize > 0 ? `${-(index * itemSize)}px` : `${-(index * 100)}%`;
  const transform = `translateY(${offset})`;

  // Check prefers-reduced-motion via matchMedia
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const cls = classNames(prefixCls, className);

  const containerStyle: React.CSSProperties = {
    ...style,
    ...(itemSize > 0 ? { height: itemSize } : {}),
  };

  const trackStyle: React.CSSProperties = {
    transform,
    transition: transitioning && !prefersReducedMotion ? 'transform 300ms ease-in-out' : 'none',
  };

  return (
    <div
      {...otherProps}
      ref={forwardedRef}
      className={cls}
      style={containerStyle}
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${prefixCls}__track`}
        style={trackStyle}
        onTransitionEnd={handleTransitionEnd}
      >
        {items.map((child, i) => (
          <div
            key={i}
            ref={i === 0 ? firstItemRef : undefined}
            className={`${prefixCls}__item`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
});

TextLoop.displayName = 'TextLoop';

export default TextLoop;
