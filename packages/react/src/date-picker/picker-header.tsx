import { PanelMode } from './types';

export type PickerHeaderProps = {
  date: Date;
  mode: PanelMode;
  months: string[];
  onChange: (date: Date) => void;
  onModeChange: (mode: PanelMode) => void;
  prefixCls: string;
};

const PickerHeader = ({ date, mode, months, onChange, onModeChange, prefixCls }: PickerHeaderProps) => {
  const year = date.getFullYear();
  const startDecade = year - (year % 10);

  const step = (dir: -1 | 1, unit: 'month' | 'year' | 'decade') => {
    const y = date.getFullYear();
    const m = date.getMonth();
    if (unit === 'decade') onChange(new Date(y + dir * 10, m, 1));
    else if (unit === 'year') onChange(new Date(y + dir, m, 1));
    else {
      const next = new Date(y, m + dir, 1);
      onChange(next);
    }
  };

  const yearUnit = mode === 'year' ? 'decade' : 'year';

  return (
    <div className={`${prefixCls}__header`}>
      <button
        type="button"
        className={`${prefixCls}__header-btn`}
        onClick={() => step(-1, yearUnit)}
        aria-label="Previous year">
        «
      </button>
      {mode === 'date' && (
        <button
          type="button"
          className={`${prefixCls}__header-btn`}
          onClick={() => step(-1, 'month')}
          aria-label="Previous month">
          ‹
        </button>
      )}
      <div className={`${prefixCls}__header-caption`}>
        {mode === 'year' ? (
          <span className={`${prefixCls}__header-label`}>
            {startDecade} – {startDecade + 9}
          </span>
        ) : mode === 'month' ? (
          <button
            type="button"
            className={`${prefixCls}__header-label`}
            onClick={() => onModeChange('year')}>
            {year}
          </button>
        ) : (
          <>
            <button
              type="button"
              className={`${prefixCls}__header-label`}
              onClick={() => onModeChange('month')}>
              {months[date.getMonth()]}
            </button>
            <button
              type="button"
              className={`${prefixCls}__header-label`}
              onClick={() => onModeChange('year')}>
              {year}
            </button>
          </>
        )}
      </div>
      {mode === 'date' && (
        <button
          type="button"
          className={`${prefixCls}__header-btn`}
          onClick={() => step(1, 'month')}
          aria-label="Next month">
          ›
        </button>
      )}
      <button
        type="button"
        className={`${prefixCls}__header-btn`}
        onClick={() => step(1, yearUnit)}
        aria-label="Next year">
        »
      </button>
    </div>
  );
};

export default PickerHeader;
