import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu-context';
import { SubMenuContext } from './sub-menu-context';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { MenuItemProps } from './types';

const MenuItem = (props: MenuItemProps): JSX.Element => {
  const {
    disabled = false,
    danger = false,
    icon,
    extra,
    index,
    className,
    style,
    children,
    onClick,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const menuContext = useContext(MenuContext);
  const subMenuContext = useContext(SubMenuContext);
  const { inlineIndent, mode } = menuContext;
  const { level = 1, ancestorKeys = [], onMenuItemClick } = subMenuContext;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('menu-item', configContext.prefixCls, customisedCls);
  const isSelected = menuContext.isSelected(index);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_disabled`]: disabled,
    [`${prefixCls}_selected`]: isSelected,
    [`${prefixCls}_active`]: isSelected,
    [`${prefixCls}_danger`]: danger,
  });

  useEffect(() => {
    if (!index) return;
    menuContext.registerKey?.(index, ancestorKeys);
    return () => menuContext.unregisterKey?.(index);
  }, [index, ancestorKeys]);

  const onItemClick = (e: React.MouseEvent): void => {
    if (disabled) {
      return;
    }

    onClick && onClick(e);
    onMenuItemClick && onMenuItemClick();
    if (menuContext.handleSelect && typeof index === 'string') {
      menuContext.handleSelect(index);
    }
  };

  return (
    <li
      {...otherProps}
      key={index}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-selected={isSelected || undefined}
      className={cls}
      style={{ paddingLeft: mode === 'inline' ? level * inlineIndent : undefined, ...style }}
      onClick={onItemClick}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onItemClick(e as unknown as React.MouseEvent);
        }
      }}>
      <span className={`${prefixCls}__main`}>
        {icon ? <span className={`${prefixCls}__icon`}>{icon}</span> : null}
        <span className={`${prefixCls}__label`}>{children}</span>
      </span>
      {extra ? <span className={`${prefixCls}__extra`}>{extra}</span> : null}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
