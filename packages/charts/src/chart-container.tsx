import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { ChartContextProvider } from './chart-context';
import { ChartStyle } from './chart-style';
import { ChartConfig } from './types';

const PREFIX = 'ty-chart';
const SAFE_COLOR_KEY = /^[A-Za-z0-9_-]+$/;
const DEFAULT_INITIAL_SIZE = { width: 0, height: 0 };
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

let hasWarnedAboutResponsiveContainer = false;
let warnedConfigKeys = new Set<string>();

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactElement;
  fallbackSize?: {
    width: number;
    height: number;
  };
}

/**
 * ChartContainer wraps Recharts charts with:
 * 1. Measured width/height injected into the chart element
 * 2. CSS custom properties (--color-KEY) injected via inline styles
 * 3. ChartConfig provided via React context for tooltip/legend
 */
const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, children, className, style, id, fallbackSize, ...props }, ref) => {
    const uniqueId = useId();
    const chartId = id || `chart-${uniqueId}`;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState(() => fallbackSize || DEFAULT_INITIAL_SIZE);

    if (process.env.NODE_ENV !== 'production' && !hasWarnedAboutResponsiveContainer) {
      if (
        React.isValidElement(children) &&
        typeof children.type !== 'string'
      ) {
        const childName =
          (children.type as { displayName?: string; name?: string }).displayName ||
          (children.type as { displayName?: string; name?: string }).name ||
          '';
        if (childName === 'ResponsiveContainer') {
          hasWarnedAboutResponsiveContainer = true;
          console.warn(
            'ChartContainer manages chart sizing itself. Pass the chart element directly instead of nesting another <ResponsiveContainer />.'
          );
        }
      }
    }

    // Build --color-KEY CSS custom properties from config
    const colorVars = useMemo(() => {
      const vars: Record<string, string> = {};
      for (const [key, value] of Object.entries(config)) {
        if (
          process.env.NODE_ENV !== 'production' &&
          !SAFE_COLOR_KEY.test(key) &&
          !warnedConfigKeys.has(key)
        ) {
          warnedConfigKeys.add(key);
          console.warn(
            `Chart config key "${key}" contains characters that are unsafe for CSS custom properties. Use letters, numbers, "_" or "-". Theme colors for this key will not be injected.`
          );
        }

        if (value.color) {
          vars[`--color-${key}`] = value.color;
        }
      }
      return vars;
    }, [config]);

    const updateSize = useCallback((width: number, height: number) => {
      setSize((prevSize) => {
        const nextWidth = Math.max(0, Math.round(width));
        const nextHeight = Math.max(0, Math.round(height));

        if (prevSize.width === nextWidth && prevSize.height === nextHeight) {
          return prevSize;
        }

        return { width: nextWidth, height: nextHeight };
      });
    }, []);

    useIsomorphicLayoutEffect(() => {
      if (!containerRef.current || typeof ResizeObserver === 'undefined') {
        return undefined;
      }

      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }

        updateSize(entry.contentRect.width, entry.contentRect.height);
      });

      const rect = containerRef.current.getBoundingClientRect();
      updateSize(rect.width, rect.height);
      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }, [updateSize]);

    useEffect(() => {
      if (!containerRef.current || typeof ResizeObserver !== 'undefined') {
        return undefined;
      }

      const updateFromRect = () => {
        if (!containerRef.current) {
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        updateSize(rect.width, rect.height);
      };

      updateFromRect();
      window.addEventListener('resize', updateFromRect);

      return () => {
        window.removeEventListener('resize', updateFromRect);
      };
    }, [updateSize]);

    const composedRef = (node: HTMLDivElement | null) => {
      containerRef.current = node;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const chart = useMemo(() => {
      if (size.width <= 0 || size.height <= 0) {
        return null;
      }

      return React.cloneElement(children, {
        width: size.width,
        height: size.height,
      });
    }, [children, size.height, size.width]);

    return (
      <ChartContextProvider config={config}>
        <ChartStyle id={chartId} config={config} />
        <div
          ref={composedRef}
          data-chart={chartId}
          className={classNames(PREFIX, className)}
          style={{ ...colorVars, ...style } as React.CSSProperties}
          {...props}
        >
          {chart}
        </div>
      </ChartContextProvider>
    );
  }
);

ChartContainer.displayName = 'ChartContainer';

export default ChartContainer;

export function resetChartContainerWarningsForTest() {
  hasWarnedAboutResponsiveContainer = false;
  warnedConfigKeys = new Set<string>();
}
