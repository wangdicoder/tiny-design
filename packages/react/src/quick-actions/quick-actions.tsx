import React, { useCallback, useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { useClickOutside } from '../_utils/hooks';
import { QuickActionsProps } from './types';
import { QuickActionsContext } from './quick-actions-context';

const QuickActions = React.forwardRef<HTMLDivElement, QuickActionsProps>(
  (props, ref): JSX.Element => {
    const {
      icon,
      openIcon,
      direction = 'up',
      open,
      trigger = 'hover',
      onOpen,
      onClose,
      disabled = false,
      className,
      style,
      children,
      prefixCls: customisedCls,
      ...otherProps
    } = props;

    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('quick-actions', configContext.prefixCls, customisedCls);

    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleOpen = useCallback(() => {
      if (disabled || isOpen) return;
      if (!isControlled) setInternalOpen(true);
      onOpen?.();
    }, [disabled, isControlled, isOpen, onOpen]);

    const handleClose = useCallback(() => {
      if (!isOpen) return;
      if (!isControlled) setInternalOpen(false);
      onClose?.();
    }, [isControlled, isOpen, onClose]);

    const handleToggle = useCallback(() => {
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }, [isOpen, handleOpen, handleClose]);

    useClickOutside(containerRef, () => {
      if (trigger === 'click' && isOpen) {
        handleClose();
      }
    });

    const cls = classNames(prefixCls, className, `${prefixCls}_${direction}`);

    const buttonCls = classNames(`${prefixCls}__button`, {
      [`${prefixCls}__button_open`]: isOpen,
      [`${prefixCls}__button_disabled`]: disabled,
    });

    const actionsCls = classNames(`${prefixCls}__actions`, {
      [`${prefixCls}__actions_open`]: isOpen,
    });

    const hoverProps =
      trigger === 'hover' && !disabled
        ? { onMouseEnter: handleOpen, onMouseLeave: handleClose }
        : {};

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (trigger === 'click') {
        handleToggle();
      }
      // Stop propagation so useClickOutside doesn't immediately close
      e.stopPropagation();
    };

    const renderIcon = () => {
      if (isOpen && openIcon) return openIcon;
      if (icon) return icon;
      return <span className={`${prefixCls}__icon-default`} />;
    };

    return (
      <div
        {...otherProps}
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cls}
        style={style}
        {...hoverProps}
      >
        <button
          className={buttonCls}
          type="button"
          onClick={handleButtonClick}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-label="QuickActions"
        >
          {renderIcon()}
        </button>
        <QuickActionsContext.Provider value={{ direction }}>
          <div className={actionsCls} role="menu">
            {children}
          </div>
        </QuickActionsContext.Provider>
      </div>
    );
  }
);

QuickActions.displayName = 'QuickActions';

export default QuickActions;
