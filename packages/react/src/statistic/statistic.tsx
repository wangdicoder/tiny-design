import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { StatisticFormatterInfo, StatisticProps } from './types';

const getSafePrecision = (precision?: number): number | undefined => {
  if (typeof precision !== 'number' || Number.isNaN(precision) || precision < 0) {
    return undefined;
  }

  return Math.floor(precision);
};

const formatNumericValue = (
  value: number,
  precision?: number,
  groupSeparator = ',',
  decimalSeparator = '.'
): string => {
  const normalizedPrecision = getSafePrecision(precision);
  const sign = value < 0 ? '-' : '';
  const raw = normalizedPrecision !== undefined
    ? Math.abs(value).toFixed(normalizedPrecision)
    : String(Math.abs(value));
  const [integerPart, decimalPart] = raw.split('.');
  const groupedInteger = groupSeparator
    ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)
    : integerPart;

  if (!decimalPart) {
    return `${sign}${groupedInteger}`;
  }

  return `${sign}${groupedInteger}${decimalSeparator}${decimalPart}`;
};

const getDisplayInfo = (
  value: number | string | undefined,
  precision?: number,
  groupSeparator = ',',
  decimalSeparator = '.'
): StatisticFormatterInfo & { rawValue: number | string; hasValue: boolean } => {
  if (value === undefined) {
    return {
      rawValue: '',
      formattedValue: '',
      groupSeparator,
      decimalSeparator,
      precision: getSafePrecision(precision),
      isNumeric: false,
      hasValue: false,
    };
  }

  if (typeof value === 'string') {
    return {
      rawValue: value,
      formattedValue: value,
      groupSeparator,
      decimalSeparator,
      precision: getSafePrecision(precision),
      isNumeric: false,
      hasValue: value.length > 0,
    };
  }

  if (!Number.isFinite(value)) {
    return {
      rawValue: value,
      formattedValue: '',
      groupSeparator,
      decimalSeparator,
      precision: getSafePrecision(precision),
      isNumeric: true,
      hasValue: false,
    };
  }

  return {
    rawValue: value,
    formattedValue: formatNumericValue(value, precision, groupSeparator, decimalSeparator),
    groupSeparator,
    decimalSeparator,
    precision: getSafePrecision(precision),
    isNumeric: true,
    hasValue: true,
  };
};

const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>((props, ref) => {
  const {
    title,
    value,
    precision,
    prefix,
    suffix,
    groupSeparator = ',',
    decimalSeparator = '.',
    valueStyle,
    valueClassName,
    empty = '--',
    formatter,
    prefixCls: customisedCls,
    className,
    style,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('statistic', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);
  const displayInfo = getDisplayInfo(value, precision, groupSeparator, decimalSeparator);

  const renderValue = () => {
    if (!displayInfo.hasValue) {
      return empty;
    }

    if (formatter) {
      return formatter(displayInfo.rawValue, displayInfo);
    }

    return displayInfo.formattedValue;
  };

  return (
    <div {...otherProps} ref={ref} className={cls} style={style}>
      {title && <div className={`${prefixCls}__title`}>{title}</div>}
      <div
        className={classNames(`${prefixCls}__content`, valueClassName)}
        style={valueStyle}
        aria-label={typeof displayInfo.formattedValue === 'string' ? displayInfo.formattedValue : undefined}
      >
        {prefix && <span className={`${prefixCls}__prefix`}>{prefix}</span>}
        <span className={`${prefixCls}__value`}>{renderValue()}</span>
        {suffix && <span className={`${prefixCls}__suffix`}>{suffix}</span>}
      </div>
    </div>
  );
});

Statistic.displayName = 'Statistic';
export default Statistic;
