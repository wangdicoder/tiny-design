import React, { useContext } from 'react';
import classNames from 'classnames';
import { INPUT_GROUP_CONTROL_MARK, markComponent } from '../_utils/component-markers';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { ButtonProps } from './types';

export const BUTTON_MARK = Symbol('tiny-design.button');
const isProduction = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV === 'production';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const {
    size = 'md',
    variant = 'solid',
    color = 'default',
    loading = false,
    disabled = false,
    block = false,
    onClick,
    icon,
    iconPosition = 'start',
    loadingIcon,
    round,
    shape,
    children,
    className,
    style,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn', configContext.prefixCls, customisedCls);
  const btnSize = props.size || configContext.componentSize || size;
  const resolvedShape = shape || (round ? 'round' : 'default');
  const isDisabled = disabled || loading;
  const hasChildren = React.Children.count(children) > 0;
  const visualIcon = loading ? loadingIcon || <span className={`${prefixCls}__loader`} /> : icon;
  const isIconOnly = !hasChildren && !!visualIcon;
  const accessibleName =
    otherProps['aria-label'] || otherProps['aria-labelledby'] || otherProps.title;

  if (!isProduction && isIconOnly && !accessibleName) {
    // Icon-only buttons need an accessible name.
    console.warn(
      'Button with icon only should provide `aria-label`, `aria-labelledby`, or `title`.'
    );
  }

  const cls = classNames(
    prefixCls,
    `${prefixCls}_${btnSize}`,
    {
      [`${prefixCls}_variant-${variant}`]: variant,
      [`${prefixCls}_color-${color}`]: color,
      [`${prefixCls}_block`]: block,
      [`${prefixCls}_round`]: resolvedShape === 'round',
      [`${prefixCls}_circle`]: resolvedShape === 'circle',
      [`${prefixCls}_disabled`]: isDisabled,
      [`${prefixCls}_loading`]: loading,
      [`${prefixCls}_icon-start`]: !!visualIcon && iconPosition === 'start',
      [`${prefixCls}_icon-end`]: !!visualIcon && iconPosition === 'end',
      [`${prefixCls}_icon-only`]: isIconOnly,
    },
    className
  );

  const btnOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      return;
    }
    onClick && onClick(e);
  };

  const iconNode = visualIcon ? (
    <span className={`${prefixCls}__icon-container`}>{visualIcon}</span>
  ) : null;
  const contentNode = hasChildren ? (
    <span className={`${prefixCls}__children`}>{children}</span>
  ) : null;

  return (
    <button
      {...otherProps}
      ref={ref}
      className={cls}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={btnOnClick}
      style={style}>
      {iconPosition === 'end' ? contentNode : iconNode}
      {iconPosition === 'end' ? iconNode : contentNode}
    </button>
  );
});

Button.displayName = 'Button';
markComponent(Button, BUTTON_MARK);
markComponent(Button, INPUT_GROUP_CONTROL_MARK);

export default Button;
