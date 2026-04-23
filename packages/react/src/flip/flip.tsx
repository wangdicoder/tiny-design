import React, { useContext } from 'react';
import classNames from 'classnames';
import { FLIP_ITEM_MARK, hasMarker } from '../_utils/component-markers';
import warning from '../_utils/warning';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { FlipItemProps, FlipProps } from './types';

const Flip = (props: FlipProps): React.ReactElement => {
  const {
    direction = 'horizontal',
    reverse = false,
    prefixCls: customisedCls,
    width,
    height,
    className,
    children,
    style,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('flip', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);

  const innerCls = classNames(`${prefixCls}__inner`, {
    [`${prefixCls}__inner_hor`]: direction === 'horizontal' && !reverse,
    [`${prefixCls}__inner_hor_reverse`]: direction === 'horizontal' && reverse,
    [`${prefixCls}__inner_ver`]: direction === 'vertical' && !reverse,
    [`${prefixCls}__inner_ver_reverse`]: direction === 'vertical' && reverse,
  });

  warning(
    !children || React.Children.count(children) !== 2,
    'Children must contain front and back components.',
    true
  );

  return (
    <div {...otherProps} className={cls} style={{ width, height, ...style }}>
      <div className={innerCls}>
        {React.Children.map(children, (child, index: number) => {
          const childElement = child as React.FunctionComponentElement<FlipItemProps>;
          if (hasMarker(childElement.type, FLIP_ITEM_MARK)) {
            const childProps: Partial<FlipItemProps> = {
              className: classNames(
                {
                  [`${prefixCls}__item-front`]: index === 0,
                  [`${prefixCls}__item-back`]: index === 1,
                  [`${prefixCls}__item-back_hor`]:
                    index === 1 && direction === 'horizontal' && !reverse,
                  [`${prefixCls}__item-back_hor_reverse`]:
                    index === 1 && direction === 'horizontal' && reverse,
                  [`${prefixCls}__item-back_ver`]:
                    index === 1 && direction === 'vertical' && !reverse,
                  [`${prefixCls}__item-back_ver_reverse`]:
                    index === 1 && direction === 'vertical' && reverse,
                },
                child.props.className
              ),
            };
            return React.cloneElement(childElement, childProps);
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

Flip.displayName = 'Flip';

export default Flip;
