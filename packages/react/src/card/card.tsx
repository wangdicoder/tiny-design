import React, { ReactNode, useContext } from 'react';
import classNames from 'classnames';
import { CARD_CONTENT_MARK, hasMarker } from '../_utils/component-markers';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { CardContentProps, CardProps, CardVariant } from './types';

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    variant,
    bordered = true,
    active = false,
    hoverable = false,
    prefixCls: customisedCls,
    title,
    extra,
    header,
    headerStyle,
    actions,
    footer,
    footerStyle,
    className,
    style,
    children,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('card', configContext.prefixCls, customisedCls);
  // When variant is set, it takes precedence over the legacy bordered prop
  const resolvedVariant: CardVariant | undefined = variant ?? (bordered ? 'outlined' : undefined);

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_${resolvedVariant}`]: resolvedVariant,
    [`${prefixCls}_active`]: active,
    [`${prefixCls}_hoverable`]: hoverable,
  });

  const renderHeader = (): ReactNode => {
    if (header) {
      return header;
    } else if (title || extra) {
      return (
        <div className={`${prefixCls}__header`} style={headerStyle}>
          {title}
          {extra}
        </div>
      );
    } else {
      return null;
    }
  };

  const renderFooter = (): ReactNode => {
    if (footer) {
      return footer;
    } else if (actions) {
      return (
        <div className={`${prefixCls}__footer`} style={footerStyle}>
          {actions}
        </div>
      );
    } else {
      return null;
    }
  };

  const renderChildren = (): ReactNode => {
    if (children) {
      return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        // Pass prefixCls attribute to child if it is a CardContent instance
        const childElement = child as React.FunctionComponentElement<CardContentProps>;
        if (hasMarker(childElement.type, CARD_CONTENT_MARK)) {
          const childProps: Partial<CardContentProps> = {
            prefixCls,
          };
          return React.cloneElement(childElement, childProps);
        } else {
          return child;
        }
      });
    }
    return null;
  };

  return (
    <div ref={ref} {...otherProps} className={cls} style={style}>
      {renderHeader()}
      {renderChildren()}
      {renderFooter()}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
