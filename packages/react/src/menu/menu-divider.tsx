import { useContext } from 'react';
import classNames from 'classnames';
import { markComponent, MENU_DIVIDER_MARK } from '../_utils/component-markers';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { BaseProps } from '../_utils/props';

const MenuDivider = (props: BaseProps): JSX.Element => {
  const { prefixCls: customisedCls, className } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('menu-divider', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);

  return <li role="separator" className={cls} />;
};

MenuDivider.displayName = 'MenuDivider';
markComponent(MenuDivider, MENU_DIVIDER_MARK);

export default MenuDivider;
