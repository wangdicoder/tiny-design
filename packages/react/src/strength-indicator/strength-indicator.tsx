import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { StrengthIndicatorProps } from './types';

const StrengthIndicator = React.forwardRef<HTMLDivElement, StrengthIndicatorProps>(
  (props: StrengthIndicatorProps, ref): React.ReactElement => {
    const {
      current = 0,
      blocks = 3,
      colors = ['#f44336', '#ff9800', '#52c41a'],
      labels,
      className,
      prefixCls: customisedCls,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('strength-indicator', configContext.prefixCls, customisedCls);
    const cls = classNames(prefixCls, className);
    const showLabels = labels !== undefined;
    const displayLabels: React.ReactNode[] = Array.isArray(labels)
      ? labels
      : ['Weak', 'Medium', 'Strong'];

    return (
      <div {...otherProps} className={cls} ref={ref} role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={blocks}>
        {Array.from(new Array(blocks)).map((item, idx) => {
          const itemCls = classNames(`${prefixCls}__item`, {
            [`${prefixCls}__item_active`]: idx < current,
          });
          const bgColor = idx < current ? colors[current - 1] : undefined;
          return (
            <div key={idx} className={itemCls}>
              <div className={`${prefixCls}__inner`} style={{ backgroundColor: bgColor }} />
              {showLabels && (
                <div className={`${prefixCls}__label`}>{displayLabels[idx]}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

StrengthIndicator.displayName = 'StrengthIndicator';

export default StrengthIndicator;
