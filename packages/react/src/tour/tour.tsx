import React, { useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import classNames from 'classnames';
import { createPopper, Instance } from '@popperjs/core';
import Portal from '../portal';
import Transition from '../transition';
import { ConfigContext } from '../config-provider/config-context';
import { resolveTargetContainer } from '../config-provider/container-utils';
import { acquireScrollLock } from '../config-provider/scroll-lock';
import { getPrefixCls } from '../_utils/general';
import { useLocale } from '../_utils/use-locale';
import { Placement } from '../popup/types';
import TourMask from './tour-mask';
import TourPanel from './tour-panel';
import { TourProps, TourStepProps } from './types';

const DEFAULT_GAP = { offset: 6, radius: 2 };

function resolveTarget(target: TourStepProps['target']): HTMLElement | null {
  if (!target) return null;
  if (typeof target === 'function') return target();
  return target;
}

const Tour = React.forwardRef<HTMLDivElement, TourProps>((props, ref) => {
  const {
    open = false,
    current: currentProp,
    steps = [],
    placement: globalPlacement = 'bottom',
    arrow: globalArrow = true,
    mask: globalMask = true,
    disabledInteraction: globalDisabledInteraction = false,
    type = 'default',
    gap: gapProp,
    zIndex = 1001,
    keyboard = true,
    scrollIntoViewOptions = true,
    indicatorsRender,
    onChange,
    onClose,
    onFinish,
    className,
    style,
    prefixCls: customisedCls,
  } = props;
  const configContext = useContext(ConfigContext);
  const locale = useLocale();
  const prefixCls = getPrefixCls('tour', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);
  const gap = { ...DEFAULT_GAP, ...gapProp };
  const maskId = useId();
  const titleId = useId();
  const descriptionId = useId();

  const [internalCurrent, setInternalCurrent] = useState(0);
  const current = currentProp ?? internalCurrent;
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<Instance | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const currentStep = steps[current];
  const stepPlacement = currentStep?.placement ?? globalPlacement;
  const stepArrow = currentStep?.arrow ?? globalArrow;
  const stepMask = currentStep?.mask ?? globalMask;
  const stepDisabledInteraction = currentStep?.disabledInteraction ?? globalDisabledInteraction;
  const stepScrollIntoView = currentStep?.scrollIntoViewOptions ?? scrollIntoViewOptions;

  const destroyPopper = useCallback(() => {
    if (popperRef.current) {
      popperRef.current.destroy();
      popperRef.current = null;
    }
  }, []);

  const createPopperInstance = useCallback(() => {
    destroyPopper();

    const target = resolveTarget(currentStep?.target);
    const panel = panelRef.current;
    if (!target || !panel || !target.isConnected) return;

    popperRef.current = createPopper(target, panel, {
      placement: stepPlacement as Placement,
      modifiers: [
        { name: 'flip', enabled: true },
        {
          name: 'offset',
          options: {
            offset: [0, stepArrow ? 16 + gap.offset : 8 + gap.offset],
          },
        },
        {
          name: 'computeStyles',
          options: { gpuAcceleration: false, adaptive: false },
        },
      ],
    });
  }, [currentStep?.target, stepPlacement, stepArrow, gap.offset, destroyPopper]);

  const updateTargetRect = useCallback(() => {
    const target = resolveTarget(currentStep?.target);
    if (target) {
      setTargetRect(target.getBoundingClientRect());
    } else {
      setTargetRect(null);
    }
  }, [currentStep?.target]);

  // Update target rect and scroll into view when step changes
  useEffect(() => {
    if (!open) return undefined;

    const target = resolveTarget(currentStep?.target);

    // Update rect immediately so mask/panel move without delay
    updateTargetRect();
    setPanelVisible(true);

    // If scrolling is needed, scroll and re-measure after scroll settles
    if (target && stepScrollIntoView) {
      const rect = target.getBoundingClientRect();
      const isInViewport =
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.left >= 0 &&
        rect.right <= window.innerWidth;

      if (!isInViewport) {
        const scrollOptions =
          typeof stepScrollIntoView === 'object' ? stepScrollIntoView : { behavior: 'smooth' as const, block: 'center' as const };
        target.scrollIntoView(scrollOptions);
        const timer = setTimeout(() => updateTargetRect(), 300);
        return () => clearTimeout(timer);
      }
    }

    return undefined;
  }, [open, current, currentStep?.target, stepScrollIntoView, updateTargetRect]);

  // Recreate Popper when the step changes (target, placement, etc.)
  useEffect(() => {
    if (!open || !panelVisible) return;
    // Use rAF to ensure the panel DOM is committed and painted
    const raf = requestAnimationFrame(() => {
      createPopperInstance();
    });
    return () => cancelAnimationFrame(raf);
  }, [open, panelVisible, current, createPopperInstance]);

  // Update rect on scroll/resize, and also update Popper position
  useEffect(() => {
    if (!open) return undefined;

    const targetContainer = resolveTargetContainer(configContext);
    const handleUpdate = () => {
      updateTargetRect();
      popperRef.current?.update();
    };
    targetContainer.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);
    return () => {
      targetContainer.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [configContext, open, updateTargetRect]);

  const handleTransitionExited = useCallback(() => {
    destroyPopper();
  }, [destroyPopper]);

  // Cleanup on unmount
  useEffect(() => {
    return () => destroyPopper();
  }, [destroyPopper]);

  // Reset state when closed
  useEffect(() => {
    if (!open) {
      setPanelVisible(false);
      setTargetRect(null);
      destroyPopper();
      if (currentProp === undefined) {
        setInternalCurrent(0);
      }
    }
  }, [open, currentProp, destroyPopper]);

  // Scroll lock
  useEffect(() => {
    if (!open) return undefined;
    return acquireScrollLock(resolveTargetContainer(configContext));
  }, [configContext, open]);

  useEffect(() => {
    if (!open || !panelVisible) return undefined;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const frameId = requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable) {
        focusable.focus();
      } else {
        panel.focus();
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
      previousFocusRef.current?.focus();
    };
  }, [open, panelVisible, current]);

  // Keyboard navigation
  useEffect(() => {
    if (!open || !keyboard) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        currentStep?.onClose?.();
        onClose?.();
      } else if (e.key === 'ArrowLeft' && current > 0) {
        const next = current - 1;
        if (currentProp === undefined) setInternalCurrent(next);
        onChange?.(next);
      } else if (e.key === 'ArrowRight' && current < steps.length - 1) {
        const next = current + 1;
        if (currentProp === undefined) setInternalCurrent(next);
        onChange?.(next);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, keyboard, current, steps.length, currentProp, currentStep, onChange, onClose]);

  const handlePrev = () => {
    if (current > 0) {
      const next = current - 1;
      if (currentProp === undefined) setInternalCurrent(next);
      onChange?.(next);
    }
  };

  const handleNext = () => {
    if (current < steps.length - 1) {
      const next = current + 1;
      if (currentProp === undefined) setInternalCurrent(next);
      onChange?.(next);
    } else {
      onFinish?.();
      onClose?.();
    }
  };

  const handleClose = () => {
    currentStep?.onClose?.();
    onClose?.();
  };

  if (!open || !currentStep) return null;

  const hasTarget = !!resolveTarget(currentStep.target);
  const ariaLabel = currentStep.title ? undefined : 'Tour';

  return (
    <Portal>
      <div
        ref={ref}
        className={cls}
        style={{ ...style, zIndex }}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={currentStep.title ? titleId : undefined}
        aria-describedby={currentStep.description ? descriptionId : undefined}>
        {stepMask && (
          <TourMask
            maskId={maskId}
            targetRect={targetRect}
            zIndex={zIndex}
            gap={gap}
            disabledInteraction={stepDisabledInteraction}
            prefixCls={prefixCls}
          />
        )}

        <Transition
          in={open && panelVisible}
          nodeRef={panelRef}
          onExited={handleTransitionExited}
          classNames={`${prefixCls}__panel_zoom`}
          timeout={{ enter: 0, exit: 300 }}>
          <div
            ref={panelRef}
            className={classNames({
              [`${prefixCls}__panel-wrapper`]: true,
              [`${prefixCls}__panel-wrapper_centered`]: !hasTarget,
            })}
            tabIndex={-1}
            style={{ zIndex: zIndex + 1 }}
            onClick={(e) => e.stopPropagation()}>
            {stepArrow && hasTarget && (
              <div data-popper-arrow className={`${prefixCls}__arrow`} />
            )}
            <TourPanel
              step={currentStep}
              current={current}
              total={steps.length}
              type={type}
              prefixCls={prefixCls}
              titleId={titleId}
              descriptionId={descriptionId}
              prevButtonText={locale.Tour.prevText}
              nextButtonText={locale.Tour.nextText}
              finishButtonText={locale.Tour.finishText}
              indicatorsRender={indicatorsRender}
              onPrev={handlePrev}
              onNext={handleNext}
              onClose={handleClose}
            />
          </div>
        </Transition>
      </div>
    </Portal>
  );
});

Tour.displayName = 'Tour';

export default Tour;
