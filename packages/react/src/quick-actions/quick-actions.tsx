import React, { useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { useClickOutside } from '../_utils/hooks';
import { QuickActionsOpenChangeContext, QuickActionsOpenSource, QuickActionsProps } from './types';
import { QuickActionsContext } from './quick-actions-context';

const ARROW_KEYS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

const QuickActions = React.forwardRef<HTMLDivElement, QuickActionsProps>(
  (props, ref): JSX.Element => {
    const {
      icon,
      openIcon,
      label = 'Quick actions',
      direction = 'up',
      trigger = 'click',
      open,
      defaultOpen = false,
      closeOnActionClick = true,
      disabled = false,
      className,
      style,
      children,
      prefixCls: customisedCls,
      onOpenChange,
      ...otherProps
    } = props;

    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('quick-actions', configContext.prefixCls, customisedCls);

    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const hoverCloseTimerRef = useRef<number | null>(null);
    const keyboardFocusRef = useRef(false);
    const panelId = useId();

    const clearHoverCloseTimer = useCallback(() => {
      if (hoverCloseTimerRef.current !== null) {
        window.clearTimeout(hoverCloseTimerRef.current);
        hoverCloseTimerRef.current = null;
      }
    }, []);

    useEffect(() => clearHoverCloseTimer, [clearHoverCloseTimer]);

    const setOpenState = useCallback(
      (nextOpen: boolean, context: QuickActionsOpenChangeContext) => {
        if (disabled && nextOpen) return;
        if (nextOpen === isOpen) return;

        if (!isControlled) {
          setInternalOpen(nextOpen);
        }

        onOpenChange?.(nextOpen, context);
      },
      [disabled, isControlled, isOpen, onOpenChange]
    );

    const openActions = useCallback(
      (source: QuickActionsOpenSource) => {
        setOpenState(true, { source });
      },
      [setOpenState]
    );

    const closeActions = useCallback(
      (source: QuickActionsOpenSource) => {
        setOpenState(false, { source });
      },
      [setOpenState]
    );

    const focusFirstAction = useCallback(() => {
      window.setTimeout(() => {
        const firstAction = containerRef.current?.querySelector<HTMLButtonElement>(
          `.${prefixCls}__action:not(:disabled)`
        );
        firstAction?.focus();
      }, 0);
    }, [prefixCls]);

    useClickOutside(containerRef, () => {
      if (isOpen) {
        closeActions('outside');
      }
    });

    const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (trigger === 'click') {
        if (isOpen) {
          closeActions('trigger-click');
        } else {
          openActions('trigger-click');
        }
      }

      e.stopPropagation();
    };

    const handleMouseEnter = () => {
      clearHoverCloseTimer();
      keyboardFocusRef.current = false;

      if (trigger === 'hover' && !disabled) {
        openActions('trigger-hover');
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (trigger !== 'hover') return;

      const nextTarget = e.relatedTarget;
      if (nextTarget instanceof Node && containerRef.current?.contains(nextTarget)) {
        return;
      }

      clearHoverCloseTimer();
      hoverCloseTimerRef.current = window.setTimeout(() => {
        closeActions('trigger-hover');
      }, 120);
    };

    const handleFocusCapture = () => {
      clearHoverCloseTimer();

      if (trigger === 'hover' && !disabled && keyboardFocusRef.current) {
        openActions('focus');
      }
    };

    const handleBlurCapture = (e: React.FocusEvent<HTMLDivElement>) => {
      if (trigger !== 'hover') return;

      const nextTarget = e.relatedTarget as Node | null;
      if (!nextTarget || !containerRef.current?.contains(nextTarget)) {
        closeActions('focus');
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      keyboardFocusRef.current = true;

      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closeActions('escape');
        triggerRef.current?.focus();
        return;
      }

      const isArrowKey = ARROW_KEYS.has(e.key);
      if (
        isArrowKey &&
        !disabled &&
        e.target === triggerRef.current &&
        (trigger === 'click' || trigger === 'hover')
      ) {
        e.preventDefault();
        if (!isOpen) {
          openActions(trigger === 'hover' ? 'focus' : 'trigger-click');
        }
        focusFirstAction();
      }
    };

    const cls = classNames(prefixCls, className, `${prefixCls}_${direction}`, {
      [`${prefixCls}_open`]: isOpen,
      [`${prefixCls}_disabled`]: disabled,
    });

    const buttonCls = classNames(`${prefixCls}__button`, {
      [`${prefixCls}__button_open`]: isOpen,
      [`${prefixCls}__button_disabled`]: disabled,
    });

    const actionsCls = classNames(`${prefixCls}__actions`, {
      [`${prefixCls}__actions_open`]: isOpen,
    });

    const contextValue = useMemo(
      () => ({
        direction,
        isOpen,
        closeOnActionClick,
        requestClose: closeActions,
      }),
      [closeActions, closeOnActionClick, direction, isOpen]
    );

    const renderIcon = () => {
      if (isOpen && openIcon) return openIcon;
      if (icon) return icon;
      return <span className={`${prefixCls}__icon-default`} aria-hidden="true" />;
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => {
          keyboardFocusRef.current = false;
        }}
        onFocusCapture={handleFocusCapture}
        onBlurCapture={handleBlurCapture}
        onKeyDown={handleKeyDown}>
        <button
          ref={triggerRef}
          className={buttonCls}
          type="button"
          onClick={handleTriggerClick}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={label}
          aria-haspopup="true">
          {renderIcon()}
        </button>
        <QuickActionsContext.Provider value={contextValue}>
          <div
            id={panelId}
            className={actionsCls}
            role="group"
            aria-label={`${label} actions`}
            aria-hidden={!isOpen}>
            {children}
          </div>
        </QuickActionsContext.Provider>
      </div>
    );
  }
);

QuickActions.displayName = 'QuickActions';

export default QuickActions;
