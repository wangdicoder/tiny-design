import React, { useState, useEffect, useRef, useContext, useCallback, useId } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import Popup from '../popup';
import { ColorPickerProps, Color, ColorFormat, ColorChangeMeta } from './types';
import { parseColor, formatColor, hsbToHex } from './utils';

const DEFAULT_FORMATS: ColorFormat[] = ['hex', 'rgb', 'hsb', 'oklch'];

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>((props, _ref) => {
  const {
    defaultValue = '#6e41bf',
    presets,
    showAlpha = false,
    disabled = false,
    trigger = 'click',
    defaultFormat = 'hex',
    formats = DEFAULT_FORMATS,
    prefixCls: customisedCls,
    className,
    style,
    onChange,
    onChangeComplete,
    onFormatChange,
    onOpenChange,
    children,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('color-picker', configContext.prefixCls, customisedCls);

  const [color, setColor] = useState<Color>(() =>
    parseColor('value' in props ? (props.value as string) : defaultValue)
  );
  const [format, setFormat] = useState<ColorFormat>(
    'format' in props ? (props.format as ColorFormat) : defaultFormat
  );
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);

  const spectrumRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<Color>(color);
  const popupId = useId();

  const isOpen = ('open' in props ? (props.open as boolean) : undefined) ?? open;
  const controlledOpen = 'open' in props ? (props.open as boolean) : undefined;
  const availableFormats = formats.length > 0 ? formats : DEFAULT_FORMATS;
  const getMeta = useCallback(
    (nextColor: Color, nextFormat: ColorFormat = format): ColorChangeMeta => ({
      color: nextColor,
      format: nextFormat,
    }),
    [format]
  );

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    if ('value' in props && props.value) {
      setColor(parseColor(props.value));
    }
  }, [props.value]);

  useEffect(() => {
    if ('format' in props) setFormat(props.format as ColorFormat);
  }, [props.format]);

  useEffect(() => {
    if ('open' in props) setOpen(props.open as boolean);
  }, [props.open]);

  const emitChange = useCallback(
    (c: Color, nextFormat: ColorFormat = format) => {
      const formatted = formatColor(c, nextFormat);
      onChange?.(formatted, getMeta(c, nextFormat));
    },
    [format, getMeta, onChange]
  );

  const emitChangeComplete = useCallback(
    (c: Color, nextFormat: ColorFormat = format) => {
      const formatted = formatColor(c, nextFormat);
      onChangeComplete?.(formatted, getMeta(c, nextFormat));
    },
    [format, getMeta, onChangeComplete]
  );

  const updateColor = (updates: Partial<Color>) => {
    const newColor = { ...color, ...updates };
    if (!('value' in props)) {
      setColor(newColor);
    }
    emitChange(newColor);
  };

  const handleSpectrumMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setDragging(true);
    updateSpectrumFromEvent(e.nativeEvent);
  };

  const handleSpectrumTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    setDragging(true);
    updateSpectrumFromEvent(e.nativeEvent);
  };

  const getClientPos = (e: MouseEvent | TouchEvent | React.MouseEvent['nativeEvent']) => {
    if ('touches' in e) {
      const touch = e.touches[0] ?? e.changedTouches[0];
      return { clientX: touch?.clientX ?? 0, clientY: touch?.clientY ?? 0 };
    }
    return { clientX: e.clientX, clientY: e.clientY };
  };

  const updateSpectrumFromEvent = (e: MouseEvent | TouchEvent | React.MouseEvent['nativeEvent']) => {
    const rect = spectrumRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { clientX, clientY } = getClientPos(e);
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    const s = Math.round((x / rect.width) * 100);
    const b = Math.round(100 - (y / rect.height) * 100);
    updateColor({ s, b });
  };

  const addDragListeners = (
    handleMove: (ev: MouseEvent | TouchEvent) => void,
    handleUp: () => void
  ) => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleUp);
  };

  const removeDragListeners = (
    handleMove: (ev: MouseEvent | TouchEvent) => void,
    handleUp: () => void
  ) => {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleUp);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleUp);
  };

  const handleHueMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    updateHueFromEvent(e.nativeEvent);
    const handleMove = (ev: MouseEvent | TouchEvent) => updateHueFromEvent(ev);
    const handleUp = () => {
      removeDragListeners(handleMove, handleUp);
      emitChangeComplete(colorRef.current);
    };
    addDragListeners(handleMove, handleUp);
  };

  const handleHueTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    updateHueFromEvent(e.nativeEvent);
    const handleMove = (ev: MouseEvent | TouchEvent) => updateHueFromEvent(ev);
    const handleUp = () => {
      removeDragListeners(handleMove, handleUp);
      emitChangeComplete(colorRef.current);
    };
    addDragListeners(handleMove, handleUp);
  };

  const updateHueFromEvent = (e: MouseEvent | TouchEvent | React.MouseEvent['nativeEvent']) => {
    const rect = hueRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { clientX } = getClientPos(e);
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const h = Math.round((x / rect.width) * 360);
    updateColor({ h });
  };

  const handleAlphaMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    updateAlphaFromEvent(e.nativeEvent);
    const handleMove = (ev: MouseEvent | TouchEvent) => updateAlphaFromEvent(ev);
    const handleUp = () => {
      removeDragListeners(handleMove, handleUp);
      emitChangeComplete(colorRef.current);
    };
    addDragListeners(handleMove, handleUp);
  };

  const handleAlphaTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    updateAlphaFromEvent(e.nativeEvent);
    const handleMove = (ev: MouseEvent | TouchEvent) => updateAlphaFromEvent(ev);
    const handleUp = () => {
      removeDragListeners(handleMove, handleUp);
      emitChangeComplete(colorRef.current);
    };
    addDragListeners(handleMove, handleUp);
  };

  const updateAlphaFromEvent = (e: MouseEvent | TouchEvent | React.MouseEvent['nativeEvent']) => {
    const rect = alphaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { clientX } = getClientPos(e);
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const a = Math.round((x / rect.width) * 100) / 100;
    updateColor({ a });
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e: MouseEvent | TouchEvent) => updateSpectrumFromEvent(e);
    const handleUp = () => {
      setDragging(false);
      emitChangeComplete(colorRef.current);
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
    };
  }, [dragging, emitChangeComplete]);

  const handleFormatChange = () => {
    const idx = availableFormats.indexOf(format);
    const currentIdx = idx === -1 ? 0 : idx;
    const next = availableFormats[(currentIdx + 1) % availableFormats.length];
    if (!('format' in props)) setFormat(next);
    onFormatChange?.(next);
    emitChange(color, next);
  };

  const handlePresetClick = (preset: string) => {
    const c = parseColor(preset);
    if (!('value' in props)) setColor(c);
    emitChange(c);
    emitChangeComplete(c);
  };

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_disabled`]: disabled,
  });

  const hexColor = hsbToHex(color);
  const hueColor = hsbToHex({ h: color.h, s: 100, b: 100, a: 1 });

  const renderPanel = () => (
    <div id={popupId} role="dialog" aria-modal="false" className={`${prefixCls}__panel`}>
      <div
        ref={spectrumRef}
        className={`${prefixCls}__spectrum`}
        style={{ backgroundColor: hueColor }}
        onMouseDown={handleSpectrumMouseDown}
        onTouchStart={handleSpectrumTouchStart}
      >
        <div className={`${prefixCls}__spectrum-white`} />
        <div className={`${prefixCls}__spectrum-black`} />
        <div
          className={`${prefixCls}__spectrum-handle`}
          style={{
            left: `${color.s}%`,
            top: `${100 - color.b}%`,
            backgroundColor: hexColor,
          }}
        />
      </div>

      <div className={`${prefixCls}__controls`}>
        <div className={`${prefixCls}__preview`} style={{ backgroundColor: hexColor }} />
        <div className={`${prefixCls}__sliders`}>
          <div
            ref={hueRef}
            className={`${prefixCls}__hue`}
            onMouseDown={handleHueMouseDown}
            onTouchStart={handleHueTouchStart}
          >
            <div
              className={`${prefixCls}__slider-handle`}
              style={{ left: `${(color.h / 360) * 100}%` }}
            />
          </div>
          {showAlpha && (
            <div
              ref={alphaRef}
              className={`${prefixCls}__alpha`}
              onMouseDown={handleAlphaMouseDown}
              onTouchStart={handleAlphaTouchStart}
              style={{
                background: `linear-gradient(to right, transparent, ${hsbToHex({ ...color, a: 1 })})`,
              }}
            >
              <div
                className={`${prefixCls}__slider-handle`}
                style={{ left: `${color.a * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <div className={`${prefixCls}__input-row`}>
        <button
          type="button"
          className={`${prefixCls}__format-btn`}
          onClick={handleFormatChange}
        >
          {format.toUpperCase()}
        </button>
        <input
          className={`${prefixCls}__hex-input`}
          value={formatColor(color, format)}
          onChange={(e) => {
            const c = parseColor(e.target.value);
            if (!('value' in props)) setColor(c);
            emitChange(c);
          }}
        />
      </div>

      {presets && presets.length > 0 && (
        <div className={`${prefixCls}__presets`}>
          {presets.map((preset, i) => (
            <div
              key={i}
              className={`${prefixCls}__preset`}
              style={{ backgroundColor: preset }}
              onClick={() => handlePresetClick(preset)}
              title={preset}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div {...otherProps} ref={wrapperRef} className={cls} style={style}>
      <Popup
        trigger={trigger}
        disabled={disabled}
        placement="bottom"
        arrow={false}
        visible={isOpen}
        onVisibleChange={(nextOpen) => {
          if (controlledOpen === undefined) {
            setOpen(nextOpen);
          }
          onOpenChange?.(nextOpen);
        }}
        content={renderPanel()}>
        <div
          className={`${prefixCls}__trigger`}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={isOpen ? popupId : undefined}
          onKeyDown={(e) => {
            if (disabled) {
              return;
            }

            if ((e.key === 'Enter' || e.key === ' ') && !isOpen) {
              e.preventDefault();
              if (controlledOpen === undefined) {
                setOpen(true);
              }
              onOpenChange?.(true);
              return;
            }

            if (e.key === 'Escape' && isOpen) {
              e.preventDefault();
              if (controlledOpen === undefined) {
                setOpen(false);
              }
              onOpenChange?.(false);
            }
          }}
        >
          {children || (
            <div className={`${prefixCls}__swatch`}>
              <div
                className={`${prefixCls}__swatch-inner`}
                style={{ backgroundColor: hexColor }}
              />
            </div>
          )}
        </div>
      </Popup>
    </div>
  );
});

ColorPicker.displayName = 'ColorPicker';
export default ColorPicker;
