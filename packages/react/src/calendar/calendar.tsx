import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { useLocale } from '../_utils/use-locale';
import {
  getMonthDaysArray,
  getISOWeekNumber,
  isSameDate,
  isToday,
  compareDate,
  getPrevMonthDate,
  getNextMonthDate,
  getPrevYearDate,
  getNextYearDate,
} from '../date-picker/utils';
import { CalendarProps, CalendarMode } from './types';

// ─── helpers ────────────────────────────────────────────────────────────────

const dateKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

const getIntlMonthName = (date: Date, locale: string, style: 'long' | 'short' = 'long') => {
  try {
    return new Intl.DateTimeFormat(locale, { month: style }).format(date);
  } catch {
    return '';
  }
};

const DEFAULT_WEEKS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// ─── component ──────────────────────────────────────────────────────────────

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const {
    defaultValue,
    fullscreen = true,
    disabledDate: disabledDateProp,
    dateCellRender,
    monthCellRender,
    headerRender,
    defaultMode = 'month',
    prefixCls: customisedCls,
    className,
    style,
    onChange,
    onSelect,
    onPanelChange,
    value: _value,
    mode: _mode,
    // NEW PROPS
    selectionMode = 'single',
    rangeValue: _rangeValue,
    defaultRangeValue,
    onRangeChange,
    multipleValue: _multipleValue,
    defaultMultipleValue,
    onMultipleChange,
    weekStartsOn = 0,
    showWeekNumber = false,
    showToday = false,
    validRange,
    cellClassName,
    cellStyle: cellStyleProp,
    dotRender,
    onMonthChange,
    onYearChange,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('calendar', configContext.prefixCls, customisedCls);
  const locale = useLocale();
  const calendarRef = useRef<HTMLDivElement>(null);

  // ── state ──────────────────────────────────────────────────────────────────

  const [selectedDate, setSelectedDate] = useState<Date>(
    'value' in props ? (props.value as Date) : (defaultValue ?? new Date())
  );
  const [panelDate, setPanelDate] = useState<Date>(selectedDate);
  const [mode, setMode] = useState<CalendarMode>(
    'mode' in props ? (props.mode as CalendarMode) : defaultMode
  );

  // Range selection state
  const [rangeStart, setRangeStart] = useState<Date | null>(
    _rangeValue?.[0] ?? defaultRangeValue?.[0] ?? null
  );
  const [rangeEnd, setRangeEnd] = useState<Date | null>(
    _rangeValue?.[1] ?? defaultRangeValue?.[1] ?? null
  );
  const [rangeHover, setRangeHover] = useState<Date | null>(null);

  // Multiple selection state
  const [multipleSelected, setMultipleSelected] = useState<Map<string, Date>>(() => {
    const initial = _multipleValue ?? defaultMultipleValue ?? [];
    const map = new Map<string, Date>();
    initial.forEach((d) => map.set(dateKey(d), d));
    return map;
  });

  // Keyboard focused cell
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);


  // ── sync controlled props ──────────────────────────────────────────────────

  useEffect(() => {
    if ('value' in props && props.value) {
      setSelectedDate(props.value);
      setPanelDate(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    if ('mode' in props) setMode(props.mode as CalendarMode);
  }, [props.mode]);

  useEffect(() => {
    if (_rangeValue !== undefined) {
      setRangeStart(_rangeValue?.[0] ?? null);
      setRangeEnd(_rangeValue?.[1] ?? null);
    }
  }, [_rangeValue]);

  useEffect(() => {
    if (_multipleValue !== undefined) {
      const map = new Map<string, Date>();
      (_multipleValue ?? []).forEach((d) => map.set(dateKey(d), d));
      setMultipleSelected(map);
    }
  }, [_multipleValue]);

  // Sync DOM focus with focusedDate so :focus-visible tracks correctly
  useEffect(() => {
    if (focusedDate) {
      const key = dateKey(focusedDate);
      const cell = calendarRef.current?.querySelector<HTMLElement>(`[data-date-key="${key}"]`);
      cell?.focus({ preventScroll: true });
    } else {
      // Return focus to the calendar container when focus is cleared
      calendarRef.current?.focus({ preventScroll: true });
    }
  }, [focusedDate]);

  // ── locale ─────────────────────────────────────────────────────────────────

  const localeWeeks = locale?.DatePicker?.weeks ?? DEFAULT_WEEKS_EN;
  const localeMonths = locale?.DatePicker?.months ?? [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  // Rotate weeks array based on weekStartsOn
  const weeks = [...localeWeeks.slice(weekStartsOn), ...localeWeeks.slice(0, weekStartsOn)];
  const months = localeMonths;

  // Intl-based full month name
  const getFullMonthName = (date: Date): string => {
    const intlLocale = locale?.locale === 'zh_CN' ? 'zh-CN' : 'en-US';
    const name = getIntlMonthName(date, intlLocale, 'long');
    return name || months[date.getMonth()];
  };

  // ── validRange + disabledDate ──────────────────────────────────────────────

  const disabledDate = useCallback(
    (date: Date): boolean => {
      if (validRange) {
        if (compareDate(date, validRange[0]) < 0 || compareDate(date, validRange[1]) > 0) {
          return true;
        }
      }
      return disabledDateProp?.(date) ?? false;
    },
    [validRange, disabledDateProp]
  );

  const canGoPrev = (): boolean => {
    if (!validRange) return true;
    if (mode === 'month') {
      const prev = getPrevMonthDate(panelDate);
      return prev.getFullYear() > validRange[0].getFullYear() ||
        (prev.getFullYear() === validRange[0].getFullYear() && prev.getMonth() >= validRange[0].getMonth());
    }
    if (mode === 'year') {
      return panelDate.getFullYear() - 1 >= validRange[0].getFullYear();
    }
    // decade
    const decadeStart = Math.floor(panelDate.getFullYear() / 10) * 10 - 10;
    return decadeStart + 11 >= validRange[0].getFullYear();
  };

  const canGoNext = (): boolean => {
    if (!validRange) return true;
    if (mode === 'month') {
      const next = getNextMonthDate(panelDate);
      return next.getFullYear() < validRange[1].getFullYear() ||
        (next.getFullYear() === validRange[1].getFullYear() && next.getMonth() <= validRange[1].getMonth());
    }
    if (mode === 'year') {
      return panelDate.getFullYear() + 1 <= validRange[1].getFullYear();
    }
    const decadeStart = Math.floor(panelDate.getFullYear() / 10) * 10 + 10;
    return decadeStart <= validRange[1].getFullYear();
  };

  // ── CSS ────────────────────────────────────────────────────────────────────

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_fullscreen`]: fullscreen,
    [`${prefixCls}_card`]: !fullscreen,
  });

  // ── handlers ───────────────────────────────────────────────────────────────

  const handleDateSelect = (date: Date) => {
    if (disabledDate(date)) return;

    if (selectionMode === 'range') {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        // Start new range
        setRangeStart(date);
        setRangeEnd(null);
        setRangeHover(null);
      } else {
        // Complete range
        const [start, end] = compareDate(date, rangeStart) >= 0
          ? [rangeStart, date]
          : [date, rangeStart];
        setRangeStart(start);
        setRangeEnd(end);
        setRangeHover(null);
        onRangeChange?.([start, end]);
      }
      setPanelDate(date);
      onSelect?.(date);
      return;
    }

    if (selectionMode === 'multiple') {
      const key = dateKey(date);
      const newMap = new Map(multipleSelected);
      if (newMap.has(key)) {
        newMap.delete(key);
      } else {
        newMap.set(key, date);
      }
      setMultipleSelected(newMap);
      onMultipleChange?.(Array.from(newMap.values()));
      setPanelDate(date);
      onSelect?.(date);
      return;
    }

    // Single selection
    if (!('value' in props)) {
      setSelectedDate(date);
    }
    setPanelDate(date);
    onSelect?.(date);
    onChange?.(date);
  };

  const handlePanelChange = (newDate: Date, newMode?: CalendarMode) => {
    setPanelDate(newDate);
    const m = newMode ?? mode;
    onPanelChange?.(newDate, m);
  };

  const handleModeChange = (newMode: CalendarMode) => {
    if (!('mode' in props)) {
      setMode(newMode);
    }
    onPanelChange?.(panelDate, newMode);
  };

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(panelDate.getFullYear(), month, 1);
    setPanelDate(newDate);
    handleModeChange('month');
    onMonthChange?.(newDate);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, panelDate.getMonth(), 1);
    setPanelDate(newDate);
    handleModeChange('year');
    onYearChange?.(newDate);
  };

  const goPrev = () => {
    if (!canGoPrev()) return;
    setFocusedDate(null);
    let newDate: Date;
    if (mode === 'month') {
      newDate = getPrevMonthDate(panelDate);
      onMonthChange?.(newDate);
    } else if (mode === 'year') {
      newDate = getPrevYearDate(panelDate);
      onYearChange?.(newDate);
    } else {
      // decade
      newDate = new Date(panelDate.getFullYear() - 10, panelDate.getMonth(), 1);
    }

    handlePanelChange(newDate);
  };

  const goNext = () => {
    if (!canGoNext()) return;
    setFocusedDate(null);
    let newDate: Date;
    if (mode === 'month') {
      newDate = getNextMonthDate(panelDate);
      onMonthChange?.(newDate);
    } else if (mode === 'year') {
      newDate = getNextYearDate(panelDate);
      onYearChange?.(newDate);
    } else {
      newDate = new Date(panelDate.getFullYear() + 10, panelDate.getMonth(), 1);
    }

    handlePanelChange(newDate);
  };

  const goToday = () => {
    const today = new Date();
    if (disabledDate(today)) return;
    setPanelDate(today);
    if (selectionMode === 'single') {
      if (!('value' in props)) setSelectedDate(today);
      onChange?.(today);
    }
    onPanelChange?.(today, mode);
  };

  // ── Range helpers ──────────────────────────────────────────────────────────

  const isInRange = (date: Date): boolean => {
    if (selectionMode !== 'range') return false;
    const start = rangeStart;
    const end = rangeEnd ?? rangeHover;
    if (!start || !end) return false;
    const [lo, hi] = compareDate(start, end) <= 0 ? [start, end] : [end, start];
    return compareDate(date, lo) > 0 && compareDate(date, hi) < 0;
  };

  const isRangeStart = (date: Date): boolean => {
    if (selectionMode !== 'range' || !rangeStart) return false;
    const end = rangeEnd ?? rangeHover;
    if (!end) return isSameDate(date, rangeStart);
    return compareDate(rangeStart, end) <= 0
      ? isSameDate(date, rangeStart)
      : isSameDate(date, end);
  };

  const isRangeEnd = (date: Date): boolean => {
    if (selectionMode !== 'range') return false;
    const end = rangeEnd ?? rangeHover;
    if (!end || !rangeStart) return false;
    return compareDate(rangeStart, end) <= 0
      ? isSameDate(date, end)
      : isSameDate(date, rangeStart);
  };

  const isDateSelected = (date: Date): boolean => {
    if (selectionMode === 'multiple') {
      return multipleSelected.has(dateKey(date));
    }
    if (selectionMode === 'range') {
      return isRangeStart(date) || isRangeEnd(date);
    }
    return isSameDate(selectedDate, date);
  };

  // ── keyboard ───────────────────────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (mode !== 'month') return;
    const base = focusedDate ?? selectedDate;
    let next: Date | null = null;

    switch (e.key) {
      case 'ArrowLeft':
        next = new Date(base.getFullYear(), base.getMonth(), base.getDate() - 1);
        break;
      case 'ArrowRight':
        next = new Date(base.getFullYear(), base.getMonth(), base.getDate() + 1);
        break;
      case 'ArrowUp':
        next = new Date(base.getFullYear(), base.getMonth(), base.getDate() - 7);
        break;
      case 'ArrowDown':
        next = new Date(base.getFullYear(), base.getMonth(), base.getDate() + 7);
        break;
      case 'Enter':
        handleDateSelect(base);
        setFocusedDate(null);
        e.preventDefault();
        return;
      case 'Escape':
        setFocusedDate(null);
        return;
      default:
        return;
    }

    if (next) {
      e.preventDefault();
      if (!disabledDate(next)) {
        setFocusedDate(next);
        // If focused date leaves current month, navigate
        if (next.getMonth() !== panelDate.getMonth() || next.getFullYear() !== panelDate.getFullYear()) {
          setPanelDate(next);
        }
      }
    }
  };

  // ── header title ───────────────────────────────────────────────────────────

  const getTitleText = (): string => {
    const year = panelDate.getFullYear();
    if (mode === 'decade') {
      const decadeStart = Math.floor(year / 10) * 10;
      return `${decadeStart} – ${decadeStart + 9}`;
    }
    if (mode === 'year') return `${year}`;
    const monthName = getFullMonthName(panelDate);
    return `${monthName} ${year}`;
  };

  const handleTitleClick = () => {
    if (mode === 'month') handleModeChange('year');
    else if (mode === 'year') handleModeChange('decade');
    else handleModeChange('month');
  };

  // ── render header ──────────────────────────────────────────────────────────

  const renderHeader = () => {
    if (headerRender) {
      return headerRender({
        value: panelDate,
        mode,
        onChange: (date) => handlePanelChange(date),
        onModeChange: handleModeChange,
      });
    }

    return (
      <div className={`${prefixCls}__header`}>
        <button
          type="button"
          className={classNames(`${prefixCls}__nav-btn`, {
            [`${prefixCls}__nav-btn_disabled`]: !canGoPrev(),
          })}
          onClick={goPrev}
          disabled={!canGoPrev()}
          aria-label="Previous"
        >
          ‹
        </button>
        <span className={`${prefixCls}__title`}>
          <button
            type="button"
            className={`${prefixCls}__title-btn`}
            onClick={handleTitleClick}
          >
            {getTitleText()}
          </button>
          {showToday && (
            <button
              type="button"
              className={`${prefixCls}__today-btn`}
              onClick={goToday}
            >
              Today
            </button>
          )}
        </span>
        <button
          type="button"
          className={classNames(`${prefixCls}__nav-btn`, {
            [`${prefixCls}__nav-btn_disabled`]: !canGoNext(),
          })}
          onClick={goNext}
          disabled={!canGoNext()}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    );
  };

  // ── render month panel ─────────────────────────────────────────────────────

  const renderMonthPanel = () => {
    const panelDays = getMonthDaysArray(panelDate, weekStartsOn);

    return (
      <table className={`${prefixCls}__table`} role="grid">
        <thead>
          <tr>
            {showWeekNumber && (
              <th className={`${prefixCls}__cell-header ${prefixCls}__week-number-header`} scope="col">
                #
              </th>
            )}
            {weeks.map((week, i) => (
              <th key={i} className={`${prefixCls}__cell-header`} scope="col">
                {week}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: panelDays.length / 7 }, (_, row) => {
            const rowDays = panelDays.slice(row * 7, row * 7 + 7);
            const weekNum = getISOWeekNumber(rowDays[0].date);

            return (
              <tr key={row}>
                {showWeekNumber && (
                  <td className={`${prefixCls}__week-number`}>
                    {weekNum}
                  </td>
                )}
                {rowDays.map((dayCell, col) => {
                  const isDisabled = disabledDate(dayCell.date);
                  const selected = isDateSelected(dayCell.date);
                  const focused = focusedDate && isSameDate(focusedDate, dayCell.date);
                  const dot = dotRender?.(dayCell.date);
                  const customCls = cellClassName?.(dayCell.date);
                  const customStyle = cellStyleProp?.(dayCell.date);

                  const cellCls = classNames(`${prefixCls}__cell`, customCls, {
                    [`${prefixCls}__cell_in-view`]: dayCell.isThisMonth,
                    [`${prefixCls}__cell_today`]: isToday(dayCell.date),
                    [`${prefixCls}__cell_selected`]: selected,
                    [`${prefixCls}__cell_disabled`]: isDisabled,
                    [`${prefixCls}__cell_focused`]: focused,
                    [`${prefixCls}__cell_in-range`]: isInRange(dayCell.date),
                    [`${prefixCls}__cell_range-start`]: isRangeStart(dayCell.date),
                    [`${prefixCls}__cell_range-end`]: isRangeEnd(dayCell.date),
                  });

                  return (
                    <td
                      key={col}
                      className={cellCls}
                      style={customStyle}
                      data-date-key={dateKey(dayCell.date)}
                      onClick={() => handleDateSelect(dayCell.date)}
                      onMouseEnter={() => {
                        if (selectionMode === 'range' && rangeStart && !rangeEnd) {
                          setRangeHover(dayCell.date);
                        }
                      }}
                      role="gridcell"
                      tabIndex={focused ? 0 : -1}
                      aria-selected={selected}
                      aria-disabled={isDisabled}
                    >
                      <div className={`${prefixCls}__cell-inner`}>
                        <span className={`${prefixCls}__cell-date`}>{dayCell.label}</span>
                        {dot && (
                          <span
                            className={`${prefixCls}__cell-dot`}
                            style={typeof dot === 'string' ? { backgroundColor: dot } : undefined}
                          />
                        )}
                        {dateCellRender && dayCell.isThisMonth && (
                          <div className={`${prefixCls}__cell-content`}>
                            {dateCellRender(dayCell.date)}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  // ── render year panel ──────────────────────────────────────────────────────

  const renderYearPanel = () => {
    return (
      <div className={`${prefixCls}__months`}>
        {months.map((monthLabel, i) => {
          const monthDate = new Date(panelDate.getFullYear(), i, 1);
          const isCurrentMonth = panelDate.getMonth() === i;
          const cellCls = classNames(`${prefixCls}__month-cell`, {
            [`${prefixCls}__month-cell_selected`]: isCurrentMonth,
          });
          return (
            <div
              key={i}
              className={cellCls}
              onClick={() => handleMonthSelect(i)}
            >
              <div className={`${prefixCls}__month-inner`}>
                <span>{monthLabel}</span>
                {monthCellRender && (
                  <div className={`${prefixCls}__month-content`}>
                    {monthCellRender(monthDate)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── render decade panel ────────────────────────────────────────────────────

  const renderDecadePanel = () => {
    const currentYear = panelDate.getFullYear();
    const decadeStart = Math.floor(currentYear / 10) * 10;
    const years = Array.from({ length: 12 }, (_, i) => decadeStart - 1 + i);

    return (
      <div className={`${prefixCls}__decades`}>
        {years.map((year) => {
          const isOutOfRange = year < decadeStart || year > decadeStart + 9;
          const isCurrentYear = year === currentYear;
          const cellCls = classNames(`${prefixCls}__decade-cell`, {
            [`${prefixCls}__decade-cell_selected`]: isCurrentYear,
            [`${prefixCls}__decade-cell_out`]: isOutOfRange,
          });
          return (
            <div
              key={year}
              className={cellCls}
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </div>
          );
        })}
      </div>
    );
  };

  // ── render body ────────────────────────────────────────────────────────────

  const renderBody = () => {
    if (mode === 'decade') return renderDecadePanel();
    if (mode === 'year') return renderYearPanel();
    return renderMonthPanel();
  };

  // ── main render ────────────────────────────────────────────────────────────

  return (
    <div
      {...otherProps}
      ref={(node) => {
        (calendarRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cls}
      style={style}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {renderHeader()}
      <div className={`${prefixCls}__body`}>
        {renderBody()}
      </div>
    </div>
  );
});

Calendar.displayName = 'Calendar';
export default Calendar;
