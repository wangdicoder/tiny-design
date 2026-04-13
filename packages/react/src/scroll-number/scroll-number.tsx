import React, { useContext, useMemo, useRef, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { ScrollNumberProps } from './types';

// Build a long enough column so position can accumulate without running out.
// Range: -20 to 29 (50 cells). Position resets when it drifts beyond ±10.
const COLUMN_CELLS: number[] = [];
for (let i = -20; i <= 29; i++) {
  COLUMN_CELLS.push(((i % 10) + 10) % 10);
}
const COL_OFFSET = 20; // cell at index 0 represents virtual position -20

const formatValue = (
  value: number | string | undefined,
  precision?: number,
  groupSeparator?: string
): string => {
  if (value === undefined) return '';
  if (typeof value === 'string') return value;

  let val = precision !== undefined ? value.toFixed(precision) : String(value);

  if (groupSeparator) {
    const parts = val.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
    val = parts.join('.');
  }

  return val;
};

interface ScrollDigitProps {
  digit: number;
  cellHeight: number;
  duration: number;
  prefixCls: string;
}

const ScrollDigit: React.FC<ScrollDigitProps> = ({ digit, cellHeight, duration, prefixCls }) => {
  const prevDigit = useRef(digit);
  const positionRef = useRef(digit);
  const columnRef = useRef<HTMLSpanElement>(null);

  // When cellHeight becomes available or changes, reposition without animation.
  // Initialize to 0 so the effect fires on mount even if cellHeight is already > 0.
  const prevCellHeight = useRef(0);
  useEffect(() => {
    if (cellHeight > 0 && cellHeight !== prevCellHeight.current) {
      prevCellHeight.current = cellHeight;
      if (columnRef.current) {
        columnRef.current.style.transition = 'none';
        columnRef.current.style.transform = `translateY(${-(positionRef.current + COL_OFFSET) * cellHeight}px)`;
      }
    }
  }, [cellHeight]);

  useEffect(() => {
    const prev = prevDigit.current;
    if (prev === digit) return;

    // Take the shortest path across the 0/9 boundary
    const forward = (digit - prev + 10) % 10;
    const backward = (prev - digit + 10) % 10;

    let newPosition: number;
    if (forward <= backward) {
      newPosition = positionRef.current + forward;
    } else {
      newPosition = positionRef.current - backward;
    }

    positionRef.current = newPosition;
    prevDigit.current = digit;

    if (columnRef.current && cellHeight > 0) {
      columnRef.current.style.transition = `transform ${duration}ms cubic-bezier(0.12, 0.4, 0.29, 1.46)`;
      columnRef.current.style.transform = `translateY(${-(newPosition + COL_OFFSET) * cellHeight}px)`;
    }
  }, [digit, cellHeight, duration]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      // Ignore bubbled events from children
      if (e.target !== e.currentTarget) return;
      // After animation, silently reset to canonical [0..9] if drifted too far
      const pos = positionRef.current;
      if (pos < -10 || pos > 19) {
        const canonical = ((pos % 10) + 10) % 10;
        positionRef.current = canonical;
        if (columnRef.current) {
          columnRef.current.style.transition = 'none';
          columnRef.current.style.transform = `translateY(${-(canonical + COL_OFFSET) * cellHeight}px)`;
        }
      }
    },
    [cellHeight]
  );

  return (
    <span className={`${prefixCls}__digit`} style={{ height: cellHeight, lineHeight: `${cellHeight}px` }}>
      <span
        ref={columnRef}
        className={`${prefixCls}__digit-column`}
        onTransitionEnd={handleTransitionEnd}
      >
        {COLUMN_CELLS.map((n, i) => (
          <span
            key={i}
            className={`${prefixCls}__digit-cell`}
            style={{ height: cellHeight, lineHeight: `${cellHeight}px` }}
          >
            {n}
          </span>
        ))}
      </span>
    </span>
  );
};

const ScrollNumber = React.forwardRef<HTMLDivElement, ScrollNumberProps>((props, ref) => {
  const {
    value,
    title,
    duration = 300,
    precision,
    groupSeparator = ',',
    prefix,
    suffix,
    valueClassName,
    valueStyle,
    prefixCls: customisedCls,
    className,
    style,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('scroll-number', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);

  const measureRef = useRef<HTMLSpanElement>(null);
  const [cellHeight, setCellHeight] = useState(0);

  const measure = useCallback(() => {
    if (measureRef.current) {
      const height = measureRef.current.offsetHeight;
      if (height > 0) {
        setCellHeight(height);
      }
    }
  }, []);

  useEffect(() => {
    measure();
  }, [measure, valueStyle]);

  const chars = useMemo(() => {
    if (value === undefined) return [];
    const formatted =
      typeof value === 'string' ? value : formatValue(value, precision, groupSeparator);
    return formatted.split('');
  }, [value, precision, groupSeparator]);

  return (
    <div {...otherProps} ref={ref} className={cls} style={style}>
      {title && <div className={`${prefixCls}__title`}>{title}</div>}
      <div className={classNames(`${prefixCls}__content`, valueClassName)} style={valueStyle}>
        {prefix && <span className={`${prefixCls}__prefix`}>{prefix}</span>}
        <span className={`${prefixCls}__value`} aria-hidden="true">
          {chars.map((char, index) => {
            // Key from the right so adding a new leading digit doesn't
            // shift existing digit elements and trigger unwanted transitions.
            const key = chars.length - index;
            const digit = parseInt(char, 10);
            if (!isNaN(digit)) {
              return (
                <ScrollDigit
                  key={key}
                  digit={digit}
                  cellHeight={cellHeight}
                  duration={duration}
                  prefixCls={prefixCls}
                />
              );
            }
            return (
              <span key={`sep-${key}`} className={`${prefixCls}__separator`}>
                {char}
              </span>
            );
          })}
        </span>
        {suffix && <span className={`${prefixCls}__suffix`}>{suffix}</span>}
        <span ref={measureRef} className={`${prefixCls}__measure`} aria-hidden="true">
          0
        </span>
      </div>
      <span className={`${prefixCls}__sr-only`}>
        {value !== undefined ? formatValue(value, precision, groupSeparator) : ''}
      </span>
    </div>
  );
});

ScrollNumber.displayName = 'ScrollNumber';
export default ScrollNumber;
