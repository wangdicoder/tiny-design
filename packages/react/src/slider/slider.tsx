import React, { useContext, useRef, useState, ReactNode, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import Tooltip from '../tooltip';
import { SliderProps } from './types';

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (props: SliderProps, ref): JSX.Element => {
    const {
      defaultValue = 0,
      min = 0,
      max = 100,
      direction = 'horizontal',
      dots = false,
      step = 1,
      disabled = false,
      track = true,
      tooltipPlacement = 'top',
      tooltipVisible,
      tipFormatter,
      marks,
      onChange,
      onClick,
      onAfterChange,
      className,
      prefixCls: customisedCls,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('slider', configContext.prefixCls, customisedCls);
    const cls = classNames(prefixCls, className, `${prefixCls}_${direction}`, {
      [`${prefixCls}-with-marks`]: marks,
      [`${prefixCls}_disabled`]: disabled,
    });
    const [sliderValues, setSliderValues] = useState<number[]>(
      ('value' in props
        ? Array.isArray(props.value)
          ? props.value
          : [props.value]
        : Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]) as number[]
    );
    const [isHovering, setHovering] = useState(false);
    const railRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const thumbIdx = useRef(0);
    const isDragging = useRef(false);
    const mouseStartPos = useRef(0);
    const trackStartPos = useRef(0);
    const currVal = useRef(0);
    const sliderValuesRef = useRef(sliderValues);
    sliderValuesRef.current = sliderValues;
    const isVertical = direction === 'vertical';

    const getValueToPercent = (value: number): number => {
      return ((value - min) * 100) / (max - min);
    };

    const calculateTrackStyle = (): React.CSSProperties => {
      const trackStyle: React.CSSProperties = { left: '0%', right: '100%' };
      if (sliderValues.length === 1) {
        trackStyle.right = `${100 - getValueToPercent(sliderValues[0])}%`;
      } else {
        const leftValue = sliderValues[0] > sliderValues[1] ? sliderValues[1] : sliderValues[0];
        const rightValue = sliderValues[0] > sliderValues[1] ? sliderValues[0] : sliderValues[1];
        trackStyle.left = `${getValueToPercent(leftValue)}%`;
        trackStyle.right = `${100 - getValueToPercent(rightValue)}%`;
      }
      return trackStyle;
    };

    const getRangeValue = (val: number): number[] => {
      if (sliderValues.length === 1) {
        return [val];
      }

      const values = [...sliderValues];
      const val1 = values[0];
      const val2 = values[1];
      if ((val1 < val2 && val1 > val) || (val1 > val2 && val1 < val)) {
        values[0] = val as number;
      }
      if ((val1 < val2 && val2 < val) || (val1 > val2 && val2 > val)) {
        values[1] = val as number;
      }

      if (val1 > val && val2 < val) {
        const half = val2 + (val1 - val2) / 2;
        if (half >= val) {
          values[1] = val as number;
        }
        if (half < val) {
          values[0] = val as number;
        }
      }
      if (val2 > val && val1 < val) {
        const half = val1 + (val2 - val1) / 2;
        if (half >= val) {
          values[0] = val as number;
        }
        if (half < val) {
          values[1] = val as number;
        }
      }
      return values;
    };

    const handleOnChange = (value: number[]): void => {
      !('value' in props) && setSliderValues([...value]);
      onChange &&
        onChange(value.length === 1 ? value[0] : [value[0], value[1]]);
    };

    const getWidthToValue = (width: number): number => {
      const numOfSteps = (max - min) / step;
      let percent = 0;
      const railNode = railRef.current;
      if (railNode) {
        percent = (width / railNode[isVertical ? 'clientHeight' : 'clientWidth']) * 100;
      }

      if (percent <= 0) {
        percent = 0;
      }
      if (percent >= 100) {
        percent = 100;
      }

      // add 0.5 for step movement
      const num = numOfSteps * (percent / 100) + 0.5;
      const val = Math.floor(num) * step + min;
      return isVertical ? 100 - val : val;
    };

    const sliderOnClick = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (isDragging.current || disabled) {
        return;
      }
      const railNode = railRef.current;
      if (railNode) {
        const markOffset = railNode.getBoundingClientRect();
        const value = getWidthToValue(
          e[isVertical ? 'clientY' : 'clientX'] - markOffset[isVertical ? 'y' : 'x']
        );
        handleOnChange(getRangeValue(value));
      }
      onClick && onClick(e);
    };

    // Store latest drag/dragEnd handlers in refs so window listeners
    // always dispatch to the current closure (no stale captures).
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const draggingRef = useRef<(e: MouseEvent | TouchEvent) => void>(() => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const dragEndRef = useRef<() => void>(() => {});

    const getClientPos = (e: MouseEvent | TouchEvent): number => {
      const key = isVertical ? 'clientY' : 'clientX';
      if ('touches' in e) {
        return e.touches[0]?.[key] ?? e.changedTouches[0]?.[key] ?? 0;
      }
      return e[key];
    };

    draggingRef.current = (e: MouseEvent | TouchEvent): void => {
      if (!isDragging.current) {
        return;
      }
      const sliderVal = getWidthToValue(
        getClientPos(e) - mouseStartPos.current + trackStartPos.current
      );
      const val = [...sliderValuesRef.current];
      if (sliderVal !== currVal.current) {
        val[thumbIdx.current] = sliderVal;
        handleOnChange(val);
        currVal.current = sliderVal;
      }
    };

    dragEndRef.current = (): void => {
      isDragging.current = false;
      window.removeEventListener('mousemove', stableOnDragging);
      window.removeEventListener('mouseup', stableOnDragEnd);
      window.removeEventListener('touchmove', stableOnDragging);
      window.removeEventListener('touchend', stableOnDragEnd);
      const vals = sliderValuesRef.current;
      onAfterChange &&
        onAfterChange(vals.length === 1 ? vals[0] : [vals[0], vals[1]]);
    };

    // Stable function references for window event listeners
    const stableOnDragging = useCallback((e: MouseEvent | TouchEvent) => draggingRef.current(e), []);
    const stableOnDragEnd = useCallback(() => dragEndRef.current(), []);

    /**
     * Get track width info when click down the thumb button
     */
    const startDrag = (idx: number, clientPos: number): void => {
      if (disabled) {
        return;
      }

      thumbIdx.current = idx;
      isDragging.current = true;
      mouseStartPos.current = clientPos;
      const trackNode = trackRef.current;
      if (trackNode) {
        trackStartPos.current = isVertical ? trackNode.offsetTop : trackNode.clientWidth;

        // handle when it is a dual slider
        if (sliderValues.length > 1) {
          const trackOffset = trackNode[isVertical ? 'offsetTop' : 'offsetLeft'];
          trackStartPos.current =
            (idx === 1 && sliderValues[1] > sliderValues[0]) ||
            (idx !== 1 && sliderValues[0] > sliderValues[1])
              ? isVertical
                ? trackOffset
                : trackStartPos.current + trackOffset
              : isVertical
              ? trackNode.clientHeight + trackOffset
              : trackOffset;
        }
      }

      window.addEventListener('mousemove', stableOnDragging, { capture: true });
      window.addEventListener('mouseup', stableOnDragEnd, { capture: true });
      window.addEventListener('touchmove', stableOnDragging, { capture: true });
      window.addEventListener('touchend', stableOnDragEnd, { capture: true });
    };

    const handleThumbOnMouseDown = (idx: number, e: React.MouseEvent<HTMLDivElement>): void => {
      startDrag(idx, e[isVertical ? 'clientY' : 'clientX']);
    };

    const handleThumbOnTouchStart = (idx: number, e: React.TouchEvent<HTMLDivElement>): void => {
      const touch = e.touches[0];
      if (touch) {
        startDrag(idx, touch[isVertical ? 'clientY' : 'clientX']);
      }
    };

    /**
     * Get dot values
     */
    const getSteps = (): number[] => {
      const numOfSteps = (max - min) / step;
      const stepWidth = (100 * step) / (max - min);
      const res = [0];
      for (let i = 1; i < numOfSteps; i += 1) {
        res.push(i * stepWidth);
      }
      res.push(100);
      return res;
    };

    /**
     * Determine dot's border style
     * @param dotVal: dot value
     */
    const isDotActive = (dotVal: number): boolean => {
      if (sliderValues.length === 1) {
        return dotVal < sliderValues[0];
      } else {
        const [left, right] =
          sliderValues[0] < sliderValues[1]
            ? [sliderValues[0], sliderValues[1]]
            : [sliderValues[1], sliderValues[0]];
        return dotVal < right && dotVal > left;
      }
    };

    const handleThumbOnMouseEnter = (idx: number): void => {
      thumbIdx.current = idx;
      setHovering(true);
    };

    const handleThumbOnMouseLeave = (): void => {
      setHovering(false);
    };

    const renderMark = (mark: string): ReactNode => {
      if (marks && marks[mark] && (marks[mark] as any).label) {
        const { label, style } = marks[mark] as any;
        return <div style={style}>{label}</div>;
      } else if (marks && marks[mark]) {
        return marks[mark] as ReactNode;
      } else {
        return mark;
      }
    };

    useEffect(() => {
      if ('value' in props && props.value !== undefined) {
        setSliderValues(Array.isArray(props.value) ? props.value : [props.value]);
      }
    }, [props.value]);

    const trackStyle = calculateTrackStyle();
    return (
      <div ref={ref} {...otherProps} className={cls} onClick={sliderOnClick}>
        <div ref={railRef} className={`${prefixCls}__rail`} />
        <div
          ref={trackRef}
          className={classNames(`${prefixCls}__track`, {
            [`${prefixCls}__track_invisible`]: !track,
          })}
          style={{
            [isVertical ? 'bottom' : 'left']: trackStyle.left,
            [isVertical ? 'top' : 'right']: trackStyle.right,
          }}
        />
        {sliderValues.map((value, idx) => {
          const percent = getValueToPercent(value);
          return (
            <div
              key={idx}
              tabIndex={0}
              role="slider"
              aria-valuemax={max}
              aria-valuemin={min}
              aria-valuenow={value}
              aria-disabled={disabled}
              className={classNames(`${prefixCls}__thumb-container`, {
                [`${prefixCls}__thumb-container_hovering`]: idx === thumbIdx.current && isHovering,
                [`${prefixCls}__thumb-container_dragging`]:
                  idx === thumbIdx.current && isDragging.current,
              })}
              style={{
                zIndex: idx === thumbIdx.current && (isDragging.current || isHovering) ? 2 : 1,
                transform: isVertical ? 'translate(-50%, 50%)' : 'translate(-50%, -50%)',
                [isVertical ? 'bottom' : 'left']: `${percent}%`,
              }}
              onMouseEnter={(): void => handleThumbOnMouseEnter(idx)}
              onMouseLeave={handleThumbOnMouseLeave}
              onMouseDown={(e): void => handleThumbOnMouseDown(idx, e)}
              onTouchStart={(e): void => handleThumbOnTouchStart(idx, e)}>
              <Tooltip
                trigger="manual"
                visible={
                  'tooltipVisible' in props
                    ? tooltipVisible
                    : idx === thumbIdx.current && (isDragging.current || isHovering)
                }
                usePortal={false}
                placement={tooltipPlacement}
                title={tipFormatter ? tipFormatter(value) : value}>
                <div className={`${prefixCls}__thumb`} />
              </Tooltip>
            </div>
          );
        })}
        {dots && (
          <div className={`${prefixCls}__dots`}>
            {getSteps().map((val, idx) => {
              const stepVal = idx * step + min;
              return (
                <div
                  key={idx}
                  style={{
                    [isVertical ? 'bottom' : 'left']: `${val}%`,
                  }}
                  className={classNames(`${prefixCls}__dot`, {
                    [`${prefixCls}__dot_active`]: isDotActive(stepVal),
                  })}
                />
              );
            })}
          </div>
        )}
        {marks && (
          <div className={`${prefixCls}__marks`}>
            {Object.keys(marks).map((mark: string, idx) => {
              const percent = getValueToPercent(parseFloat(mark));
              return (
                <div
                  key={idx}
                  style={{
                    [isVertical ? 'bottom' : 'left']: `${percent}%`,
                  }}
                  className={`${prefixCls}__mark`}>
                  {renderMark(mark)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
