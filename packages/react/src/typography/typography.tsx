import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { TypographyProps } from './types';

const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  (props: TypographyProps, ref): JSX.Element => {
    const { className, children, prefixCls: customisedCls, ...otherProps } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('typography', configContext.prefixCls, customisedCls);
    const cls = classNames(className, prefixCls);
    return (
      <div ref={ref} className={cls} {...otherProps}>
        {children}
      </div>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;
