import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { QuickActionsActionProps } from './types';
import { QuickActionsContext } from './quick-actions-context';

const getDefaultTooltipPlacement = (direction: string): 'left' | 'right' | 'top' | 'bottom' => {
  if (direction === 'left' || direction === 'right') return 'top';
  return 'left';
};

const QuickActionsAction = React.forwardRef<HTMLButtonElement, QuickActionsActionProps>(
  (props, ref): JSX.Element => {
    const {
      icon,
      tooltip,
      tooltipPlacement,
      disabled = false,
      className,
      style,
      prefixCls: customisedCls,
      ...otherProps
    } = props;

    const configContext = useContext(ConfigContext);
    const { direction } = useContext(QuickActionsContext);
    const prefixCls = getPrefixCls('quick-actions', configContext.prefixCls, customisedCls);
    const placement = tooltipPlacement || getDefaultTooltipPlacement(direction);

    const cls = classNames(`${prefixCls}__action`, className, {
      [`${prefixCls}__action_disabled`]: disabled,
    });

    const tooltipCls = classNames(
      `${prefixCls}__action-tooltip`,
      `${prefixCls}__action-tooltip_${placement}`
    );

    return (
      <div className={`${prefixCls}__action-wrapper`}>
        <button
          {...otherProps}
          ref={ref}
          className={cls}
          style={style}
          disabled={disabled}
          type="button"
        >
          {icon}
        </button>
        {tooltip && <span className={tooltipCls}>{tooltip}</span>}
      </div>
    );
  }
);

QuickActionsAction.displayName = 'QuickActions.Action';

export default QuickActionsAction;
