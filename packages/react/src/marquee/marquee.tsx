import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { MarqueeProps } from './types';

const Marquee = React.memo(
  React.forwardRef<HTMLDivElement, MarqueeProps>((props, ref) => {
    const {
      direction = 'left',
      duration = 50,
      pauseOnHover = true,
      gap = 16,
      fade = false,
      infinite = true,
      prefixCls: customisedCls,
      className,
      style,
      children,
      ...otherProps
    } = props;

    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('marquee', configContext.prefixCls, customisedCls);

    const cls = classNames(
      prefixCls,
      {
        [`${prefixCls}_fade`]: fade,
      },
      className
    );

    const trackCls = classNames(`${prefixCls}__track`, {
      [`${prefixCls}__track_reverse`]: direction === 'right',
      [`${prefixCls}__track_pause-on-hover`]: pauseOnHover,
      [`${prefixCls}__track_once`]: !infinite,
    });

    const trackStyle: React.CSSProperties = {
      '--ty-marquee-duration': `${duration}s`,
      '--ty-marquee-gap': `${gap}px`,
    } as React.CSSProperties;

    const items = useMemo(() => {
      const childArray = React.Children.toArray(children);
      if (!infinite) return childArray;
      const cloned = childArray.map((child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { key: `${child.key}-dup` })
          : child
      );
      return [...childArray, ...cloned];
    }, [children, infinite]);

    return (
      <div {...otherProps} ref={ref} className={cls} style={style}>
        <div className={trackCls} style={trackStyle}>
          {items}
        </div>
      </div>
    );
  })
);

Marquee.displayName = 'Marquee';

export default Marquee;
