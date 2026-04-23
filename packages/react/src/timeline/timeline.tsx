import React, { useContext } from 'react';
import classNames from 'classnames';
import { hasMarker, TIMELINE_ITEM_MARK } from '../_utils/component-markers';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { TimelineItemProps, TimelineProps } from './types';

const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>((props, ref) => {
  const { position = 'left', prefixCls: customisedCls, className, children, ...otherProps } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('timeline', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_${position}`]: position,
  });

  return (
    <ul {...otherProps} ref={ref} className={cls}>
      {React.Children.map(children, (child, idx) => {
        const childElement = child as React.FunctionComponentElement<TimelineItemProps>;
        if (hasMarker(childElement.type, TIMELINE_ITEM_MARK)) {
          const childProps: Partial<TimelineItemProps> = {
            className:
              position === 'center'
                ? idx % 2 === 0
                  ? `${prefixCls}-item_left`
                  : `${prefixCls}-item_right`
                : childElement.props.className,
          };
          return React.cloneElement(childElement, childProps);
        } else {
          return null;
        }
      })}
    </ul>
  );
});

Timeline.displayName = 'Timeline';

export default Timeline;
