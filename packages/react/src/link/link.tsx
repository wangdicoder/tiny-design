import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { LinkProps } from './types';

const Link = React.memo(
  React.forwardRef<HTMLAnchorElement | HTMLSpanElement, LinkProps>((props, ref): React.ReactElement => {
    const {
      disabled = false,
      external = true,
      underline = true,
      className,
      style,
      children,
      target,
      prefixCls: customisedCls,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('link', configContext.prefixCls, customisedCls);
    const cls = classNames(prefixCls, className, {
      [`${prefixCls}_disabled`]: disabled,
      [`${prefixCls}_no-underline`]: !underline,
    });

    if (disabled) {
      return (
        <span ref={ref as React.Ref<HTMLSpanElement>} className={cls} style={style} role="link" aria-disabled="true">
          <span>{children}</span>
        </span>
      );
    }

    return (
      <a
        {...otherProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
        target={target ? target : external ? '_blank' : '_self'}
        className={cls}
        style={style}
        role="link">
        <span>{children}</span>
      </a>
    );
  })
);

Link.displayName = 'Link';

export default Link;
