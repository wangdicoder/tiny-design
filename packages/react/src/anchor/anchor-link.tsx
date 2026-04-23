import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { ANCHOR_LINK_MARK, markComponent } from '../_utils/component-markers';
import { AnchorLinkProps } from './types';
import { AnchorContext } from './anchor-context';

const AnchorLink = React.forwardRef<HTMLAnchorElement, AnchorLinkProps>(
  (props: AnchorLinkProps, ref): JSX.Element => {
    const { href, title, children, prefixCls, ...otherProps } = props;
    const anchorContext = useContext(AnchorContext);

    useEffect(() => {
      anchorContext.registerLink?.(href);
      return () => anchorContext.unregisterLink?.(href);
    }, [href, anchorContext]);

    const activeHref = `#${anchorContext.activeId}`;
    const isActive = activeHref === href;

    const cls = classNames(`${prefixCls}__link`, {
      [`${prefixCls}__link_active`]: isActive,
    });

    const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const { onClick } = anchorContext;
      onClick && onClick(e, href.replace('#', ''));
    };

    return (
      <li title={title} className={cls}>
        <a
          {...otherProps}
          className={`${prefixCls}__link-title`}
          ref={ref}
          href={href}
          onClick={onLinkClick}
          target={'target' in props ? props.target : undefined}>
          {title}
        </a>
        {children && (
          <ul className={prefixCls}>
            {React.Children.map(children, (child) => (
              <AnchorLink {...child.props} prefixCls={prefixCls} />
            ))}
          </ul>
        )}
      </li>
    );
  }
);

AnchorLink.displayName = 'AnchorLink';
markComponent(AnchorLink, ANCHOR_LINK_MARK);

export default AnchorLink;
