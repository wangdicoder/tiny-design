import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Resizer from './resizer';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import Pane from './split-pane';
import warning from '../_utils/warning';
import { SplitContext } from './split-context';
import { SplitProps } from './types';

const Split = (props: SplitProps): JSX.Element => {
  const {
    mode = 'vertical',
    disabled = false,
    min = 50,
    max = 50,
    resizerSize = 6,
    defaultSize,
    step,
    onChange,
    onDragStarted,
    onDragFinished,
    prefixCls: customisedCls,
    style: defaultStyle,
    resizerProps,
    className,
    children,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('split', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_${mode}`]: mode,
    [`${prefixCls}_disabled`]: disabled,
  });
  const [pane1Size, setPane1Size] = useState<number | undefined>(undefined);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const paneRef = useRef<HTMLDivElement | null>(null);
  const isActiveMove = useRef(false);
  const lastPosition = useRef(0);
  const wrapper = wrapperRef.current;

  const getSizeNumber = useCallback(
    (size: number | string): number => {
      if (typeof size === 'string') {
        if (wrapper) {
          const { width, height } = wrapper.getBoundingClientRect();
          return ((mode === 'vertical' ? width : height) * parseFloat(size)) / 100;
        }
      } else {
        return size;
      }
      return 0;
    },
    [mode, wrapper]
  );
  const minSize = getSizeNumber(min);
  let maxSize = getSizeNumber(max);
  if (wrapper) {
    const { width, height } = wrapper.getBoundingClientRect();
    maxSize = (mode === 'vertical' ? width : height) - maxSize - resizerSize;
  }

  const getPointerPos = (e: MouseEvent | TouchEvent): number => {
    const key = mode === 'vertical' ? 'clientX' : 'clientY';
    if ('touches' in e) {
      const touch = e.touches[0] ?? e.changedTouches[0];
      return touch?.[key] ?? 0;
    }
    return e[key];
  };

  const onResizerMouseDown = (e: React.MouseEvent<HTMLElement>): void => {
    isActiveMove.current = true;
    lastPosition.current = e[mode === 'vertical' ? 'clientX' : 'clientY'];
    onDragStarted && onDragStarted();
  };

  const onResizerTouchStart = (e: React.TouchEvent<HTMLElement>): void => {
    const touch = e.touches[0];
    if (!touch) return;
    isActiveMove.current = true;
    lastPosition.current = touch[mode === 'vertical' ? 'clientX' : 'clientY'];
    onDragStarted && onDragStarted();
  };

  const onPointerMove = useCallback(
    (e: MouseEvent | TouchEvent): void => {
      if (!disabled && isActiveMove.current) {
        const pane = paneRef.current;
        if (pane) {
          if (pane.getBoundingClientRect) {
            const width = pane.getBoundingClientRect().width;
            const height = pane.getBoundingClientRect().height;
            const current = getPointerPos(e);
            const size = mode === 'vertical' ? width : height;
            let offset = lastPosition.current - current;
            if (step) {
              if (Math.abs(offset) < step) {
                return;
              }
              offset = Math.round((offset / step) * step);
            }

            let newSize = size - offset;
            const newPosition = lastPosition.current - offset;

            if (newSize < minSize) {
              newSize = minSize;
            } else if (newSize > maxSize) {
              newSize = maxSize;
            } else {
              lastPosition.current = newPosition;
            }

            !('size' in props) && setPane1Size(newSize);
            onChange && onChange(newSize);
          }
        }
      }
    },
    [props, disabled, maxSize, minSize, mode, onChange, step]
  );

  const onPointerUp = useCallback((): void => {
    isActiveMove.current = false;
    onDragFinished && onDragFinished();
  }, [onDragFinished]);

  let style: React.CSSProperties;
  if (mode === 'vertical') {
    style = {
      ...defaultStyle,
    };
  } else {
    style = {
      ...defaultStyle,
      minHeight: '100%',
      width: '100%',
    };
  }

  useEffect(() => {
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchmove', onPointerMove);
    window.addEventListener('touchend', onPointerUp);

    return (): void => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  useEffect(() => {
    const initialSize = getSizeNumber(props.size || defaultSize || minSize);
    setPane1Size(initialSize);
  }, [getSizeNumber, props.size, defaultSize, minSize]);

  useEffect(() => {
    if ('size' in props) {
      const size = getSizeNumber(props.size as number | string);
      setPane1Size(size);
    }
  }, [props, getSizeNumber]);

  warning(React.Children.count(children) > 2, 'There are more than 2 children inside Split.');
  const childrenList = React.Children.toArray(children).filter((child) => child);

  return (
    <SplitContext.Provider value={{ mode }}>
      <div ref={wrapperRef} {...otherProps} className={cls} style={style}>
        <Pane ref={paneRef} size={pane1Size} style={{ flex: '0 0 auto' }}>
          {childrenList[0]}
        </Pane>
        <Resizer
          {...resizerProps}
          size={resizerSize}
          mode={mode}
          onResizerMouseDown={onResizerMouseDown}
          onResizerTouchStart={onResizerTouchStart}
        />
        <Pane style={{ flex: '1 1 0%' }}>{childrenList[1]}</Pane>
      </div>
    </SplitContext.Provider>
  );
};

Split.displayName = 'Split';

export default Split;
