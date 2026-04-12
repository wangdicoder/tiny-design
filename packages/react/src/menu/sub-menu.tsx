import React, { useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu-context';
import { SubMenuContext } from './sub-menu-context';
import { ArrowDown } from '../_utils/components';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { MenuItemProps, SubMenuProps } from './types';
import Popup from '../popup';
import CollapseTransition from '../collapse-transition';

const SubMenu = (props: SubMenuProps): JSX.Element => {
  const {
    index,
    title,
    disabled,
    danger,
    icon,
    extra,
    className,
    overlayClassName,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const menuContext = useContext(MenuContext);
  const { mode, inlineIndent } = menuContext;
  const { level = 1, ancestorKeys = [], onMenuItemClick: _onMenuItemClick } = useContext(SubMenuContext);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('menu-sub', configContext.prefixCls, customisedCls);
  const isSelected = menuContext.isSubMenuSelected(index);
  const isInlineOpen = menuContext.isOpen(index);
  const menuOpen = mode === 'inline' ? isInlineOpen : popupOpen && menuContext.isOpen(index);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_open`]: menuOpen,
    [`${prefixCls}_selected`]: isSelected,
    [`${prefixCls}_disabled`]: disabled,
    [`${prefixCls}_danger`]: danger,
  });
  const popupCls = classNames(overlayClassName, {
    [`${prefixCls}__popup_theme-${menuContext.theme}`]: mode !== 'inline',
  });
  const subMenuCls = classNames(`${prefixCls}__list`, {
    [`${prefixCls}__list_open`]: menuOpen,
    [`${prefixCls}__list_popup`]: mode !== 'inline',
    [`${prefixCls}__list_scene-${menuContext.appearance}`]: mode !== 'inline',
    [`${prefixCls}__list_theme-${menuContext.theme}`]: mode !== 'inline',
  });
  const isNested = level > 1;
  const rightPopupMenu = mode === 'vertical' || (mode === 'horizontal' && isNested);
  const arrowCls = rightPopupMenu
    ? `${prefixCls}__arrow ${prefixCls}__arrow_right`
    : classNames(`${prefixCls}__arrow`, {
        [`${prefixCls}__arrow_reverse`]: menuOpen,
      });
  const menuItemCls = `${configContext.prefixCls ? configContext.prefixCls : 'ty'}-menu-item`;
  const titleCls = classNames(menuItemCls, `${prefixCls}__title`, {
    [`${menuItemCls}_disabled`]: disabled,
    [`${menuItemCls}_danger`]: danger,
    [`${menuItemCls}_child-selected`]: isSelected,
    [`${prefixCls}__title_open`]: menuOpen,
  });
  const titleRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const childAncestorKeys = index ? [...ancestorKeys, index] : ancestorKeys;
  const shouldUsePortal = menuContext.appearance === 'navigation';

  useEffect(() => {
    if (!index) return;
    menuContext.registerKey?.(index, ancestorKeys);
    return () => menuContext.unregisterKey?.(index);
  }, [index, ancestorKeys]);

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const setOpenWithDelay = (open: boolean, delay = 200): void => {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setPopupOpen(open);
      index && menuContext.setOpen?.(index, open);
    }, delay);
  };

  const handleOnMouseEnter = (e: React.MouseEvent): void => {
    if (!disabled && mode !== 'inline') {
      e.preventDefault();
      setOpenWithDelay(true);
    }
  };

  const handleOnMouseLeave = (e: React.MouseEvent): void => {
    if (mode !== 'inline') {
      e.preventDefault();
      setOpenWithDelay(false);
    }
  };

  const handleOnClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (!disabled && mode === 'inline' && index) {
      menuContext.setOpen?.(index, !menuOpen);
    }
  };

  const onMenuItemClick = () => {
    if (mode !== 'inline') {
      setPopupOpen(false);
      index && menuContext.setOpen?.(index, false);
      // If this is a sub-subMenu, invoke the onMenuItemClick method to notify
      // its parent to close the menu popup
      _onMenuItemClick && _onMenuItemClick();
    }
  };

  const renderChildrenList = () => {
    let minWidth = undefined;
    const titleNode = titleRef.current;
    if (titleNode && !isNested) {
      const { marginLeft, marginRight } = window.getComputedStyle(titleNode);
      const horizontalMargin =
        (Number.parseFloat(marginLeft) || 0) + (Number.parseFloat(marginRight) || 0);
      minWidth = titleNode.offsetWidth + horizontalMargin;
    }
    return (
      <ul className={subMenuCls} style={{ minWidth }}>
        {React.Children.map(children, (child, idx) => {
          const childElement = child as React.FunctionComponentElement<MenuItemProps>;
          const { displayName } = childElement.type;
          const childProps = {
            index: childElement.props.index ?? `${index}-${idx}`,
          };
          if (
            displayName === 'MenuItem' ||
            displayName === 'MenuItemGroup' ||
            displayName === 'SubMenu' ||
            displayName === 'MenuDivider'
          ) {
            return React.cloneElement(childElement, childProps);
          } else {
            console.warn('Menu has a child that is not a MenuItem component.');
            return null;
          }
        })}
      </ul>
    );
  };

  if (mode === 'inline') {
    return (
      <SubMenuContext.Provider value={{ level: level + 1, ancestorKeys: childAncestorKeys }}>
        <li {...otherProps} role="menuitem" key={index} className={cls}>
          <div
            className={titleCls}
            style={{ paddingLeft: inlineIndent * level }}
            aria-expanded={menuOpen}
            onClick={handleOnClick}>
            <span className={`${menuItemCls}__main`}>
              {icon ? <span className={`${menuItemCls}__icon`}>{icon}</span> : null}
              <span className={`${menuItemCls}__label`}>{title}</span>
            </span>
            <span className={`${menuItemCls}__extra`}>
              {extra ? <span className={`${prefixCls}__extra`}>{extra}</span> : null}
              <span className={arrowCls}>
                <ArrowDown size={10} />
              </span>
            </span>
          </div>
          <CollapseTransition isShow={menuOpen}>{renderChildrenList()}</CollapseTransition>
        </li>
      </SubMenuContext.Provider>
    );
  } else {
    return (
      <SubMenuContext.Provider value={{ level: level + 1, ancestorKeys: childAncestorKeys, onMenuItemClick }}>
        <li
          {...otherProps}
          role="menuitem"
          key={index}
          className={cls}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}>
          <Popup
            flip={false}
            arrow={false}
            theme={menuContext.theme}
            className={popupCls}
            trigger="manual"
            offset={rightPopupMenu ? 0 : 4}
            visible={menuOpen}
            onVisibleChange={(visible) => {
              setPopupOpen(visible);
              index && menuContext.setOpen?.(index, visible);
            }}
            biZoom={rightPopupMenu}
            usePortal={shouldUsePortal}
            placement={rightPopupMenu ? 'right-start' : 'bottom-start'}
            content={renderChildrenList()}>
            <div ref={titleRef} className={titleCls} aria-expanded={menuOpen} onClick={handleOnClick}>
              <span className={`${menuItemCls}__main`}>
                {icon ? <span className={`${menuItemCls}__icon`}>{icon}</span> : null}
                <span className={`${menuItemCls}__label`}>{title}</span>
              </span>
              <span className={`${menuItemCls}__extra`}>
                {extra ? <span className={`${prefixCls}__extra`}>{extra}</span> : null}
                <span className={arrowCls}>
                  <ArrowDown size={10} />
                </span>
              </span>
            </div>
          </Popup>
        </li>
      </SubMenuContext.Provider>
    );
  }
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
