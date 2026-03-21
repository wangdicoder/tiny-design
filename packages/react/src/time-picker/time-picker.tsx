import { useEffect, useState, useRef, useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { useLocale } from '../_utils/use-locale';
import { ClockIcon, ClearIcon } from '../_utils/components';
import Popup from '../popup';
import TimePanel from './time-panel';
import { TimePickerProps } from './types';

interface PendingTime {
  h: number | null;
  m: number | null;
  s: number | null;
}

const EMPTY_PENDING: PendingTime = { h: null, m: null, s: null };

function formatTime(date: Date, format: string, use12Hours: boolean): string {
  let h = date.getHours();
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  let period = '';

  if (use12Hours) {
    period = h >= 12 ? ' PM' : ' AM';
    h = h % 12 || 12;
  }

  return format
    .replace('HH', String(h).padStart(2, '0'))
    .replace('H', String(h))
    .replace('mm', m)
    .replace('ss', s) + period;
}

function generateSteps(count: number, step: number): number[] {
  const items: number[] = [];
  for (let i = 0; i < count; i += step) {
    items.push(i);
  }
  return items;
}

function showsSeconds(format: string): boolean {
  return format.includes('ss') || format.includes('s');
}

function showsMinutes(format: string): boolean {
  return format.includes('mm') || format.includes('m');
}

const TimePicker = (props: TimePickerProps): React.ReactElement => {
  const locale = useLocale();
  const {
    defaultValue,
    value,
    open: controlledOpen,
    format = 'HH:mm:ss',
    use12Hours = false,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    disabled = false,
    placeholder = locale.TimePicker.selectTime,
    allowClear = true,
    size = 'md',
    inputReadOnly = true,
    disabledTime,
    hideDisabledOptions = false,
    loop = false,
    showNow = true,
    renderExtraFooter,
    suffixIcon,
    onChange,
    onOpenChange,
    className,
    style,
    prefixCls: customisedCls,
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('time-picker', configContext.prefixCls, customisedCls);

  const [date, setDate] = useState<Date | null>(value ?? defaultValue ?? null);
  const [pending, setPending] = useState<PendingTime>(EMPTY_PENDING);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen ?? open;

  // Controlled value
  useEffect(() => {
    if (value !== undefined) setDate(value);
  }, [value]);

  useEffect(() => {
    if (controlledOpen !== undefined) setOpen(controlledOpen);
  }, [controlledOpen]);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (wrapperRef.current?.contains(target) || dropdownRef.current?.contains(target)) return;
      if (controlledOpen === undefined) setOpen(false);
      onOpenChange?.(false);
      setPending(EMPTY_PENDING);
    };
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [controlledOpen, onOpenChange]);

  const toggleOpen = useCallback((val: boolean) => {
    if (controlledOpen === undefined) setOpen(val);
    onOpenChange?.(val);
    if (!val) setPending(EMPTY_PENDING);
  }, [controlledOpen, onOpenChange]);

  /** Build a Date from committed date + pending overrides */
  const buildDate = useCallback((p: PendingTime): Date => {
    const base = date ? new Date(date) : new Date(0, 0, 0, 0, 0, 0, 0);
    if (p.h !== null) base.setHours(p.h);
    if (p.m !== null) base.setMinutes(p.m);
    if (p.s !== null) base.setSeconds(p.s);
    return base;
  }, [date]);

  const updatePending = useCallback((type: 'h' | 'm' | 's', num: number) => {
    setPending((prev) => ({ ...prev, [type]: num }));
  }, []);

  const commit = useCallback((newDate: Date) => {
    if (value === undefined) setDate(newDate);
    onChange?.(newDate);
    setPending(EMPTY_PENDING);
  }, [value, onChange]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value === undefined) setDate(null);
    onChange?.(null);
    setPending(EMPTY_PENDING);
    toggleOpen(false);
  };

  const handleNow = () => {
    const now = new Date();
    commit(now);
    toggleOpen(false);
  };

  const handleOk = () => {
    if (pending.h !== null || pending.m !== null || pending.s !== null) {
      commit(buildDate(pending));
    }
    toggleOpen(false);
  };

  // Disabled time calculation — use pending values when available
  const effectiveHour = pending.h ?? date?.getHours() ?? 0;
  const effectiveMinute = pending.m ?? date?.getMinutes() ?? 0;

  const disabled12 = useMemo(() => disabledTime?.() ?? {}, [disabledTime]);
  const disabledHours = useMemo(() => disabled12.disabledHours?.() ?? [], [disabled12]);
  const disabledMinutes = useMemo(
    () => disabled12.disabledMinutes?.(effectiveHour) ?? [],
    [disabled12, effectiveHour]
  );
  const disabledSeconds = useMemo(
    () => disabled12.disabledSeconds?.(effectiveHour, effectiveMinute) ?? [],
    [disabled12, effectiveHour, effectiveMinute]
  );

  const hours = generateSteps(24, hourStep);
  const minutes = generateSteps(60, minuteStep);
  const seconds = generateSteps(60, secondStep);

  const filteredHours = hideDisabledOptions ? hours.filter((h) => !disabledHours.includes(h)) : hours;
  const filteredMinutes = hideDisabledOptions ? minutes.filter((m) => !disabledMinutes.includes(m)) : minutes;
  const filteredSeconds = hideDisabledOptions ? seconds.filter((s) => !disabledSeconds.includes(s)) : seconds;

  const hasPending = pending.h !== null || pending.m !== null || pending.s !== null;
  const previewDate = hasPending ? buildDate(pending) : null;
  const effectiveDate = previewDate ?? date;
  const hasValue = effectiveDate !== null;
  const displayValue = hasValue ? formatTime(effectiveDate, format, use12Hours) : '';

  const cls = classNames(prefixCls, className, `${prefixCls}_${size}`, {
    [`${prefixCls}_disabled`]: disabled,
    [`${prefixCls}_open`]: isOpen,
    [`${prefixCls}_has-value`]: hasValue,
    [`${prefixCls}_pending`]: hasPending,
  });

  const renderOverlay = () => (
    <div className={`${prefixCls}__dropdown`} ref={dropdownRef}>
      <div className={`${prefixCls}__panel`}>
        <TimePanel
          prefixCls={prefixCls}
          value={date?.getHours() ?? null}
          pendingValue={pending.h}
          items={filteredHours}
          disabledItems={hideDisabledOptions ? [] : disabledHours}
          loop={loop}
          onChange={(h) => updatePending('h', h)}
        />
        {showsMinutes(format) && (
          <TimePanel
            prefixCls={prefixCls}
            value={date?.getMinutes() ?? null}
            pendingValue={pending.m}
            items={filteredMinutes}
            disabledItems={hideDisabledOptions ? [] : disabledMinutes}
            loop={loop}
            onChange={(m) => updatePending('m', m)}
          />
        )}
        {showsSeconds(format) && (
          <TimePanel
            prefixCls={prefixCls}
            value={date?.getSeconds() ?? null}
            pendingValue={pending.s}
            items={filteredSeconds}
            disabledItems={hideDisabledOptions ? [] : disabledSeconds}
            loop={loop}
            onChange={(s) => updatePending('s', s)}
          />
        )}
      </div>
      <div className={`${prefixCls}__footer`}>
        {renderExtraFooter && <div className={`${prefixCls}__extra-footer`}>{renderExtraFooter()}</div>}
        <div className={`${prefixCls}__footer-actions`}>
          {showNow && <a className={`${prefixCls}__now-btn`} onClick={handleNow}>{locale.TimePicker.now}</a>}
          <button type="button" className={`${prefixCls}__ok-btn`} onClick={handleOk}>{locale.TimePicker.okText}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cls} style={style} ref={wrapperRef}>
      <Popup
        trigger="manual"
        placement="bottom-start"
        arrow={false}
        visible={isOpen}
        content={renderOverlay()}>
        <div
          className={`${prefixCls}__input`}
          onClick={() => !disabled && toggleOpen(!isOpen)}>
          <input
            className={`${prefixCls}__input-field`}
            readOnly={inputReadOnly}
            disabled={disabled}
            placeholder={placeholder}
            value={displayValue}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            onKeyDown={(e) => {
              if (e.key === 'Escape' && isOpen) toggleOpen(false);
            }}
          />
          <span className={`${prefixCls}__suffix`}>
            {allowClear && hasValue && !disabled ? (
              <button type="button" className={`${prefixCls}__clear`} onClick={handleClear} aria-label="Clear time">
                <ClearIcon size="1em" />
              </button>
            ) : null}
            <span className={`${prefixCls}__icon`}>
              {suffixIcon ?? <ClockIcon size="1em" />}
            </span>
          </span>
        </div>
      </Popup>
    </div>
  );
};

TimePicker.displayName = 'TimePicker';

export default TimePicker;
