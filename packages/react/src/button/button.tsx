import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { ButtonProps } from './types';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const {
    size = 'md',
    btnType = 'default',
    loading = false,
    disabled = false,
    block = false,
    onClick,
    icon,
    round,
    children,
    className,
    style,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn', configContext.prefixCls, customisedCls);
  const btnSize = props.size || configContext.componentSize || size;
  const cls = classNames(
    prefixCls,
    `${prefixCls}_${btnSize}`,
    {
      [`${prefixCls}_${btnType}`]: btnType,
      [`${prefixCls}_block`]: block,
      [`${prefixCls}_round`]: round,
      [`${prefixCls}_disabled`]: disabled,
      [`${prefixCls}_loading`]: loading,
      [`${prefixCls}_icon-only`]: !children && (loading || !!icon),
    },
    className
  );

  const btnOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      return;
    }
    onClick && onClick(e);
  };

  const renderIcon = (): React.ReactElement | null => {
    if (loading) {
      return <span className={`${prefixCls}__loader`} />;
    } else if (icon) {
      return <span className={`${prefixCls}__icon-container`}>{icon}</span>;
    } else {
      return null;
    }
  };

  return (
    <button
      {...otherProps}
      ref={ref}
      role="button"
      className={cls}
      disabled={disabled}
      onClick={btnOnClick}
      style={style}>
      {renderIcon()}
      {children && <span className={`${prefixCls}__children`}>{children}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
