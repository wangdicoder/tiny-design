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
    className,
    overlayClassName,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const menuContext = useContext(MenuContext);
  const { mode, inlineIndent } = menuContext;
  const { level = 1, onMenuItemClick: _onMenuItemClick } = useContext(SubMenuContext);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('menu-sub', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);
  const subMenuCls = classNames(`${prefixCls}__list`, {
    [`${prefixCls}__list_open`]: menuOpen,
    [`${prefixCls}__list_popup`]: mode !== 'inline',
  });
  const nonRootSubMenu = index?.includes('-');
  const rightPopupMenu = mode === 'vertical' || (mode === 'horizontal' && nonRootSubMenu);
  const arrowCls = rightPopupMenu
    ? `${prefixCls}__arrow ${prefixCls}__arrow_right`
    : classNames(`${prefixCls}__arrow`, {
        [`${prefixCls}__arrow_reverse`]: menuOpen,
      });
  const menuItemCls = `${configContext.prefixCls ? configContext.prefixCls : 'ty'}-menu-item`;
  const titleCls = classNames(menuItemCls, `${prefixCls}__title`, {
    [`${menuItemCls}_disabled`]: disabled,
    [`${menuItemCls}_active`]: index ? menuContext.index.startsWith(index) : false,
  });
  const titleRef = useRef<HTMLDivElement | null>(null);

  const handleOnClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    !disabled && mode === 'inline' && setMenuOpen(!menuOpen);
  };

  const timerRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleMouse = (e: React.MouseEvent, toggle: boolean): void => {
    e.preventDefault();
    const timer = timerRef.current;
    timer && window.clearTimeout(timer);
    timerRef.current = window.setTimeout(() => {
      setMenuOpen(toggle);
    }, 200);
  };

  const handleOnMouseEnter = (e: React.MouseEvent): void => {
    !disabled && mode !== 'inline' && handleMouse(e, true);
  };

  const handleOnMouseLeave = (e: React.MouseEvent): void => {
    mode !== 'inline' && handleMouse(e, false);
  };

  const onMenuItemClick = () => {
    if (mode !== 'inline') {
      setMenuOpen(false);
      // If this is a sub-subMenu, invoke the onMenuItemClick method to notify
      // its parent to close the menu popup
      _onMenuItemClick && _onMenuItemClick();
    }
  };

  const renderChildrenList = () => {
    let minWidth = undefined;
    const titleNode = titleRef.current;
    if (titleNode && !nonRootSubMenu) {
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
            index: `${index}-${idx}`,
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
      <SubMenuContext.Provider value={{ level: level + 1 }}>
        <li {...otherProps} role="menuitem" key={index} className={cls}>
          <div
            className={titleCls}
            style={{ paddingLeft: inlineIndent * level }}
            onClick={handleOnClick}>
            <span>{title}</span>
            <span className={arrowCls}>
              <ArrowDown size={10} />
            </span>
          </div>
          <CollapseTransition isShow={menuOpen}>{renderChildrenList()}</CollapseTransition>
        </li>
      </SubMenuContext.Provider>
    );
  } else {
    return (
      <SubMenuContext.Provider value={{ onMenuItemClick }}>
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
            className={overlayClassName}
            trigger="manual"
            visible={menuOpen}
            onVisibleChange={setMenuOpen}
            biZoom={rightPopupMenu}
            placement={rightPopupMenu ? 'right-start' : 'bottom-start'}
            content={renderChildrenList()}>
            <div ref={titleRef} className={titleCls} onClick={handleOnClick}>
              <span>{title}</span>
              <span className={arrowCls}>
                <ArrowDown size={10} />
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
