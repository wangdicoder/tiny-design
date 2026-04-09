import { useState, useRef, useCallback, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { useLocale } from '../_utils/use-locale';
import { CalendarIcon, ClearIcon } from '../_utils/components';
import Popup from '../popup';
import PickerHeader from './picker-header';
import PickerDay from './picker-day';
import PickerMonth from './picker-month';
import PickerYear from './picker-year';
import { DatePickerProps, DateRangeValue, DatePickerValue, PanelMode } from './types';
import { compareDate } from './utils';


function formatDate(date: Date, format: string): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return format
    .replace('YYYY', String(y))
    .replace('MM', m)
    .replace('DD', d);
}

function getFormatByPicker(picker: string, customFormat?: string): string {
  if (customFormat) return customFormat;
  switch (picker) {
    case 'month': return 'YYYY-MM';
    case 'year': return 'YYYY';
    default: return 'YYYY-MM-DD';
  }
}

function isRangeValue(value: DatePickerProps['value'] | DatePickerProps['defaultValue']): value is DateRangeValue {
  return Array.isArray(value);
}

function getInitialRangeValue(value?: DatePickerProps['value'], defaultValue?: DatePickerProps['defaultValue']): DateRangeValue {
  if (isRangeValue(value)) {
    return [value[0] ?? null, value[1] ?? null];
  }
  if (isRangeValue(defaultValue)) {
    return [defaultValue[0] ?? null, defaultValue[1] ?? null];
  }
  return [null, null];
}

function getInitialPanelDate(value?: DatePickerProps['value'], defaultValue?: DatePickerProps['defaultValue']): Date {
  if (isRangeValue(value)) return value[0] ?? value[1] ?? new Date();
  if (value instanceof Date) return value;
  if (isRangeValue(defaultValue)) return defaultValue[0] ?? defaultValue[1] ?? new Date();
  if (defaultValue instanceof Date) return defaultValue;
  return new Date();
}

const DatePicker = (props: DatePickerProps) => {
  const {
    defaultValue,
    value,
    open: controlledOpen,
    picker = 'date',
    range = false,
    format: customFormat,
    disabled = false,
    placeholder,
    allowClear = true,
    size = 'md',
    showToday = true,
    inputReadOnly = true,
    disabledDate,
    renderExtraFooter,
    suffixIcon,
    onChange,
    onOpenChange,
    onPanelChange,
    className,
    style,
    prefixCls: customisedCls,
  } = props;

  const locale = useLocale();
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('date-picker', configContext.prefixCls, customisedCls);
  const format = getFormatByPicker(picker, customFormat);
  const [date, setDate] = useState<Date | null>(
    !range && value instanceof Date ? value : !range && defaultValue instanceof Date ? defaultValue : null,
  );
  const [rangeValue, setRangeValue] = useState<DateRangeValue>(() => getInitialRangeValue(value, defaultValue));
  const [panelDate, setPanelDate] = useState<Date>(() => getInitialPanelDate(value, defaultValue));
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<PanelMode>(picker === 'date' ? 'date' : picker);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen ?? open;

  // Controlled value
  useEffect(() => {
    if (value !== undefined) {
      if (range) {
        const nextRange: DateRangeValue = isRangeValue(value) ? [value[0] ?? null, value[1] ?? null] : [null, null];
        setRangeValue(nextRange);
        const nextPanelDate = nextRange[0] ?? nextRange[1];
        if (nextPanelDate) setPanelDate(nextPanelDate);
      } else {
        setDate(value instanceof Date ? value : null);
        if (value instanceof Date) setPanelDate(value);
      }
    }
  }, [value, range]);

  useEffect(() => {
    if (controlledOpen !== undefined) setOpen(controlledOpen);
  }, [controlledOpen]);

  const toggleOpen = useCallback((val: boolean) => {
    if (controlledOpen === undefined) setOpen(val);
    onOpenChange?.(val);
    if (val) {
      setMode(picker === 'date' ? 'date' : picker);
    } else {
      setHoverDate(null);
    }
  }, [controlledOpen, onOpenChange, picker]);

  const fireChange = useCallback((nextValue: DatePickerValue) => {
    if (range) {
      const normalized: DateRangeValue = Array.isArray(nextValue) ? nextValue : [null, null];
      if (value === undefined) setRangeValue(normalized);
      onChange?.(normalized, [
        normalized[0] ? formatDate(normalized[0], format) : '',
        normalized[1] ? formatDate(normalized[1], format) : '',
      ]);
      return;
    }

    const nextDate = nextValue instanceof Date ? nextValue : null;
    if (value === undefined) setDate(nextDate);
    onChange?.(nextDate, nextDate ? formatDate(nextDate, format) : '');
  }, [range, value, onChange, format]);

  const handleDateSelect = useCallback((d: Date) => {
    if (!range) {
      fireChange(d);
      toggleOpen(false);
      return;
    }

    const [start, end] = rangeValue;
    if (!start || end) {
      fireChange([d, null]);
      setHoverDate(null);
      return;
    }

    const nextRange: DateRangeValue = compareDate(d, start) < 0 ? [d, start] : [start, d];
    fireChange(nextRange);
    setHoverDate(null);
    toggleOpen(false);
  }, [range, rangeValue, fireChange, toggleOpen]);

  const handleMonthSelect = useCallback((d: Date) => {
    if (picker === 'month') {
      fireChange(d);
      toggleOpen(false);
    } else {
      setPanelDate(d);
      setMode('date');
      onPanelChange?.(d, 'date');
    }
  }, [picker, fireChange, toggleOpen, onPanelChange]);

  const handleYearSelect = useCallback((d: Date) => {
    if (picker === 'year') {
      fireChange(d);
      toggleOpen(false);
    } else {
      setPanelDate(d);
      setMode('month');
      onPanelChange?.(d, 'month');
    }
  }, [picker, fireChange, toggleOpen, onPanelChange]);

  const handleModeChange = useCallback((m: PanelMode) => {
    setMode(m);
    onPanelChange?.(panelDate, m);
  }, [panelDate, onPanelChange]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    fireChange(range ? [null, null] : null);
    toggleOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (range) {
      fireChange([today, null]);
      setPanelDate(today);
      return;
    }
    fireChange(today);
    setPanelDate(today);
    toggleOpen(false);
  };

  const hasValue = range ? !!(rangeValue[0] || rangeValue[1]) : date !== null;
  const displayValue = range
    ? rangeValue[0] && rangeValue[1]
      ? `${formatDate(rangeValue[0], format)} ~ ${formatDate(rangeValue[1], format)}`
      : rangeValue[0]
        ? `${formatDate(rangeValue[0], format)} ~ `
        : ''
    : hasValue && date
      ? formatDate(date, format)
      : '';
  const defaultPlaceholder = placeholder ?? (
    range
      ? `${locale.DatePicker.selectDate} ~ ${locale.DatePicker.selectDate}`
      : picker === 'month'
        ? locale.DatePicker.selectMonth
        : picker === 'year'
          ? locale.DatePicker.selectYear
          : locale.DatePicker.selectDate
  );

  const cls = classNames(prefixCls, className, `${prefixCls}_${size}`, {
    [`${prefixCls}_disabled`]: disabled,
    [`${prefixCls}_open`]: isOpen,
    [`${prefixCls}_has-value`]: hasValue,
  });

  const renderPanel = () => {
    switch (mode) {
      case 'year':
        return <PickerYear date={date} panelDate={panelDate} onChange={handleYearSelect} prefixCls={prefixCls} />;
      case 'month':
        return <PickerMonth date={date} panelDate={panelDate} months={locale.DatePicker.months} onChange={handleMonthSelect} prefixCls={prefixCls} />;
      default:
        return (
          <PickerDay
            date={date}
            range={range}
            rangeValue={rangeValue}
            hoverDate={hoverDate}
            panelDate={panelDate}
            weeks={locale.DatePicker.weeks}
            disabledDate={disabledDate}
            onChange={handleDateSelect}
            onHoverDateChange={setHoverDate}
            panelOnChange={setPanelDate}
            prefixCls={prefixCls}
          />
        );
    }
  };

  const renderOverlay = () => (
    <div className={`${prefixCls}__dropdown`} ref={dropdownRef}>
      <PickerHeader
        date={panelDate}
        mode={mode}
        months={locale.DatePicker.months}
        onChange={setPanelDate}
        onModeChange={handleModeChange}
        prefixCls={prefixCls}
      />
      {renderPanel()}
      {(showToday && mode === 'date' && picker === 'date') || renderExtraFooter ? (
        <div className={`${prefixCls}__footer`}>
          {renderExtraFooter?.(mode)}
          {showToday && mode === 'date' && picker === 'date' && (
            <a className={`${prefixCls}__today-btn`} onClick={handleToday}>{locale.DatePicker.today}</a>
          )}
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={cls} style={style} ref={wrapperRef}>
      <Popup
        trigger="manual"
        placement="bottom-start"
        arrow={false}
        visible={isOpen}
        onVisibleChange={toggleOpen}
        content={renderOverlay()}>
        <div className={`${prefixCls}__input`} onClick={() => !disabled && toggleOpen(!isOpen)}>
          <input
            className={`${prefixCls}__input-field`}
            readOnly={inputReadOnly}
            disabled={disabled}
            placeholder={defaultPlaceholder}
            value={displayValue}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            onKeyDown={(e) => {
              if (e.key === 'Escape' && isOpen) toggleOpen(false);
            }}
          />
          <span className={`${prefixCls}__suffix`}>
            {allowClear && hasValue && !disabled ? (
              <button type="button" className={`${prefixCls}__clear`} onClick={handleClear} aria-label="Clear date">
                <ClearIcon size="1em" />
              </button>
            ) : null}
            <span className={`${prefixCls}__icon`}>
              {suffixIcon ?? <CalendarIcon size="1em" />}
            </span>
          </span>
        </div>
      </Popup>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
