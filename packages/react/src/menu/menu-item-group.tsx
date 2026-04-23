import React, { useContext } from 'react';
import classNames from 'classnames';
import { hasMarker, markComponent, MENU_ITEM_GROUP_MARK, MENU_ITEM_MARK } from '../_utils/component-markers';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { MenuItemGroupProps, MenuItemProps } from './types';
import { MenuContext } from './menu-context';
import { SubMenuContext } from './sub-menu-context';

const MenuItemGroup = (props: MenuItemGroupProps): JSX.Element => {
  const {
    index,
    title,
    className,
    style,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const { inlineIndent, mode } = useContext(MenuContext);
  const { level = 1 } = useContext(SubMenuContext);
  const prefixCls = getPrefixCls('menu-item-group', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_popup`]: mode !== 'inline',
  });

  return (
    <li {...otherProps} key={index} className={cls} style={style}>
      <div
        className={`${prefixCls}__title`}
        style={mode === 'inline'
          ? {
              paddingLeft: inlineIndent * level - inlineIndent / 2,
            }
          : undefined}>
        {title}
      </div>
      <ul className={`${prefixCls}__list`}>
        {React.Children.map(children, (child, idx) => {
          const childElement = child as React.FunctionComponentElement<MenuItemProps>;
          if (hasMarker(childElement.type, MENU_ITEM_MARK)) {
            const popupGroupedStyle = mode !== 'inline'
              ? {
                  paddingLeft: 44,
                  paddingInlineStart: 44,
                  ...childElement.props.style,
                }
              : childElement.props.style;
            const childProps: Partial<MenuItemProps> = {
              index: childElement.props.index ?? `${index}-${idx}`,
              className: classNames(childElement.props.className, {
                'ty-menu-item_grouped-popup': mode !== 'inline',
              }),
              style: popupGroupedStyle,
            };
            return React.cloneElement(childElement, childProps);
          } else {
            console.warn('Menu has a child that is not a MenuItem component.');
            return null;
          }
        })}
      </ul>
    </li>
  );
};

MenuItemGroup.displayName = 'MenuItemGroup';
markComponent(MenuItemGroup, MENU_ITEM_GROUP_MARK);

export default MenuItemGroup;
