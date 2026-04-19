import React, { useContext } from 'react';
import classNames from 'classnames';
import { BaseProps, DirectionType } from '../_utils/props';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { SplitSeparatorRenderProps } from './types';

export interface ResizerProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<'div'> {
  visualSize?: number;
  hitAreaSize: number;
  orientation: DirectionType;
  disabled?: boolean;
  dragging?: boolean;
  collapsed?: boolean;
  collapsible?: boolean;
  separatorRender?: (props: SplitSeparatorRenderProps) => React.ReactNode;
  onDragStart: React.MouseEventHandler<HTMLDivElement>;
  onTouchDragStart?: React.TouchEventHandler<HTMLDivElement>;
  onKeyStep?: React.KeyboardEventHandler<HTMLDivElement>;
  onToggleCollapse?: () => void;
}

const Resizer = (props: ResizerProps): JSX.Element => {
  const {
    visualSize,
    hitAreaSize,
    orientation,
    disabled = false,
    dragging = false,
    collapsed = false,
    collapsible = false,
    separatorRender,
    onDragStart,
    onTouchDragStart,
    onKeyStep,
    onToggleCollapse,
    prefixCls: customisedCls,
    className,
    style,
    onMouseDown,
    onTouchStart,
    onDoubleClick,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('split-bar', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_${orientation}`]: orientation,
    [`${prefixCls}_disabled`]: disabled,
    [`${prefixCls}_dragging`]: dragging,
    [`${prefixCls}_collapsed`]: collapsed,
    [`${prefixCls}_collapsible`]: collapsible,
  });
  const slotCls = `${prefixCls}__slot`;

  const resolvedVisualSize = visualSize ?? 2;

  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(orientation === 'horizontal' ? { width: hitAreaSize } : { height: hitAreaSize }),
    ['--ty-split-bar-hit-area-size' as string]: `${hitAreaSize}px`,
  };
  if (visualSize !== undefined) {
    (mergedStyle as React.CSSProperties & Record<string, string>)['--ty-split-bar-size'] = `${visualSize}px`;
  }

  const renderProps: SplitSeparatorRenderProps = {
    orientation,
    disabled,
    dragging,
    collapsed,
    collapsible,
    size: resolvedVisualSize,
    hitAreaSize,
    toggleCollapse: () => {
      if (!disabled && collapsible) {
        onToggleCollapse?.();
      }
    },
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseDown?.(event);
    if (!event.defaultPrevented) {
      onDragStart(event);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    onTouchStart?.(event);
    if (!event.defaultPrevented) {
      onTouchDragStart?.(event);
    }
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onDoubleClick?.(event);
    if (!event.defaultPrevented && !disabled && collapsible) {
      onToggleCollapse?.();
    }
  };

  const ariaOrientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';

  return (
    <div
      className={classNames(slotCls, `${slotCls}_${orientation}`)}
      style={orientation === 'horizontal' ? { width: resolvedVisualSize } : { height: resolvedVisualSize }}>
      <div
        {...otherProps}
        role="separator"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-orientation={ariaOrientation}
        className={cls}
        style={mergedStyle}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={onKeyStep}
        onDoubleClick={handleDoubleClick}>
        {separatorRender ? (
          separatorRender(renderProps)
        ) : (
          <div className={`${prefixCls}__visual`}>
            <span className={`${prefixCls}__track`} />
            <span className={`${prefixCls}__handle`}>
              <span className={`${prefixCls}__grip-dot`} />
              <span className={`${prefixCls}__grip-dot`} />
              <span className={`${prefixCls}__grip-dot`} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

Resizer.displayName = 'Resizer';

export default Resizer;
