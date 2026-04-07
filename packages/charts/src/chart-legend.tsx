import React from 'react';
import classNames from 'classnames';
import type { LegendPayload, LegendProps as RechartsLegendProps } from 'recharts';
import { Legend as RechartsLegend } from 'recharts';
import { useChart } from './chart-context';

const PREFIX = 'ty-chart-legend';

export const ChartLegend = RechartsLegend;

export interface ChartLegendContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  payload?: ReadonlyArray<LegendPayload>;
  nameKey?: string;
  hideIcon?: boolean;
  verticalAlign?: Extract<RechartsLegendProps['verticalAlign'], 'top' | 'bottom'>;
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
      align: _align,
      chartHeight: _chartHeight,
      chartWidth: _chartWidth,
      formatter: _formatter,
      height: _height,
      iconSize: _iconSize,
      iconType: _iconType,
      inactiveColor: _inactiveColor,
      itemSorter: _itemSorter,
      layout: _layout,
      margin: _margin,
      onBBoxUpdate: _onBBoxUpdate,
      payloadUniqBy: _payloadUniqBy,
      portal: _portal,
      width: _width,
      wrapperStyle: _wrapperStyle,
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
