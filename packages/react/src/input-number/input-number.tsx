import React, { useEffect, useState, MouseEvent, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { InputNumberProps } from './types';
import { ArrowDown } from '../_utils/components';

/**
 * Valid the string is a number
 * @param val
 */
const isValid = (val: string | number): boolean => {
  return !isNaN(+val);
};

const isFiniteNumber = (val: unknown): val is number => {
  return typeof val === 'number' && Number.isFinite(val);
};

const getDecimalPrecision = (num: number): number => {
  const str = String(num);
  const dotIndex = str.indexOf('.');
  return dotIndex === -1 ? 0 : str.length - dotIndex - 1;
};

const toPrecision = (val: number, precision: number): number => {
  return parseFloat(val.toFixed(precision));
};

const InputNumber = React.forwardRef<HTMLDivElement, InputNumberProps>((props, ref) => {
  const {
    size = 'md',
    disabled = false,
    defaultValue = 0,
    step = 1,
    precision,
    controls = false,
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    onChange,
    className,
    prefixCls: customisedCls,
    style,
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('input-number', configContext.prefixCls, customisedCls);
  const inputSize = props.size || configContext.componentSize || size;
  const cls = classNames(prefixCls, className, `${prefixCls}_${inputSize}`, {
    [`${prefixCls}_disabled`]: disabled,
    [`${prefixCls}_always-controls`]: controls,
  });
  const resolvedPrecision = precision ?? Math.max(getDecimalPrecision(step), getDecimalPrecision(defaultValue));
  const [value, setValue] = useState<number | undefined>(
    'value' in props ? (props.value as number) : defaultValue
  );
  const hasNumericValue = isFiniteNumber(value);
  const displayValue = hasNumericValue
    ? (resolvedPrecision > 0 ? value.toFixed(resolvedPrecision) : String(value))
    : '';

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const raw = Number(e.target.value.trim());
    const val = resolvedPrecision > 0 ? toPrecision(raw, resolvedPrecision) : raw;
    !('value' in props) && setValue(val);
    onChange && isValid(val) && onChange(val, e);
  };

  const plusOnClick = (e: MouseEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    if (!disabled && isValid(step)) {
      const nextBase = hasNumericValue ? value : 0;
      const val = toPrecision(nextBase + +step, resolvedPrecision);
      if (val <= max) {
        !('value' in props) && setValue(val);
        onChange && onChange(val, e);
      }
    }
  };

  const minusOnClick = (e: MouseEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    if (!disabled && isValid(step)) {
      const nextBase = hasNumericValue ? value : 0;
      const val = toPrecision(nextBase - +step, resolvedPrecision);
      if (val >= min) {
        !('value' in props) && setValue(val);
        onChange && onChange(val, e);
      }
    }
  };

  useEffect(() => {
    'value' in props && setValue(props.value as number);
  }, [props]);

  return (
    <div ref={ref} className={cls} style={style}>
      <input
        autoComplete="off"
        disabled={disabled}
        value={displayValue}
        type="number"
        className={`${prefixCls}__input`}
        max={max}
        min={min}
        step={step}
        onChange={inputOnChange}
        aria-valuenow={hasNumericValue ? value : undefined}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-disabled={disabled}
      />
      <div className={`${prefixCls}__controls`}>
        <span className={`${prefixCls}__up`} onClick={plusOnClick}>
          <ArrowDown size={8} className={`${prefixCls}__icon ${prefixCls}__icon_reverse`} />
        </span>
        <span className={`${prefixCls}__down`} onClick={minusOnClick}>
          <ArrowDown size={8} className={`${prefixCls}__icon`} />
        </span>
      </div>
    </div>
  );
});

InputNumber.displayName = 'InputNumber';

export default InputNumber;
