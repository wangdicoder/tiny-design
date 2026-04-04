import React from 'react';

export interface TourMaskProps {
  maskId: string;
  targetRect: DOMRect | null;
  zIndex: number;
  gap: { offset: number; radius: number };
  disabledInteraction: boolean;
  prefixCls: string;
  onClick?: (e: React.MouseEvent) => void;
}

const TRANSITION = 'all 300ms ease-in-out';

const TourMask = React.forwardRef<HTMLDivElement, TourMaskProps>((props, ref) => {
  const { maskId, targetRect, zIndex, gap, disabledInteraction, prefixCls, onClick } = props;

  const cutoutStyle: React.CSSProperties | undefined = targetRect
    ? {
        x: targetRect.left - gap.offset,
        y: targetRect.top - gap.offset,
        width: targetRect.width + gap.offset * 2,
        height: targetRect.height + gap.offset * 2,
        rx: gap.radius,
        ry: gap.radius,
        transition: TRANSITION,
      } as React.CSSProperties
    : undefined;

  return (
    <div ref={ref} className={`${prefixCls}__mask`} style={{ zIndex }} onClick={onClick}>
      <svg className={`${prefixCls}__mask-svg`}>
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && <rect fill="black" style={cutoutStyle} />}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.5)"
          mask={`url(#${maskId})`}
        />
        {targetRect && disabledInteraction && (
          <rect
            fill="transparent"
            className={`${prefixCls}__mask-block`}
            style={cutoutStyle}
          />
        )}
      </svg>
    </div>
  );
});

TourMask.displayName = 'TourMask';

export default TourMask;
