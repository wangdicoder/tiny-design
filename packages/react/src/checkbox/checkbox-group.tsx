import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { CheckboxGroupContext } from './checkbox-group-context';
import { CheckboxGroupProps } from './types';

const CheckboxGroup = (props: CheckboxGroupProps): React.ReactElement => {
  const {
    defaultValue = [],
    prefixCls: customisedCls,
    onChange,
    disabled,
    className,
    children,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('checkbox-group', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);
  const [value, setValue] = useState<string[]>(
    'value' in props ? (props.value as string[]) : defaultValue
  );

  const itemOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!disabled) {
      const name = e.currentTarget.name;
      const newValue = value.includes(name)
        ? value.filter((v) => v !== name)
        : [...value, name];
      !('value' in props) && setValue(newValue);
      onChange && onChange(newValue);
    }
  };

  useEffect(() => {
    'value' in props && setValue([...(props.value as string[])]);
  }, [props]);

  return (
    <CheckboxGroupContext.Provider
      value={{
        value,
        disabled,
        onChange: itemOnChange,
      }}>
      <div {...otherProps} role="group" className={cls}>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
