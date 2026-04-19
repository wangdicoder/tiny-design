import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import Skeleton from '../skeleton';
import Tooltip from '../tooltip';
import {
  StatisticAlign,
  StatisticEmphasis,
  StatisticFormatOptions,
  StatisticProps,
  StatisticRenderInfo,
  StatisticStatus,
  StatisticTrend,
  StatisticValue,
} from './types';

const DEFAULT_LOCALE = 'en-US';

const clampFractionDigits = (value?: number): number | undefined => {
  if (typeof value !== 'number' || Number.isNaN(value) || value < 0) {
    return undefined;
  }

  return Math.floor(value);
};

const getIntlOptions = (format: StatisticFormatOptions = {}): Intl.NumberFormatOptions => {
  const {
    type = 'number',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
    notation,
    compactDisplay,
    unit,
    unitDisplay,
    signDisplay,
  } = format;

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: clampFractionDigits(minimumFractionDigits),
    maximumFractionDigits: clampFractionDigits(maximumFractionDigits),
    useGrouping,
    signDisplay,
  };

  if (type === 'percent') {
    options.style = 'percent';
  } else if (type === 'currency' && currency) {
    options.style = 'currency';
    options.currency = currency;
  } else if (unit) {
    options.style = 'unit';
    options.unit = unit;
    options.unitDisplay = unitDisplay;
  } else {
    options.style = 'decimal';
  }

  if (type === 'compact' || notation === 'compact') {
    options.notation = 'compact';
    options.compactDisplay = compactDisplay ?? 'short';
  } else if (notation) {
    options.notation = notation;
  }

  return options;
};

const formatDuration = (value: number, unit: StatisticFormatOptions['durationUnit'] = 'ms'): string => {
  const totalSeconds = Math.max(0, Math.floor(unit === 's' ? value : value / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
  }

  if (minutes > 0 || hours > 0) {
    parts.push(`${minutes}m`);
  }

  parts.push(`${seconds}s`);

  return parts.join(' ');
};

const formatValue = (value: StatisticValue, format: StatisticFormatOptions = {}): StatisticRenderInfo => {
  const locale = format.locale || DEFAULT_LOCALE;

  if (value === null || value === undefined || value === '') {
    return {
      rawValue: value,
      formattedValue: '',
      locale,
      isEmpty: true,
      isNumeric: false,
    };
  }

  if (typeof value === 'string') {
    return {
      rawValue: value,
      formattedValue: value,
      locale,
      isEmpty: false,
      isNumeric: false,
    };
  }

  if (!Number.isFinite(value)) {
    return {
      rawValue: value,
      formattedValue: '',
      locale,
      isEmpty: true,
      isNumeric: true,
    };
  }

  if (format.type === 'duration') {
    return {
      rawValue: value,
      formattedValue: formatDuration(value, format.durationUnit),
      locale,
      isEmpty: false,
      isNumeric: true,
    };
  }

  const numberFormat = new Intl.NumberFormat(locale, getIntlOptions(format));

  return {
    rawValue: value,
    formattedValue: numberFormat.format(value),
    locale,
    isEmpty: false,
    isNumeric: true,
    parts: numberFormat.formatToParts(value),
  };
};

const getTextLabel = (content: React.ReactNode): string => {
  if (typeof content === 'string' || typeof content === 'number') {
    return String(content);
  }

  return '';
};

const getTrendText = (trend?: StatisticTrend): string => {
  if (!trend) {
    return '';
  }

  const directionMap: Record<NonNullable<StatisticTrend['direction']>, string> = {
    up: 'up',
    down: 'down',
    flat: 'flat',
  };
  const parts = [
    trend.direction ? directionMap[trend.direction] : '',
    getTextLabel(trend.value),
    getTextLabel(trend.label),
  ].filter(Boolean);

  return parts.join(' ');
};

const getStatusText = (status?: StatisticStatus): string => {
  if (!status) {
    return '';
  }

  return [status.type && status.type !== 'default' ? status.type : '', getTextLabel(status.text)]
    .filter(Boolean)
    .join(' ');
};

const getAriaLabel = (
  label: string | undefined,
  title: React.ReactNode,
  prefix: React.ReactNode,
  suffix: React.ReactNode,
  displayValue: React.ReactNode,
  formattedValue: string,
  trend?: StatisticTrend,
  status?: StatisticStatus
): string | undefined => {
  if (label) {
    return label;
  }

  const parts = [
    getTextLabel(title),
    getTextLabel(prefix),
    getTextLabel(displayValue) || formattedValue,
    getTextLabel(suffix),
    getTrendText(trend),
    getStatusText(status),
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(', ') : undefined;
};

const getTrendIcon = (prefixCls: string, trend: StatisticTrend): React.ReactNode => {
  if (trend.icon) {
    return trend.icon;
  }

  if (!trend.direction) {
    return null;
  }

  return (
    <span
      aria-hidden="true"
      className={classNames(
        `${prefixCls}__trend-icon`,
        `${prefixCls}__trend-icon_${trend.direction}`
      )}
    />
  );
};

const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>((props, ref) => {
  const {
    title,
    description,
    tooltip,
    value,
    format,
    prefix,
    suffix,
    formatter,
    trend,
    status,
    extra,
    footer,
    loading = false,
    skeleton,
    empty = '--',
    error,
    size = 'md',
    emphasis = 'strong',
    align = 'start',
    monospace = true,
    valueClassName,
    titleClassName,
    trendClassName,
    valueStyle,
    titleStyle,
    trendStyle,
    prefixCls: customisedCls,
    className,
    style,
    children,
    'aria-label': ariaLabel,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('statistic', configContext.prefixCls, customisedCls);
  const cls = classNames(
    prefixCls,
    className,
    `${prefixCls}_${size}`,
    `${prefixCls}_align-${align as StatisticAlign}`,
    `${prefixCls}_emphasis-${emphasis as StatisticEmphasis}`,
    {
      [`${prefixCls}_monospace`]: monospace,
      [`${prefixCls}_loading`]: loading,
    }
  );

  const renderInfo = formatValue(value, format);
  const hasError = error !== undefined && error !== null && error !== false;
  const hasValue = !renderInfo.isEmpty;

  const renderValue = (): React.ReactNode => {
    if (loading) {
      return null;
    }

    if (hasError) {
      return error;
    }

    if (!hasValue) {
      return empty;
    }

    if (formatter) {
      return formatter(value, renderInfo);
    }

    return renderInfo.formattedValue;
  };

  const renderedValue = renderValue();
  const computedAriaLabel = getAriaLabel(
    ariaLabel,
    title,
    prefix,
    suffix,
    renderedValue,
    renderInfo.formattedValue,
    trend,
    status
  );

  const renderTooltip = () => {
    if (!tooltip) {
      return null;
    }

    return (
      <Tooltip title={tooltip}>
        <button
          type="button"
          className={`${prefixCls}__tooltip-trigger`}
          aria-label={`More information about ${getTextLabel(title) || 'statistic'}`}
        >
          i
        </button>
      </Tooltip>
    );
  };

  const renderStatus = () => {
    if (!status || (!status.text && status.type === 'default')) {
      return null;
    }

    return (
      <div
        className={classNames(
          `${prefixCls}__status`,
          status.type && `${prefixCls}__status_${status.type}`
        )}
      >
        <span className={`${prefixCls}__status-dot`} aria-hidden="true" />
        {status.text && <span className={`${prefixCls}__status-text`}>{status.text}</span>}
      </div>
    );
  };

  const renderTrend = () => {
    if (!trend || (!trend.value && !trend.label && !trend.direction && !trend.icon)) {
      return null;
    }

    return (
      <div
        className={classNames(
          `${prefixCls}__trend`,
          trendClassName,
          trend.sentiment && `${prefixCls}__trend_${trend.sentiment}`
        )}
        style={trendStyle}
      >
        {getTrendIcon(prefixCls, trend)}
        {trend.value !== undefined && <span className={`${prefixCls}__trend-value`}>{trend.value}</span>}
        {trend.label && <span className={`${prefixCls}__trend-label`}>{trend.label}</span>}
      </div>
    );
  };

  const renderLoading = () => (
    skeleton || (
      <div className={`${prefixCls}__skeleton`} aria-hidden="true">
        <Skeleton
          animation="shimmer"
          shape="round"
          width={size === 'sm' ? 64 : 72}
          height={12}
        />
        <Skeleton
          animation="shimmer"
          shape="round"
          width={size === 'lg' ? 192 : 156}
          height={size === 'lg' ? 36 : 28}
        />
      </div>
    )
  );

  return (
    <div {...otherProps} ref={ref} className={cls} style={style}>
      {(title || tooltip) && (
        <div className={`${prefixCls}__header`}>
          {title && (
            <div className={classNames(`${prefixCls}__title`, titleClassName)} style={titleStyle}>
              {title}
            </div>
          )}
          {renderTooltip()}
        </div>
      )}
      {description && <div className={`${prefixCls}__description`}>{description}</div>}
      <div className={classNames(`${prefixCls}__content`, valueClassName)} style={valueStyle} aria-label={computedAriaLabel}>
        {loading ? (
          renderLoading()
        ) : (
          <>
            {prefix && <span className={`${prefixCls}__prefix`}>{prefix}</span>}
            <span
              className={classNames(`${prefixCls}__value`, {
                [`${prefixCls}__value_empty`]: !hasValue && !hasError,
                [`${prefixCls}__value_error`]: hasError,
              })}
            >
              {renderedValue}
            </span>
            {suffix && <span className={`${prefixCls}__suffix`}>{suffix}</span>}
          </>
        )}
      </div>
      {(trend || status || extra) && (
        <div className={`${prefixCls}__aux`}>
          {renderTrend()}
          {renderStatus()}
          {extra && <div className={`${prefixCls}__extra`}>{extra}</div>}
        </div>
      )}
      {(footer || children) && <div className={`${prefixCls}__footer`}>{footer || children}</div>}
    </div>
  );
});

Statistic.displayName = 'Statistic';
export default Statistic;
