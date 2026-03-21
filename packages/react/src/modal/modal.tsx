import React, { useContext, useEffect, useId, useRef, useState } from 'react';
import classNames from 'classnames';
import Transition from '../transition';
import Overlay from '../overlay';
import Button from '../button/button';
import Flex from '../flex/flex';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { useLocale } from '../_utils/use-locale';
import { ModalProps } from './types';

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const locale = useLocale();
  const {
    visible = false,
    width = 520,
    centered = false,
    closable = true,
    unmountOnClose = true,
    maskType = 'default',
    maskClosable = true,
    confirmText = locale.Modal.okText,
    cancelText = locale.Modal.cancelText,
    confirmLoading = false,
    animation = 'slide',
    zIndex = 1000,
    onConfirm,
    onCancel: onCancelProp,
    onClose: onCloseProp,
    top,
    header,
    footer,
    afterClose,
    confirmButtonProps,
    cancelButtonProps,
    className,
    children,
    style,
    maskStyle,
    headerStyle,
    bodyStyle,
    footerStyle,
    prefixCls: customisedCls,
  } = props;
  const onCancel = onCloseProp ?? onCancelProp;
  const [modalVisible, setModalVisible] = useState(visible);
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('modal', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, { [`${prefixCls}_centered`]: centered });
  const nodeRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // Focus trap + Escape key
  useEffect(() => {
    if (!visible) return;
    previousFocusRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel?.(e as unknown as React.MouseEvent);
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

    // Focus first focusable element
    requestAnimationFrame(() => {
      if (nodeRef.current) {
        const focusable = nodeRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) focusable[0].focus();
      }
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [visible, onCancel]);

  const renderFooter = (): React.ReactNode => {
    if (React.isValidElement(footer)) {
      return footer;
    } else if (footer === null) {
      return null;
    } else {
      return (
        <Flex gap="sm" justify='end' className={`${prefixCls}__footer`} style={footerStyle}>
          <Button onClick={onCancel} className={`${prefixCls}__footer-btn`} {...cancelButtonProps}>
            {cancelText}
          </Button>
          <Button
            loading={confirmLoading}
            onClick={onConfirm}
            btnType="primary"
            className={`${prefixCls}__footer-btn`}
            {...confirmButtonProps}>
            {confirmText}
          </Button>
        </Flex>
      );
    }
  };

  return (
    <Overlay
      onEnter={(): void => setModalVisible(true)}
      onExit={(): void => setModalVisible(false)}
      zIndex={zIndex}
      type={maskType}
      unmountOnExit={unmountOnClose}
      isShow={visible}
      onExited={afterClose}
      clickCallback={(e: React.MouseEvent): void => {
        maskClosable && onCancel ? onCancel(e) : undefined;
      }}
      style={maskStyle}>
      <div ref={ref} className={cls} style={{ top }}>
        <div style={{ width, ...style }}>
          <Transition
            appear={true}
            nodeRef={nodeRef}
            in={modalVisible}
            classNames={`${prefixCls}__content_${animation}`}
            unmountOnExit={false}
            timeout={0}>
            <div
              ref={nodeRef}
              className={`${prefixCls}__content`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={header ? titleId : undefined}
              onClick={(e): void => e.stopPropagation()}>
              {closable && (
                <button type="button" className={`${prefixCls}__close-btn`} onClick={onCancel} aria-label="Close">
                  ✕
                </button>
              )}
              {header && (
                <div className={`${prefixCls}__header`} style={headerStyle}>
                  <div className={`${prefixCls}__title`} id={titleId}>{header}</div>
                </div>
              )}
              <div className={`${prefixCls}__body`} style={bodyStyle}>
                {children}
              </div>
              {renderFooter()}
            </div>
          </Transition>
        </div>
      </div>
    </Overlay>
  );
});

Modal.displayName = 'Modal';

export default Modal;
