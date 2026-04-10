import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { ButtonGroupProps, ButtonProps, ButtonType } from './types';
import { SizeType } from '../_utils/props';

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props: ButtonGroupProps, ref) => {
    const {
      size = 'md',
      btnType = 'default',
      disabled = false,
      round = false,
      prefixCls: customisedCls,
      className,
      children,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('btn-group', configContext.prefixCls, customisedCls);
    const btnSize = props.size || configContext.componentSize || size;
    const cls = classNames(
      prefixCls,
      {
        [`${prefixCls}_round`]: round,
        [`${prefixCls}_${btnType}`]: btnType,
        [`${prefixCls}_${btnSize}`]: btnSize,
      },
      className
    );
    return (
      <div {...otherProps} className={cls} ref={ref}>
        {React.Children.map(children, (child) => {
          const childElement = child as React.FunctionComponentElement<ButtonProps>;
          const { displayName } = childElement.type;
          if (displayName === 'Button') {
            const childProps: Partial<ButtonProps> = {
              btnType: btnType as ButtonType,
              size: btnSize as SizeType,
              disabled: 'disabled' in childElement.props ? childElement.props.disabled : disabled,
            };
            return React.cloneElement(childElement, childProps);
          } else {
            return child;
          }
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
