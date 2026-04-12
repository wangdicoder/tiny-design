import { useContext } from 'react';
import classNames from 'classnames';
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

export default MenuDivider;
