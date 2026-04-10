import React, { useContext, useEffect, useId, useRef, useState } from 'react';
import classNames from 'classnames';
import Transition from '../transition';
import Overlay from '../overlay';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { Close } from '../_utils/components';
import { DrawerProps } from './types';

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
  const {
    visible,
    keyboard = true,
    placement = 'right',
    size = 256,
    closable = true,
    unmountOnClose = true,
    maskType = 'default',
    maskClosable = true,
    onClose,
    prefixCls: customisedCls,
    afterClose,
    zIndex = 1000,
    header,
    footer,
    className,
    maskStyle,
    style,
    children,
  } = props;
  const [drawerVisible, setDrawerVisible] = useState(visible);
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('drawer', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, `${prefixCls}_${placement}`);
  const sty: React.CSSProperties =
    placement === 'top' || placement === 'bottom' ? { height: size } : { width: size };
  const nodeRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const bodyId = useId();

  onCloseRef.current = onClose;

  // Focus trap + Escape key
  useEffect(() => {
    if (!visible) return;
    previousFocusRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyboard && e.key === 'Escape') {
        onCloseRef.current?.(e as unknown as React.MouseEvent);
        return;
      }
      if (e.key === 'Tab' && nodeRef.current) {
        const focusable = nodeRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    requestAnimationFrame(() => {
      if (nodeRef.current) {
        const focusable = nodeRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          nodeRef.current.focus();
        }
      }
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [keyboard, visible]);

  return (
    <Overlay
      onEnter={(): void => setDrawerVisible(true)}
      onExit={(): void => setDrawerVisible(false)}
      zIndex={zIndex}
      type={maskType}
      unmountOnExit={unmountOnClose}
      isShow={visible}
      onExited={afterClose}
      clickCallback={(e: React.MouseEvent): void => {
        maskClosable && onClose ? onClose(e) : undefined;
      }}
      style={maskStyle}>
      <div ref={ref} className={cls} style={{ ...style, ...sty }}>
        <Transition
          appear={true}
          nodeRef={nodeRef}
          in={drawerVisible}
          timeout={0}
          unmountOnExit={false}
          classNames={`${prefixCls}__content_move`}>
          <div
            ref={nodeRef}
            className={`${prefixCls}__content`}
            role="dialog"
            tabIndex={-1}
            aria-modal="true"
            aria-labelledby={header ? titleId : undefined}
            aria-describedby={children ? bodyId : undefined}
            onClick={(e) => e.stopPropagation()}>
            {closable && (
              <button type="button" className={`${prefixCls}__close-btn`} onClick={onClose} aria-label="Close">
                <Close size={16} />
              </button>
            )}
            {header && <div className={`${prefixCls}__header`} id={titleId}>{header}</div>}
            <div className={`${prefixCls}__body`} id={bodyId}>{children}</div>
            {footer && <div className={`${prefixCls}__footer`}>{footer}</div>}
          </div>
        </Transition>
      </div>
    </Overlay>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
