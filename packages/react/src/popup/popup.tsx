import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { createPopper, Instance } from '@popperjs/core';
import Transition, { AnimationName } from '../transition';
import Portal from '../portal';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { Placement, PopupProps } from './types';

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null): void {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  (ref as React.MutableRefObject<T | null>).current = value;
}

const Popup = (props: PopupProps): JSX.Element => {
  const {
    disabled = false,
    trigger = 'click',
    placement = 'top',
    defaultVisible = false,
    arrow = true,
    flip = true,
    offset = 0,
    theme = 'light',
    usePortal = true,
    mouseEnterDelay = 100,
    mouseLeaveDelay = 100,
    biZoom = true,
    prefixCls: customisedCls,
    content,
    visible,
    onVisibleChange,
    className,
    children,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('popup', configContext.prefixCls, customisedCls);
  const cls = classNames(
    className,
    prefixCls,
    `${prefixCls}_${placement}`,
    `${prefixCls}_${theme}`
  );
  const isControlled = 'visible' in props;
  const [uncontrolledVisible, setUncontrolledVisible] = useState(defaultVisible);
  const popupVisible = isControlled ? !!visible : uncontrolledVisible;
  const targetRef = useRef<HTMLElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const delayDisplayPopupTimer = useRef<number | undefined>(undefined);
  const delayHidePopupTimer = useRef<number | undefined>(undefined);
  const popperRef = useRef<Instance | undefined>(undefined);
  const isDocumentClickListening = useRef(false);
  const elementProps = {
    ref: (ref: HTMLElement | null) => {
      targetRef.current = ref;
      assignRef((children as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref, ref);
    },
  };

  const clearTimers = useCallback((): void => {
    window.clearTimeout(delayDisplayPopupTimer.current);
    window.clearTimeout(delayHidePopupTimer.current);
  }, []);

  const setPopupVisibleState = useCallback(
    (nextVisible: boolean): void => {
      if (!isControlled) {
        setUncontrolledVisible(nextVisible);
      }
      onVisibleChange && onVisibleChange(nextVisible);
    },
    [isControlled, onVisibleChange]
  );

  const displayPopup = useCallback(() => {
    if (popupVisible) {
      return;
    }

    setPopupVisibleState(true);
  }, [popupVisible, setPopupVisibleState]);

  const hidePopup = useCallback(() => {
    if (!popupVisible) return;

    setPopupVisibleState(false);
  }, [popupVisible, setPopupVisibleState]);

  const delayDisplayPopup = useCallback((): void => {
    clearTimers();
    delayDisplayPopupTimer.current = window.setTimeout(() => {
      displayPopup();
    }, mouseEnterDelay);
  }, [clearTimers, mouseEnterDelay, displayPopup]);

  const delayHidePopup = useCallback((): void => {
    clearTimers();
    delayHidePopupTimer.current = window.setTimeout(() => {
      hidePopup();
    }, mouseLeaveDelay);
  }, [clearTimers, mouseLeaveDelay, hidePopup]);

  const handlePopupOnMouseEnter = (): void => {
    if (trigger === 'hover') {
      displayPopup();
      window.clearTimeout(delayHidePopupTimer.current);
    }
  };

  const handlePopupOnMouseLeave = (): void => {
    if (trigger === 'hover') {
      delayHidePopup();
      window.clearTimeout(delayDisplayPopupTimer.current);
    }
  };

  const handleTargetOnMouseEnter = useCallback((): void => {
    delayDisplayPopup();
    window.clearTimeout(delayHidePopupTimer.current);
  }, [delayDisplayPopup]);

  const handleTargetOnMouseLeave = useCallback((): void => {
    delayHidePopup();
    window.clearTimeout(delayDisplayPopupTimer.current);
  }, [delayHidePopup]);

  const documentOnClick = useCallback(
    (e: Event): void => {
      const target = targetRef.current;
      const popup = popupRef.current;
      if (
        !target ||
        target.contains(e.target as HTMLElement) ||
        !popup ||
        popup.contains(e.target as HTMLElement)
      )
        return;

      hidePopup();
    },
    [hidePopup]
  );

  const removeDocumentClickListener = useCallback((): void => {
    if (!isDocumentClickListening.current) {
      return;
    }

    document.removeEventListener('click', documentOnClick, true);
    isDocumentClickListening.current = false;
  }, [documentOnClick]);

  useEffect(() => {
    removeDocumentClickListener();
    if ((trigger === 'click' || trigger === 'contextmenu' || trigger === 'manual') && popupVisible) {
      document.addEventListener('click', documentOnClick, true);
      isDocumentClickListening.current = true;
    }

    return () => {
      removeDocumentClickListener();
    };
  }, [documentOnClick, popupVisible, removeDocumentClickListener, trigger]);

  const handleTargetOnMouseClick = useCallback(
    (e: MouseEvent): void => {
      if (trigger === 'contextmenu') {
        e.preventDefault();
      }

      if (popupVisible) {
        hidePopup();
      } else {
        displayPopup();
      }
    },
    [displayPopup, hidePopup, popupVisible, trigger]
  );

  const transitionOnEnter = (): void => {
    if (!targetRef.current || !popupRef.current) {
      return;
    }

    popperRef.current?.destroy();
    const instance = createPopper(
      targetRef.current as HTMLElement,
      popupRef.current as HTMLElement,
      {
        placement: placement as Placement,
        modifiers: [
          {
            name: 'flip',
            enabled: flip,
          },
          {
            name: 'offset',
            options: {
              offset: [0, arrow ? 10 + offset : 3 + offset],
            },
          },
          {
            name: 'computeStyles',
            options: {
              gpuAcceleration: false,
              adaptive: false,
            },
          },
        ],
      }
    );
    if (trigger === 'hover') {
      instance.state.elements.popper.addEventListener('mouseenter', handlePopupOnMouseEnter);
      instance.state.elements.popper.addEventListener('mouseleave', handlePopupOnMouseLeave);
    }
    popperRef.current = instance;
  };

  const transitionOnExited = (): void => {
    const popperInstance = popperRef.current;
    if (popperInstance) {
      if (trigger === 'hover') {
        popperInstance.state.elements.popper.removeEventListener(
          'mouseenter',
          handlePopupOnMouseEnter
        );
        popperInstance.state.elements.popper.removeEventListener(
          'mouseleave',
          handlePopupOnMouseLeave
        );
      }
      popperInstance.destroy();
      popperRef.current = undefined;
    }
  };

  const getAnimationName = () => {
    const mapping = {
      'top-start': biZoom ? 'top-start' : 'center-top',
      top: biZoom ? 'top' : 'center-top',
      'top-end': biZoom ? 'top-end' : 'center-top',
      'bottom-start': biZoom ? 'bottom-start' : 'center-bottom',
      bottom: biZoom ? 'bottom' : 'center-bottom',
      'bottom-end': biZoom ? 'bottom-end' : 'center-bottom',
      'left-start': biZoom ? 'bottom-end' : 'center-left',
      left: biZoom ? 'left' : 'center-left',
      'left-end': biZoom ? 'top-end' : 'center-left',
      'right-start': biZoom ? 'bottom-start' : 'center-right',
      right: biZoom ? 'right' : 'center-right',
      'right-end': biZoom ? 'top-start' : 'center-right',
    };
    return `zoom-${mapping[placement]}` as AnimationName;
  };

  useEffect(() => {
    if (disabled) return;

    const target = targetRef.current;
    if (!target) return;

    if (trigger === 'hover') {
      target.addEventListener('mouseenter', handleTargetOnMouseEnter);
      target.addEventListener('mouseleave', handleTargetOnMouseLeave);
    } else if (trigger === 'click') {
      target.addEventListener('click', handleTargetOnMouseClick);
    } else if (trigger === 'focus') {
      if (target.nodeName === 'INPUT' || target.nodeName === 'TEXTAREA') {
        target.addEventListener('focus', displayPopup);
        target.addEventListener('blur', hidePopup);
      } else {
        target.addEventListener('mousedown', displayPopup);
        target.addEventListener('mouseup', hidePopup);
        target.addEventListener('touchstart', displayPopup);
        target.addEventListener('touchend', hidePopup);
      }
    } else if (trigger === 'contextmenu') {
      target.addEventListener('contextmenu', handleTargetOnMouseClick);
    }

    return (): void => {
      target.removeEventListener('mouseenter', handleTargetOnMouseEnter);
      target.removeEventListener('mouseleave', handleTargetOnMouseLeave);
      target.removeEventListener('click', handleTargetOnMouseClick);
      target.removeEventListener('focus', displayPopup);
      target.removeEventListener('blur', hidePopup);
      target.removeEventListener('mousedown', displayPopup);
      target.removeEventListener('mouseup', hidePopup);
      target.removeEventListener('touchstart', displayPopup);
      target.removeEventListener('touchend', hidePopup);
      target.removeEventListener('contextmenu', handleTargetOnMouseClick);
    };
  }, [
    disabled,
    trigger,
    handleTargetOnMouseClick,
    handleTargetOnMouseEnter,
    handleTargetOnMouseLeave,
    displayPopup,
    hidePopup,
  ]);

  useEffect(() => {
    if (!popupVisible) {
      clearTimers();
    }
  }, [clearTimers, popupVisible]);

  useEffect(() => {
    return () => {
      clearTimers();
      removeDocumentClickListener();
      popperRef.current?.destroy();
      popperRef.current = undefined;
    };
  }, [clearTimers, removeDocumentClickListener]);

  const renderContent = () => (
    <Transition
      in={popupVisible}
      nodeRef={popupRef}
      onEnter={transitionOnEnter}
      onExited={transitionOnExited}
      animation={getAnimationName()}>
      <div {...otherProps} className={cls} ref={popupRef}>
        {content && arrow && <div data-popper-arrow className={`${prefixCls}__arrow`} />}
        {content}
      </div>
    </Transition>
  );

  return (
    <>
      {React.cloneElement(children, elementProps)}
      {usePortal ? (
        <Portal container={configContext.getPopupContainer?.(targetRef.current)}>
          {renderContent()}
        </Portal>
      ) : (
        renderContent()
      )}
    </>
  );
};

export default Popup;
