import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { InputGroupAddonProps, InputProps } from './types';
import { SizeType } from '../_utils/props';

const InputGroupAddon = (props: InputGroupAddonProps): React.ReactElement => {
  const {
    disabled = false,
    size = 'md',
    noBorder,
    className,
    style,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('input-group-addon', configContext.prefixCls, customisedCls);
  const inputSize = props.size || configContext.componentSize || size;
  const childDisplayName = React.isValidElement(children) ? (children.type as any)?.displayName : null;
  const isControlChild = childDisplayName === 'Input'
    || childDisplayName === 'Button'
    || childDisplayName === 'Select'
    || childDisplayName === 'InputNumber';
  const cls = classNames(prefixCls, className, `${prefixCls}_${inputSize}`, {
    [`${prefixCls}_no-border`]: noBorder,
    [`${prefixCls}_control`]: isControlChild,
  });

  if (React.isValidElement(children)) {
    return (
      <div className={cls} style={style}>
        {React.Children.map(children, (child: React.ReactElement) => {
          const displayName = (child.type as any)?.displayName;
          if (displayName === 'Input' || displayName === 'Button' || displayName === 'Select' || displayName === 'InputNumber') {
            const childProps: Partial<InputProps> = {
              disabled,
              size: inputSize as SizeType,
            };
            return React.cloneElement(child, childProps);
          }
          return child;
        })}
      </div>
    );
  }
  return (
    <div {...otherProps} className={cls} style={style}>
      {children}
    </div>
  );
};

InputGroupAddon.displayName = 'InputGroupAddon';

export default InputGroupAddon;
