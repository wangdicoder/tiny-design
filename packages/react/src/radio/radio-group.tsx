import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { RadioGroupContext } from './radio-group-context';
import { RadioGroupProps } from './types';

const RadioGroup = (props: RadioGroupProps): JSX.Element => {
  const {
    defaultValue = '',
    disabled = false,
    name,
    onChange,
    className,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('radio-group', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);
  const [value, setValue] = useState<number | string>(
    'value' in props ? (props.value as number | string) : defaultValue
  );

  const radioOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!disabled) {
      const val = e.currentTarget.value;
      !('value' in props) && setValue(val);
      onChange && onChange(val);
    }
  };

  useEffect(() => {
    'value' in props && setValue(props.value as number | string);
  }, [props]);

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        disabled,
        value,
        onChange: radioOnChange,
      }}>
      <div {...otherProps} role="radiogroup" className={cls}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
