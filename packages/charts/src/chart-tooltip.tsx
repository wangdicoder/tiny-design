import React from 'react';
import classNames from 'classnames';
import { Tooltip as RechartsTooltip } from 'recharts';
import { useChart } from './chart-context';

const PREFIX = 'ty-chart-tooltip';

export const ChartTooltip = RechartsTooltip;

export interface ChartTooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    dataKey?: string;
    payload?: Record<string, unknown>;
    color?: string;
    fill?: string;
  }>;
  label?: string;
  labelKey?: string;
  nameKey?: string;
  indicator?: 'dot' | 'line' | 'dashed';
  hideLabel?: boolean;
  hideIndicator?: boolean;
  labelFormatter?: (label: string, payload: unknown[]) => React.ReactNode;
  formatter?: (
    value: number | string,
    name: string,
    item: unknown,
    index: number,
    payload: unknown[]
  ) => React.ReactNode;
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload,
      label,
      labelKey,
      nameKey,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      labelFormatter,
      formatter,
      className,
      ...props
    },
    ref
  ) => {
    const { config } = useChart();

    if (!active || !payload?.length) {
      return null;
    }

    const tooltipLabel = (() => {
      if (hideLabel) return null;

      const labelConfig = labelKey ? config[labelKey] : undefined;
      const displayLabel = labelConfig?.label || label;

      if (labelFormatter && label) {
        return (
          <div className={`${PREFIX}__label`}>
            {labelFormatter(label, payload)}
          </div>
        );
      }

      return displayLabel ? (
        <div className={`${PREFIX}__label`}>{displayLabel}</div>
      ) : null;
    })();

    return (
      <div
        ref={ref}
        className={classNames(PREFIX, className)}
        {...props}
      >
        {tooltipLabel}
        <div className={`${PREFIX}__items`}>
          {payload.map((item, index) => {
            const key = nameKey
              ? (item.payload?.[nameKey] as string) || item.name
              : item.dataKey || item.name;
            const itemConfig = key ? config[key] : undefined;
            const displayName = itemConfig?.label || item.name || key;
            const color =
              item.color ||
              item.fill ||
              (itemConfig?.color ? `var(--color-${key})` : undefined);

            const displayValue =
              formatter && item.value !== undefined
                ? formatter(item.value, String(item.name), item, index, payload)
                : item.value;

            const IconComponent = itemConfig?.icon;

            return (
              <div key={`${key}-${index}`} className={`${PREFIX}__item`}>
                {!hideIndicator && (
                  <span
                    className={classNames(
                      `${PREFIX}__indicator`,
                      `${PREFIX}__indicator_${indicator}`
                    )}
                    style={{ '--indicator-color': color } as React.CSSProperties}
                  />
                )}
                <div className={`${PREFIX}__item-content`}>
                  <span className={`${PREFIX}__item-name`}>
                    {IconComponent && (
                      <IconComponent />
                    )}
                    {displayName}
                  </span>
                  <span className={`${PREFIX}__item-value`}>
                    {displayValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

ChartTooltipContent.displayName = 'ChartTooltipContent';
