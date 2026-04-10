import React, { useContext } from 'react';
import classNames from 'classnames';
import Popup from '../popup';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { TooltipProps } from './types';

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const {
    trigger = 'hover',
    prefixCls: customisedCls,
    title,
    className,
    children,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('tooltip', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);

  const renderContent = (): React.ReactElement => (
    <div ref={ref} role="tooltip" className={`${prefixCls}__inner`}>
      {title}
    </div>
  );

  return (
    <Popup {...otherProps} className={cls} theme="dark" trigger={trigger} content={renderContent()}>
      {children}
    </Popup>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
