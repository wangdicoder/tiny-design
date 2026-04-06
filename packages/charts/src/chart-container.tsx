import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { ChartContextProvider } from './chart-context';
import { ChartStyle } from './chart-style';
import { ChartConfig } from './types';

const PREFIX = 'ty-chart';
const SAFE_COLOR_KEY = /^[A-Za-z0-9_-]+$/;
const DEFAULT_MIN_HEIGHT = 200;
const DEFAULT_INITIAL_SIZE = { width: 0, height: 0 };

let hasWarnedAboutResponsiveContainer = false;
let warnedConfigKeys = new Set<string>();

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactElement;
}

/**
 * ChartContainer wraps Recharts charts with:
 * 1. A ResponsiveContainer for auto-sizing
 * 2. CSS custom properties (--color-KEY) injected via inline styles
 * 3. ChartConfig provided via React context for tooltip/legend
 */
const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, children, className, style, id, ...props }, ref) => {
    const uniqueId = useId();
    const chartId = id || `chart-${uniqueId}`;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState(DEFAULT_INITIAL_SIZE);

    if (
      process.env.NODE_ENV !== 'production' &&
      !hasWarnedAboutResponsiveContainer &&
      React.isValidElement(children) &&
      typeof children.type !== 'string' &&
      (children.type as { displayName?: string; name?: string }).displayName === 'ResponsiveContainer'
    ) {
      hasWarnedAboutResponsiveContainer = true;
      console.warn(
        'ChartContainer already includes Recharts ResponsiveContainer. Pass the chart element directly instead of nesting another <ResponsiveContainer />.'
      );
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
            `Chart config key "${key}" contains characters that are unsafe for CSS custom properties. Use letters, numbers, "_" or "-".`
          );
        }

        if (value.color) {
          vars[`--color-${key}`] = value.color;
        }
      }
      return vars;
    }, [config]);

    useEffect(() => {
      if (!containerRef.current || typeof ResizeObserver === 'undefined') {
        return undefined;
      }

      const updateSize = (width: number, height: number) => {
        setSize((prevSize) => {
          const nextWidth = Math.max(0, Math.round(width));
          const nextHeight = Math.max(0, Math.round(height));

          if (
            prevSize.width === nextWidth &&
            prevSize.height === nextHeight
          ) {
            return prevSize;
          }

          return {
            width: nextWidth,
            height: nextHeight,
          };
        });
      };

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
    }, []);

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
