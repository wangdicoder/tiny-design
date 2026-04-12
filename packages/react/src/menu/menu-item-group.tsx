import React, { useContext } from 'react';
import classNames from 'classnames';
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
  const { inlineIndent } = useContext(MenuContext);
  const { level = 1 } = useContext(SubMenuContext);
  const prefixCls = getPrefixCls('menu-item-group', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);

  return (
    <li {...otherProps} key={index} className={cls} style={style}>
      <div
        className={`${prefixCls}__title`}
        style={{
          paddingLeft: inlineIndent * level - inlineIndent / 2,
        }}>
        {title}
      </div>
      <ul className={`${prefixCls}__list`}>
        {React.Children.map(children, (child, idx) => {
          const childElement = child as React.FunctionComponentElement<MenuItemProps>;
          if (childElement.type.displayName === 'MenuItem') {
            const childProps: Partial<MenuItemProps> = {
              index: childElement.props.index ?? `${index}-${idx}`,
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

export default MenuItemGroup;
