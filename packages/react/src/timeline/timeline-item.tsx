import React, { useContext } from 'react';
import classNames from 'classnames';
import { markComponent, TIMELINE_ITEM_MARK } from '../_utils/component-markers';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { TimelineItemProps } from './types';

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>((props, ref) => {
  const { dot, dotStyle, className, children, prefixCls: customisedCls, ...otherProps } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('timeline-item', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);

  return (
    <li {...otherProps} ref={ref} className={cls}>
      <div className={`${prefixCls}__head`}>
        <div className={`${prefixCls}__dot-container`}>
          {dot || <span className={`${prefixCls}__dot`} style={dotStyle} />}
        </div>
      </div>
      <div className={`${prefixCls}__content`}>{children}</div>
    </li>
  );
});

TimelineItem.displayName = 'TimelineItem';
markComponent(TimelineItem, TIMELINE_ITEM_MARK);

export default TimelineItem;
