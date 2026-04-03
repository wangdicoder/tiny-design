import React from 'react';
import { BaseProps } from '../_utils/props';

export type CalendarMode = 'month' | 'year' | 'decade';

export type SelectionMode = 'single' | 'range' | 'multiple';

export interface CalendarProps
  extends BaseProps,
    Omit<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, 'onChange' | 'onSelect' | 'defaultValue'> {
  /** Selected date (controlled, single mode) */
  defaultValue?: Date;
  /** Controlled selected date */
  value?: Date;
  /** Display mode */
  mode?: CalendarMode;
  /** Default display mode */
  defaultMode?: CalendarMode;
  /** Full-size or card mode */
  fullscreen?: boolean;
  /** Disable specific dates */
  disabledDate?: (currentDate: Date) => boolean;
  /** Callback when date is selected (single mode) */
  onChange?: (date: Date) => void;
  /** Callback when a date cell is clicked */
  onSelect?: (date: Date) => void;
  /** Callback when panel changes */
  onPanelChange?: (date: Date, mode: CalendarMode) => void;
  /** Custom render for date cell content */
  dateCellRender?: (date: Date) => React.ReactNode;
  /** Custom render for month cell content */
  monthCellRender?: (date: Date) => React.ReactNode;
  /** Custom header render */
  headerRender?: (config: {
    value: Date;
    mode: CalendarMode;
    onChange: (date: Date) => void;
    onModeChange: (mode: CalendarMode) => void;
  }) => React.ReactNode;

  // --- New Props ---

  /** Selection mode: single, range, or multiple */
  selectionMode?: SelectionMode;
  /** Controlled range value */
  rangeValue?: [Date, Date] | null;
  /** Default range value */
  defaultRangeValue?: [Date, Date] | null;
  /** Range change callback */
  onRangeChange?: (range: [Date, Date] | null) => void;
  /** Controlled multi-select value */
  multipleValue?: Date[];
  /** Default multi-select value */
  defaultMultipleValue?: Date[];
  /** Multi-select change callback */
  onMultipleChange?: (dates: Date[]) => void;
  /** First day of week (0=Sun, 1=Mon, ...) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Show ISO week number column */
  showWeekNumber?: boolean;
  /** Show "Today" button in header */
  showToday?: boolean;
  /** Restrict navigable/selectable date range */
  validRange?: [Date, Date];
  /** Per-cell custom class name */
  cellClassName?: (date: Date) => string | undefined;
  /** Per-cell custom inline style */
  cellStyle?: (date: Date) => React.CSSProperties | undefined;
  /** Dot indicator: return true for primary color, or a color string */
  dotRender?: (date: Date) => boolean | string;
  /** Fires when the displayed month changes via navigation */
  onMonthChange?: (date: Date) => void;
  /** Fires when the displayed year changes via navigation */
  onYearChange?: (date: Date) => void;
}
