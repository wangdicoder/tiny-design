import React, { useContext, useState, useRef, useCallback, forwardRef } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { TextareaProps } from './types';

const DefaultResizeHandle = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 10.5L10.5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M7.5 11L11 7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M10 11L11 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    disabled = false,
    resizable = true,
    resizeHandle,
    prefixCls: customisedCls,
    limit,
    counter,
    defaultValue,
    value,
    rows,
    onChange,
    className,
    style,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('textarea', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_disabled`]: disabled,
  });
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const minHeightRef = useRef<number | null>(null);

  const textareaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.currentTarget.value.length);
    onChange && onChange(e.currentTarget.value, e);
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      const startY = e.clientY;
      const startHeight = container.offsetHeight;
      if (minHeightRef.current == null) {
        minHeightRef.current = Math.max(startHeight, 32);
      }
      const minHeight = minHeightRef.current;

      const onMouseMove = (moveEvent: MouseEvent) => {
        container.style.height = `${Math.max(startHeight + (moveEvent.clientY - startY), minHeight)}px`;
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    []
  );

  const showResizeHandle = resizable && !disabled;
  const showCounter = !!(limit || counter);
  const showFooter = showCounter || showResizeHandle;
  const containerCls = classNames(`${prefixCls}-container`, {
    [`${prefixCls}-container_with-footer`]: showFooter,
    [`${prefixCls}-container_with-custom-resize`]: showResizeHandle,
  });

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (node && minHeightRef.current == null && node.offsetHeight > 0) {
          minHeightRef.current = Math.max(node.offsetHeight, 32);
        }
      }}
      className={containerCls}
    >
      <textarea
        {...otherProps}
        ref={ref}
        maxLength={limit}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        className={cls}
        style={style}
        onChange={textareaOnChange}
      />
      {showFooter && (
        <span className={`${prefixCls}-container__footer`}>
          {showCounter && (
            <span className={`${prefixCls}-container__counter`}>
              {counter && typeof counter === 'function' ? counter(count) : `${count}/${limit}`}
            </span>
          )}
          {showResizeHandle && (
            <span
              className={`${prefixCls}-container__resize-handle`}
              onMouseDown={handleMouseDown}
              role="separator"
              aria-orientation="vertical"
            >
              {resizeHandle ?? <DefaultResizeHandle />}
            </span>
          )}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
