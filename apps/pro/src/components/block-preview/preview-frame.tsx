'use client';

import { useRef, useState, useEffect } from 'react';
import type { ViewportSize } from './toolbar';
import styles from './block-preview.module.scss';

const VIEWPORT_WIDTHS: Record<ViewportSize, number> = {
  desktop: 0, // 0 = fluid / 100%
  tablet: 768,
  mobile: 375,
};

interface PreviewFrameProps {
  viewport: ViewportSize;
  children: React.ReactNode;
}

export function PreviewFrame({ viewport, children }: PreviewFrameProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState<number | undefined>(undefined);
  const targetWidth = VIEWPORT_WIDTHS[viewport];

  useEffect(() => {
    if (!outerRef.current || targetWidth === 0) {
      setScale(1);
      setInnerHeight(undefined);
      return;
    }

    const observer = new ResizeObserver(() => {
      if (!outerRef.current) return;
      const availableWidth = outerRef.current.clientWidth;
      const newScale = Math.min(1, availableWidth / targetWidth);
      setScale(newScale);

      // Also observe inner height for proper container sizing
      if (innerRef.current) {
        setInnerHeight(innerRef.current.scrollHeight * newScale);
      }
    });

    observer.observe(outerRef.current);
    if (innerRef.current) {
      observer.observe(innerRef.current);
    }

    return () => observer.disconnect();
  }, [viewport, targetWidth]);

  const isScaled = targetWidth > 0;

  return (
    <div
      ref={outerRef}
      className={styles.previewOuter}
      style={isScaled && innerHeight ? { height: innerHeight } : undefined}
    >
      <div
        ref={innerRef}
        className={styles.previewInner}
        style={
          isScaled
            ? {
                width: targetWidth,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
