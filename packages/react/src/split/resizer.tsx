import React, { useContext, MouseEventHandler, TouchEventHandler } from 'react';
import classNames from 'classnames';
import { BaseProps, DirectionType } from '../_utils/props';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';

export interface ResizerProps
  extends BaseProps,
    React.PropsWithoutRef<JSX.IntrinsicElements['div']> {
  size: number;
  mode: DirectionType;
  onResizerMouseDown: MouseEventHandler<HTMLDivElement>;
  onResizerTouchStart?: TouchEventHandler<HTMLDivElement>;
}

const Resizer = (props: ResizerProps): JSX.Element => {
  const {
    size,
    onResizerMouseDown,
    onResizerTouchStart,
    prefixCls: customisedCls,
    mode,
    className,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('split-bar', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_${mode}`]: mode,
  });

  const style: React.CSSProperties = mode === 'vertical' ? { width: size } : { height: size };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    props.onMouseDown && props.onMouseDown(e);
    onResizerMouseDown(e);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    props.onTouchStart && props.onTouchStart(e);
    onResizerTouchStart && onResizerTouchStart(e);
  };

  return (
    <div
      {...otherProps}
      role="separator"
      tabIndex={0}
      aria-orientation={mode === 'vertical' ? 'vertical' : 'horizontal'}
      className={cls}
      style={style}
      onMouseDown={(e): void => onMouseDown(e)}
      onTouchStart={(e): void => onTouchStart(e)}
      onKeyDown={(e) => {
        const step = 10;
        if (mode === 'vertical' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
          e.preventDefault();
          const delta = e.key === 'ArrowRight' ? step : -step;
          const synthetic = { clientX: (e.target as HTMLElement).getBoundingClientRect().left + delta, clientY: 0 } as MouseEvent;
          onResizerMouseDown(e as unknown as React.MouseEvent<HTMLDivElement>);
          window.dispatchEvent(new MouseEvent('mousemove', { clientX: synthetic.clientX }));
          window.dispatchEvent(new MouseEvent('mouseup'));
        }
        if (mode === 'horizontal' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
          e.preventDefault();
          const delta = e.key === 'ArrowDown' ? step : -step;
          const synthetic = { clientY: (e.target as HTMLElement).getBoundingClientRect().top + delta, clientX: 0 } as MouseEvent;
          onResizerMouseDown(e as unknown as React.MouseEvent<HTMLDivElement>);
          window.dispatchEvent(new MouseEvent('mousemove', { clientY: synthetic.clientY }));
          window.dispatchEvent(new MouseEvent('mouseup'));
        }
      }}>
      <div className={`${prefixCls}__icon`} />
    </div>
  );
};

Resizer.displayName = 'Resizer';

export default Resizer;
