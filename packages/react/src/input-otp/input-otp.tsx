import React, { useRef, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { InputOTPProps } from './types';
import OTPInput from './otp-input';

function strToArr(str: string): string[] {
  return (str || '').split('');
}

export interface InputOTPRef {
  focus: () => void;
  blur: () => void;
  nativeElement: HTMLDivElement | null;
}

const InputOTP = React.forwardRef<InputOTPRef, InputOTPProps>(
  (props, ref) => {
    const {
      length = 6,
      size = 'md',
      defaultValue,
      value,
      onChange,
      formatter,
      separator,
      disabled = false,
      mask,
      autoFocus,
      autoComplete,
      className,
      style,
      prefixCls: customisedCls,
      onFocus,
      ...otherProps
    } = props;

    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('input-otp', configContext.prefixCls, customisedCls);
    const inputSize = size || configContext.componentSize || 'md';

    const containerRef = useRef<HTMLDivElement>(null);
    const inputsRef = useRef<Record<number, HTMLInputElement | null>>({});

    // Formatter helper
    const internalFormatter = useCallback(
      (txt: string) => (formatter ? formatter(txt) : txt),
      [formatter]
    );

    // Value state
    const [valueCells, setValueCells] = useState<string[]>(() =>
      strToArr(internalFormatter(defaultValue || ''))
    );

    useEffect(() => {
      if (value !== undefined) {
        setValueCells(strToArr(value));
      }
    }, [value]);

    // Imperative handle
    React.useImperativeHandle(ref, () => ({
      focus: () => {
        // Focus first empty cell (or last cell if all filled)
        let nextIndex = 0;
        for (let i = 0; i < length; i += 1) {
          if (!inputsRef.current[i]?.value) {
            nextIndex = i;
            break;
          }
          nextIndex = i;
        }
        inputsRef.current[nextIndex]?.focus();
      },
      blur: () => {
        for (let i = 0; i < length; i += 1) {
          inputsRef.current[i]?.blur();
        }
      },
      nativeElement: containerRef.current,
    }));

    // Trigger onChange when value cells change
    const triggerValueCellsChange = useCallback(
      (nextValueCells: string[]) => {
        const prevValue = valueCells.join('');
        const nextValue = nextValueCells.join('');
        setValueCells(nextValueCells);
        if (onChange && prevValue !== nextValue) {
          onChange(nextValue);
        }
      },
      [onChange, valueCells]
    );

    // Patch value at given index
    const patchValue = useCallback(
      (index: number, txt: string) => {
        let nextCells = [...valueCells];

        // Fill cells till index
        for (let i = 0; i < index; i += 1) {
          if (!nextCells[i]) {
            nextCells[i] = '';
          }
        }

        if (txt.length <= 1) {
          nextCells[index] = txt;
        } else {
          nextCells = nextCells.slice(0, index).concat(strToArr(txt));
        }
        nextCells = nextCells.slice(0, length);

        // Clean trailing empty cells
        for (let i = nextCells.length - 1; i >= 0; i -= 1) {
          if (nextCells[i]) {
            break;
          }
          nextCells.pop();
        }

        // Format if needed
        const formattedValue = internalFormatter(
          nextCells.map((c) => c || ' ').join('')
        );
        nextCells = strToArr(formattedValue).map((c, i) => {
          if (c === ' ' && !nextCells[i]) {
            return nextCells[i];
          }
          return c;
        });

        return nextCells;
      },
      [valueCells, length, internalFormatter]
    );

    // Handle input change
    const onInputChange = useCallback(
      (index: number, txt: string) => {
        const nextCells = patchValue(index, txt);
        const nextIndex = Math.min(index + txt.length, length - 1);
        if (nextIndex !== index && nextCells[index] !== undefined) {
          inputsRef.current[nextIndex]?.focus();
        }
        triggerValueCellsChange(nextCells);
      },
      [patchValue, length, triggerValueCellsChange]
    );

    // Handle active change (arrow keys, backspace)
    const onInputActiveChange = useCallback(
      (nextIndex: number) => {
        const clampedIndex = Math.max(0, Math.min(nextIndex, length - 1));
        inputsRef.current[clampedIndex]?.focus();
      },
      [length]
    );

    // Handle focus — keep focus on the interacted cell
    const onInputFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>, index: number) => {
        if (onFocus) {
          (onFocus as React.FocusEventHandler<HTMLDivElement>)(event as unknown as React.FocusEvent<HTMLDivElement>);
        }
      },
      [onFocus]
    );

    // Render separator
    const renderSeparator = useMemo(() => {
      if (!separator) return null;
      return (index: number) => {
        const separatorNode =
          typeof separator === 'function' ? separator(index) : separator;
        if (!separatorNode) return null;
        return (
          <span className={`${prefixCls}__separator`}>
            {separatorNode}
          </span>
        );
      };
    }, [separator, prefixCls]);

    const cls = classNames(prefixCls, className, `${prefixCls}_${inputSize}`, {
      [`${prefixCls}_disabled`]: disabled,
    });

    return (
      <div
        {...otherProps}
        ref={containerRef}
        className={cls}
        style={style}
        role="group"
      >
        {Array.from({ length }).map((_, index) => {
          const singleValue = valueCells[index] || '';
          return (
            <React.Fragment key={`otp-${index}`}>
              <OTPInput
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                index={index}
                size={inputSize}
                prefixCls={prefixCls}
                value={singleValue}
                disabled={disabled}
                mask={mask}
                autoFocus={index === 0 && autoFocus}
                autoComplete={autoComplete}
                onChange={onInputChange}
                onActiveChange={onInputActiveChange}
                onFocus={(e) => onInputFocus(e, index)}
              />
              {index < length - 1 && renderSeparator?.(index)}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

InputOTP.displayName = 'InputOTP';

export default InputOTP;
