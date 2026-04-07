import React from 'react';
import classNames from 'classnames';
import type {
  NameType,
  TooltipContentProps as RechartsTooltipContentProps,
  TooltipPayloadEntry,
  ValueType,
} from 'recharts';
import { Tooltip as RechartsTooltip } from 'recharts';
import { useChart } from './chart-context';

const PREFIX = 'ty-chart-tooltip';

export const ChartTooltip = RechartsTooltip;

export interface ChartTooltipContentProps<
  TValue extends ValueType = ValueType,
  TName extends NameType = NameType,
>
  extends React.HTMLAttributes<HTMLDivElement> {
  active?: RechartsTooltipContentProps<TValue, TName>['active'];
  payload?: ReadonlyArray<TooltipPayloadEntry>;
  label?: RechartsTooltipContentProps<TValue, TName>['label'];
  labelKey?: string;
  nameKey?: string;
  indicator?: 'dot' | 'line' | 'dashed';
  hideLabel?: boolean;
  hideIndicator?: boolean;
  labelFormatter?: RechartsTooltipContentProps<TValue, TName>['labelFormatter'];
  formatter?: (
    value: TValue,
    name: TName,
    item: TooltipPayloadEntry,
    index: number,
    payload: ReadonlyArray<TooltipPayloadEntry>
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
      activeIndex: _activeIndex,
      accessibilityLayer: _accessibilityLayer,
      allowEscapeViewBox: _allowEscapeViewBox,
      animationDuration: _animationDuration,
      animationEasing: _animationEasing,
      axisId: _axisId,
      contentStyle: _contentStyle,
      coordinate: _coordinate,
      cursor: _cursor,
      cursorStyle: _cursorStyle,
      defaultIndex: _defaultIndex,
      filterNull: _filterNull,
      includeHidden: _includeHidden,
      isAnimationActive: _isAnimationActive,
      itemSorter: _itemSorter,
      itemStyle: _itemStyle,
      labelStyle: _labelStyle,
      offset: _offset,
      payloadUniqBy: _payloadUniqBy,
      portal: _portal,
      position: _position,
      reverseDirection: _reverseDirection,
      separator: _separator,
      shared: _shared,
      trigger: _trigger,
      useTranslate3d: _useTranslate3d,
      wrapperClassName: _wrapperClassName,
      wrapperStyle: _wrapperStyle,
      labelClassName: _labelClassName,
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
                ? formatter(item.value as ValueType, item.name as NameType, item, index, payload)
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
