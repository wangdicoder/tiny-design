import React, { useId, useMemo } from 'react';
import classNames from 'classnames';
import { ResponsiveContainer } from 'recharts';
import { ChartContextProvider } from './chart-context';
import { ChartStyle } from './chart-style';
import { ChartConfig } from './types';

const PREFIX = 'ty-chart';

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

    // Build --color-KEY CSS custom properties from config
    const colorVars = useMemo(() => {
      const vars: Record<string, string> = {};
      for (const [key, value] of Object.entries(config)) {
        if (value.color) {
          vars[`--color-${key}`] = value.color;
        }
      }
      return vars;
    }, [config]);

    return (
      <ChartContextProvider config={config}>
        <ChartStyle id={chartId} config={config} />
        <div
          ref={ref}
          data-chart={chartId}
          className={classNames(PREFIX, className)}
          style={{ ...colorVars, ...style } as React.CSSProperties}
          {...props}
        >
          <ResponsiveContainer>
            {children}
          </ResponsiveContainer>
        </div>
      </ChartContextProvider>
    );
  }
);

ChartContainer.displayName = 'ChartContainer';

export default ChartContainer;
