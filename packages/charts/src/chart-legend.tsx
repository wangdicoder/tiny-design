import React from 'react';
import classNames from 'classnames';
import { Legend as RechartsLegend } from 'recharts';
import { useChart } from './chart-context';

const PREFIX = 'ty-chart-legend';

export const ChartLegend = RechartsLegend;

export interface ChartLegendContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  payload?: Array<{
    value?: string;
    dataKey?: string;
    color?: string;
    type?: string;
  }>;
  nameKey?: string;
  hideIcon?: boolean;
  verticalAlign?: 'top' | 'bottom';
}

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(
  (
    {
      payload,
      nameKey,
      hideIcon = false,
      verticalAlign = 'bottom',
      className,
      ...props
    },
    ref
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={classNames(
          PREFIX,
          `${PREFIX}_${verticalAlign}`,
          className
        )}
        {...props}
      >
        {payload.map((entry) => {
          const key = nameKey
            ? (entry.dataKey || entry.value)
            : entry.dataKey || entry.value;
          const itemConfig = key ? config[key] : undefined;
          const displayName = itemConfig?.label || entry.value || key;
          const color =
            entry.color || (itemConfig?.color ? `var(--color-${key})` : undefined);

          const IconComponent = itemConfig?.icon;

          return (
            <div
              key={String(key)}
              className={`${PREFIX}__item`}
            >
              {!hideIcon && (
                IconComponent ? (
                  <IconComponent />
                ) : (
                  <span
                    className={`${PREFIX}__icon`}
                    style={{ backgroundColor: color }}
                  />
                )
              )}
              <span className={`${PREFIX}__label`}>{displayName}</span>
            </div>
          );
        })}
      </div>
    );
  }
);

ChartLegendContent.displayName = 'ChartLegendContent';
