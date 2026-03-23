import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { createPopper, Instance } from '@popperjs/core';
import Transition, { AnimationName } from '../transition';
import Portal from '../portal';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { Placement, PopupProps } from './types';

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
  const [popupVisible, setPopupVisible] = useState('visible' in props ? visible : defaultVisible);
  const targetRef = useRef<HTMLElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const delayDisplayPopupTimer = useRef<number | undefined>(undefined);
  const delayHidePopupTimer = useRef<number | undefined>(undefined);
  const popperRef = useRef<Instance | undefined>(undefined);
  const elementProps = {
    ref: (ref: HTMLElement | null) => (targetRef.current = ref),
  };

  const displayPopup = useCallback(() => {
    setPopupVisible(true);
    onVisibleChange && onVisibleChange(true);
  }, [onVisibleChange]);

  const hidePopup = useCallback(() => {
    setPopupVisible(false);
    onVisibleChange && onVisibleChange(false);
  }, [onVisibleChange]);

  const delayDisplayPopup = useCallback((): void => {
    delayDisplayPopupTimer.current = window.setTimeout(() => {
      displayPopup();
    }, mouseEnterDelay);
  }, [mouseEnterDelay, displayPopup]);

  const delayHidePopup = useCallback((): void => {
    delayHidePopupTimer.current = window.setTimeout(() => {
      hidePopup();
    }, mouseLeaveDelay);
  }, [mouseLeaveDelay, hidePopup]);

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
    [targetRef, hidePopup]
  );

  const handleTargetOnMouseClick = useCallback(
    (e: MouseEvent): void => {
      e.preventDefault();
      if (popupVisible) {
        hidePopup();
      } else {
        displayPopup();
        document.addEventListener('click', documentOnClick, true);
      }
    },
    [popupVisible, hidePopup, displayPopup, documentOnClick]
  );

  const transitionOnEnter = (): void => {
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
    } else if (trigger === 'manual') {
      setPopupVisible(props.visible);
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
    props.visible,
    disabled,
    targetRef,
    trigger,
    handleTargetOnMouseClick,
    handleTargetOnMouseEnter,
    handleTargetOnMouseLeave,
    displayPopup,
    hidePopup,
  ]);

  useEffect(() => {
    if ('visible' in props) {
      props.visible ? displayPopup() : hidePopup();
    }
  }, [props, displayPopup, hidePopup]);

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
      {usePortal ? <Portal>{renderContent()}</Portal> : renderContent()}
    </>
  );
};

export default Popup;
