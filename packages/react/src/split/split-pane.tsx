import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { SplitPaneProps } from './types';

const SplitPane = React.forwardRef<HTMLDivElement, SplitPaneProps>((props, ref): JSX.Element => {
  const { className, prefixCls: customisedCls, children, ...otherProps } = props;
  delete (otherProps as Partial<SplitPaneProps>).min;
  delete (otherProps as Partial<SplitPaneProps>).max;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('split-pane', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);

  return (
    <div ref={ref} {...otherProps} className={cls}>
      {children}
    </div>
  );
});

SplitPane.displayName = 'SplitPane';

export default SplitPane;
