import React, { useRef, useCallback } from 'react';
import classNames from 'classnames';
import { OTPInputCellProps } from './types';

const OTPInput = React.forwardRef<HTMLInputElement, OTPInputCellProps>(
  (props, ref) => {
    const {
      index,
      value,
      disabled,
      mask,
      size = 'md',
      autoFocus,
      autoComplete,
      prefixCls,
      onChange,
      onActiveChange,
      onFocus,
    } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);

    // Merge refs
    const setRef = useCallback(
      (el: HTMLInputElement | null) => {
        inputRef.current = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
        }
      },
      [ref]
    );

    const syncSelection = useCallback(() => {
      requestAnimationFrame(() => {
        const inputEle = inputRef.current;
        if (document.activeElement === inputEle && inputEle) {
          inputEle.select();
        }
      });
    }, []);

    const onInternalInput = (e: React.FormEvent<HTMLInputElement>): void => {
      onChange(index, (e.target as HTMLInputElement).value);
    };

    const onInternalFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
      onFocus?.(e);
      syncSelection();
    };

    const onInternalKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      const { key, ctrlKey, metaKey } = event;

      if (key === 'ArrowLeft') {
        onActiveChange(index - 1);
      } else if (key === 'ArrowRight') {
        onActiveChange(index + 1);
      } else if (key === 'z' && (ctrlKey || metaKey)) {
        event.preventDefault();
      } else if (key === 'Backspace' && !value) {
        onActiveChange(index - 1);
      }

      syncSelection();
    };

    const displayValue = mask && typeof mask === 'string' && value ? mask : value;
    const inputType = mask === true ? 'password' : 'text';

    return (
      <input
        ref={setRef}
        aria-label={`OTP Input ${index + 1}`}
        type={inputType}
        inputMode="numeric"
        autoComplete={autoComplete || 'one-time-code'}
        className={classNames(`${prefixCls}__cell`, `${prefixCls}__cell_${size}`, {
          [`${prefixCls}__cell_disabled`]: disabled,
          [`${prefixCls}__cell_mask`]: mask,
        })}
        value={displayValue}
        disabled={disabled}
        autoFocus={autoFocus}
        onInput={onInternalInput}
        onFocus={onInternalFocus}
        onKeyDown={onInternalKeyDown}
        onMouseDown={syncSelection}
        onMouseUp={syncSelection}
      />
    );
  }
);

OTPInput.displayName = 'OTPInput';

export default OTPInput;
