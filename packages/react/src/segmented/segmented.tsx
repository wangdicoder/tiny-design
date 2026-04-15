import React, { useContext, useEffect, useId, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { SegmentedOption, SegmentedProps, SegmentedValue } from './types';

const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>((props, ref) => {
  const {
    options,
    name,
    value,
    defaultValue,
    block = false,
    disabled = false,
    size,
    prefixCls: customisedCls,
    className,
    style,
    onChange,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('segmented', configContext.prefixCls, customisedCls);
  const segSize = size || configContext.componentSize || 'md';
  const groupName = useId();
  const isControlled = 'value' in props;
  const [uncontrolledValue, setUncontrolledValue] = useState<SegmentedValue | undefined>(
    defaultValue
  );
  const selected = isControlled ? value : uncontrolledValue;

  useEffect(() => {
    const hasSelectedOption = options.some((option) => option.value === selected);
    if (!isControlled && typeof selected !== 'undefined' && !hasSelectedOption) {
      setUncontrolledValue(undefined);
    }
  }, [isControlled, options, selected]);

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_${segSize}`]: segSize,
    [`${prefixCls}_block`]: block,
    [`${prefixCls}_disabled`]: disabled,
  });

  const handleChange = (option: SegmentedOption) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || option.disabled) {
      return;
    }

    if (!isControlled) {
      setUncontrolledValue(option.value);
    }

    onChange?.(option.value, option, event);
  };

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cls}
      style={style}
      role="radiogroup"
    >
      {options.map((opt) => {
        const isActive = opt.value === selected;
        const itemCls = classNames(`${prefixCls}__item`, {
          [`${prefixCls}__item_active`]: isActive,
          [`${prefixCls}__item_disabled`]: opt.disabled,
        }, opt.className);
        const accessibleLabel =
          typeof opt.label === 'string' || typeof opt.label === 'number'
            ? String(opt.label)
            : opt.title;

        return (
          <label
            key={opt.value}
            className={itemCls}
            title={opt.title}
          >
            <input
              type="radio"
              className={`${prefixCls}__input`}
              name={name || groupName}
              checked={isActive}
              disabled={disabled || opt.disabled}
              onChange={handleChange(opt)}
              value={opt.value}
              aria-label={accessibleLabel}
            />
            <span className={`${prefixCls}__item-content`}>
              {opt.icon && <span className={`${prefixCls}__icon`}>{opt.icon}</span>}
              {typeof opt.label !== 'undefined' ? (
                <span className={`${prefixCls}__label`}>{opt.label}</span>
              ) : null}
            </span>
          </label>
        );
      })}
    </div>
  );
});

Segmented.displayName = 'Segmented';
export default Segmented;
