import React, { useEffect, useState, ReactNode, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { CloseCircle } from '../_utils/components';
import { InputProps } from './types';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref): JSX.Element => {
    const {
      size = 'md',
      disabled = false,
      clearable = false,
      defaultValue = '',
      prefix,
      suffix,
      onChange,
      onEnterPress,
      onKeyDown,
      className,
      style,
      onClearClick,
      prefixCls: customisedCls,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('input', configContext.prefixCls, customisedCls);
    const inputSize = props.size || configContext.componentSize || size;
    const cls = classNames(prefixCls, className, `${prefixCls}_${inputSize}`, {
      [`${prefixCls}_disabled`]: disabled,
    });
    const [value, setValue] = useState<string>(
      'value' in props ? (props.value as string) : defaultValue
    );

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const val = e.currentTarget.value;
      !('value' in props) && setValue(val);
      onChange && onChange(e);
    };

    const inputOnKeydown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        onEnterPress && onEnterPress(e);
      }
      onKeyDown && onKeyDown(e);
    };

    const clearBtnOnClick = (e: React.MouseEvent<HTMLSpanElement>): void => {
      !('value' in props) && setValue('');
      onClearClick && onClearClick(e);
    };

    const renderClearButton = (): ReactNode => {
      const clearIconSize = inputSize === 'sm' ? 14 : inputSize === 'lg' ? 18 : 16;
      if (clearable && value && value.length > 0) {
        return (
          <span className={`${prefixCls}__clear-btn`} onClick={clearBtnOnClick}>
            <CloseCircle size={clearIconSize} color="#BFBFBF" />
          </span>
        );
      }
      return null;
    };

    useEffect(() => {
      'value' in props && typeof props.value !== 'undefined' && setValue(props.value);
    }, [props.value]);

    return (
      <div className={cls} style={style}>
        {prefix && (
          <div className={`${prefixCls}__prefix`}>
            {prefix}
          </div>
        )}
        <input
          {...otherProps}
          ref={ref}
          value={value}
          disabled={disabled}
          className={`${prefixCls}__input`}
          onChange={inputOnChange}
          onKeyDown={inputOnKeydown}
        />
        {(suffix || clearable) && (
          <div className={`${prefixCls}__suffix`}>
            {renderClearButton()}
            {suffix}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
