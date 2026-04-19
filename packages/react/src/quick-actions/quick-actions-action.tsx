import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { QuickActionsActionProps } from './types';
import { QuickActionsContext } from './quick-actions-context';

const QuickActionsAction = React.forwardRef<HTMLButtonElement, QuickActionsActionProps>(
  (props, ref): JSX.Element => {
    const {
      icon,
      label,
      description,
      danger = false,
      disabled = false,
      loading = false,
      keepOpen = false,
      className,
      style,
      prefixCls: customisedCls,
      onClick,
      ...otherProps
    } = props;

    const configContext = useContext(ConfigContext);
    const { direction, isOpen, closeOnActionClick, requestClose } = useContext(QuickActionsContext);
    const prefixCls = getPrefixCls('quick-actions', configContext.prefixCls, customisedCls);

    const cls = classNames(`${prefixCls}__action`, className, {
      [`${prefixCls}__action_disabled`]: disabled || loading,
      [`${prefixCls}__action_danger`]: danger,
      [`${prefixCls}__action_loading`]: loading,
      [`${prefixCls}__action_horizontal`]: direction === 'left' || direction === 'right',
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      onClick?.(event);

      if (!event.defaultPrevented && closeOnActionClick && !keepOpen) {
        requestClose('action-click');
      }
    };

    return (
      <div className={`${prefixCls}__action-wrapper`} data-open={isOpen ? 'true' : 'false'}>
        <button
          {...otherProps}
          ref={ref}
          className={cls}
          style={style}
          disabled={disabled || loading}
          type="button"
          tabIndex={isOpen ? 0 : -1}
          onClick={handleClick}>
          <span className={`${prefixCls}__action-icon`} aria-hidden="true">
            {loading ? <span className={`${prefixCls}__action-loader`} /> : icon}
          </span>
          <span className={`${prefixCls}__action-copy`}>
            <span className={`${prefixCls}__action-label`}>{label}</span>
            {description && (
              <span className={`${prefixCls}__action-description`}>{description}</span>
            )}
          </span>
        </button>
      </div>
    );
  }
);

QuickActionsAction.displayName = 'QuickActions.Action';

export default QuickActionsAction;
