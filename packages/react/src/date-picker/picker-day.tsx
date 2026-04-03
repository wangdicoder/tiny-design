import classNames from 'classnames';
import { getMonthDaysArray, isDateInRange, isSameDate, isToday } from './utils';
import type { DateRangeValue } from './types';

export type PickerDayProps = {
  date: Date | null;
  range?: boolean;
  rangeValue?: DateRangeValue;
  hoverDate?: Date | null;
  panelDate: Date;
  weeks: string[];
  disabledDate?: (current: Date) => boolean;
  onChange: (date: Date) => void;
  onHoverDateChange?: (date: Date | null) => void;
  panelOnChange: (panelDate: Date) => void;
  prefixCls: string;
};

const PickerDay = (props: PickerDayProps) => {
  const {
    prefixCls,
    date,
    range = false,
    rangeValue,
    hoverDate,
    weeks,
    onChange,
    onHoverDateChange,
    panelDate,
    panelOnChange,
    disabledDate,
  } = props;
  const panelDays = getMonthDaysArray(panelDate);
  const [rangeStart, rangeEnd] = rangeValue ?? [null, null];
  const previewStart = rangeStart && !rangeEnd ? rangeStart : null;
  const previewEnd = rangeStart && !rangeEnd && hoverDate ? hoverDate : null;

  const handleClick = (dayCell: typeof panelDays[0]) => {
    if (disabledDate?.(dayCell.date)) return;
    onChange(dayCell.date);
    if (!dayCell.isThisMonth) panelOnChange(dayCell.date);
  };

  return (
    <div className={`${prefixCls}__body`}>
      <table className={`${prefixCls}__table`}>
        <thead>
          <tr>
            {weeks.map((week, i) => (
              <th key={i} className={`${prefixCls}__cell-header`}>
                {week}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: panelDays.length / 7 }, (_, row) => (
            <tr key={row}>
              {panelDays.slice(row * 7, row * 7 + 7).map((dayCell, col) => {
                const isDisabled = disabledDate?.(dayCell.date) ?? false;
                const isSelected = !range && date && isSameDate(date, dayCell.date);
                const isRangeStart = !!(rangeStart && isSameDate(rangeStart, dayCell.date));
                const isRangeEnd = !!(rangeEnd && isSameDate(rangeEnd, dayCell.date));
                const isPreviewStart = !!(previewStart && isSameDate(previewStart, dayCell.date));
                const isPreviewEnd = !!(previewEnd && isSameDate(previewEnd, dayCell.date));
                const hasFullRange = !!(rangeStart && rangeEnd);
                const hasPreviewRange = !!(previewStart && previewEnd);
                const isInRange = hasFullRange && rangeStart && rangeEnd
                  ? isDateInRange(dayCell.date, rangeStart, rangeEnd)
                  : false;
                const isInPreviewRange = hasPreviewRange && previewStart && previewEnd
                  ? isDateInRange(dayCell.date, previewStart, previewEnd)
                  : false;
                const cls = classNames(`${prefixCls}__cell`, {
                  [`${prefixCls}__cell_in-view`]: dayCell.isThisMonth,
                  [`${prefixCls}__cell_today`]: isToday(dayCell.date),
                  [`${prefixCls}__cell_selected`]: isSelected,
                  [`${prefixCls}__cell_range-start`]: isRangeStart || (isPreviewStart && !rangeEnd),
                  [`${prefixCls}__cell_range-end`]: isRangeEnd || (isPreviewEnd && !rangeEnd),
                  [`${prefixCls}__cell_in-range`]: isInRange,
                  [`${prefixCls}__cell_in-preview-range`]: !hasFullRange && isInPreviewRange,
                  [`${prefixCls}__cell_disabled`]: isDisabled,
                });
                return (
                  <td
                    key={col}
                    className={cls}
                    onClick={() => handleClick(dayCell)}
                    onMouseEnter={() => !isDisabled && onHoverDateChange?.(dayCell.date)}
                    onMouseLeave={() => onHoverDateChange?.(null)}>
                    <div className={`${prefixCls}__cell-inner`}>
                      {dayCell.label}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PickerDay;
