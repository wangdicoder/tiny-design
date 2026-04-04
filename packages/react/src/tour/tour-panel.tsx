import React from 'react';
import Button from '../button/button';
import { TourStepProps } from './types';

export interface TourPanelProps {
  step: TourStepProps;
  current: number;
  total: number;
  type: 'default' | 'primary';
  prefixCls: string;
  prevButtonText: string;
  nextButtonText: string;
  finishButtonText: string;
  indicatorsRender?: (current: number, total: number) => React.ReactNode;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

const TourPanel = React.forwardRef<HTMLDivElement, TourPanelProps>((props, ref) => {
  const {
    step,
    current,
    total,
    type,
    prefixCls,
    prevButtonText,
    nextButtonText,
    finishButtonText,
    indicatorsRender,
    onPrev,
    onNext,
    onClose,
  } = props;
  const isLast = current === total - 1;
  const isFirst = current === 0;

  const handlePrev = () => {
    step.prevButtonProps?.onClick?.();
    onPrev();
  };

  const handleNext = () => {
    step.nextButtonProps?.onClick?.();
    onNext();
  };

  const renderIndicators = () => {
    if (indicatorsRender) {
      return indicatorsRender(current, total);
    }
    return (
      <div className={`${prefixCls}__indicators`}>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`${prefixCls}__indicator${i === current ? ` ${prefixCls}__indicator_active` : ''}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div ref={ref} className={`${prefixCls}__panel ${prefixCls}__panel_${type}`}>
      <button
        type="button"
        className={`${prefixCls}__close-btn`}
        onClick={onClose}
        aria-label="Close">
        ✕
      </button>
      {step.cover && <div className={`${prefixCls}__cover`}>{step.cover}</div>}
      {step.title && <div className={`${prefixCls}__title`}>{step.title}</div>}
      {step.description && <div className={`${prefixCls}__description`}>{step.description}</div>}
      <div className={`${prefixCls}__footer`}>
        {renderIndicators()}
        <div className={`${prefixCls}__actions`}>
          {!isFirst && (
            <Button
              {...step.prevButtonProps}
              size="sm"
              onClick={handlePrev}>
              {step.prevButtonProps?.children ?? prevButtonText}
            </Button>
          )}
          <Button
            {...step.nextButtonProps}
            size="sm"
            btnType={type === 'primary' ? 'default' : 'primary'}
            onClick={handleNext}>
            {step.nextButtonProps?.children ?? (isLast ? finishButtonText : nextButtonText)}
          </Button>
        </div>
      </div>
    </div>
  );
});

TourPanel.displayName = 'TourPanel';

export default TourPanel;
