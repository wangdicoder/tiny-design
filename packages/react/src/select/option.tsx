import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Check } from '../_utils/components';
import { markComponent, SELECT_OPTION_MARK } from '../_utils/component-markers';
import { SelectContext } from './select-context';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { SelectOptionsProps } from './types';

const SelectOption = (props: SelectOptionsProps): React.ReactElement => {
  const {
    disabled = false,
    prefixCls: customisedCls,
    value,
    label,
    className,
    children,
    ...otherProps
  } = props;
  const context = useContext(SelectContext);
  const isMultiple = context.mode === 'multiple' || context.mode === 'tags';
  const isSelected = isMultiple
    ? Array.isArray(context.value) && context.value.includes(value)
    : context.value === value;
  const [active, setActive] = useState(false);
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('select-option', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_selected`]: isSelected,
    [`${prefixCls}_active`]: active,
    [`${prefixCls}_disabled`]: disabled,
  });

  const onClick = (): void => {
    !disabled && context.onSelect(value);
  };

  const displayContent = label ?? children;

  return (
    <li
      {...otherProps}
      key={value}
      role="option"
      className={cls}
      onClick={onClick}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      aria-selected={isSelected}
      aria-disabled={disabled}>
      <span className={`${prefixCls}__content`}>{displayContent}</span>
      {isMultiple && isSelected && (
        <span className={`${prefixCls}__check`}>
          <Check size={14} />
        </span>
      )}
    </li>
  );
};

SelectOption.displayName = 'SelectOption';
markComponent(SelectOption, SELECT_OPTION_MARK);

export default SelectOption;
