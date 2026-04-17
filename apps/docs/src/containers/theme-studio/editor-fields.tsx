import React from 'react';
import { ColorPicker, Input, InputNumber, Slider, Textarea } from '@tiny-design/react';
import { formatShadowValue, parseShadowValue, type ShadowValue } from './color-utils';
import type { SliderFieldConfig } from './types';

export function swatchTextStyle(background: string, foreground: string): React.CSSProperties {
  return {
    background,
    color: foreground,
  };
}

function parseSliderValue(value: string, unit?: 'px' | 'em' | 'rem'): number | undefined {
  const trimmed = value.trim();

  // CSS zero is unit-agnostic. Presets may serialize it as `0px` while the
  // editor slider expects `rem`, so normalize all zero forms to numeric 0.
  if (/^-?0(?:\.0+)?(?:px|em|rem)?$/.test(trimmed)) {
    return 0;
  }

  if (unit === 'px') {
    const match = /^(-?\d+(?:\.\d+)?)px$/.exec(trimmed);
    return match ? Number(match[1]) : undefined;
  }

  if (unit === 'em') {
    const match = /^(-?\d+(?:\.\d+)?)em$/.exec(trimmed);
    return match ? Number(match[1]) : undefined;
  }

  if (unit === 'rem') {
    const match = /^(-?\d+(?:\.\d+)?)rem$/.exec(trimmed);
    return match ? Number(match[1]) : undefined;
  }

  const parsed = Number(trimmed);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function formatSliderValue(value: number, unit?: 'px' | 'em' | 'rem'): string {
  if (!unit) return String(value);
  return `${value}${unit}`;
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
}): React.ReactElement {
  return (
    <div className="theme-studio__field">
      <span className="theme-studio__field-label">{label}</span>
      <div className="theme-studio__color-field">
        <ColorPicker
          value={value}
          onChange={onChange}
          presets={[
            '#000000',
            '#ffffff',
            '#1e9df1',
            '#0f1419',
            '#e11d48',
            '#22c55e',
            '#f59e0b',
            '#8b5cf6',
          ]}
        />
        <Input value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  multiline?: boolean;
}): React.ReactElement {
  return (
    <label className="theme-studio__field">
      <span className="theme-studio__field-label">{label}</span>
      {multiline ? (
        <Textarea rows={3} value={value} onChange={(next) => onChange(next)} />
      ) : (
        <Input value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

export function SliderField({
  label,
  value,
  onChange,
  config,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  config: SliderFieldConfig;
}): React.ReactElement {
  const parsed = parseSliderValue(value, config.unit);

  return (
    <label className="theme-studio__field">
      <div className="theme-studio__field-row">
        <span className="theme-studio__field-label">{label}</span>
        <span className="theme-studio__field-value">{value}</span>
      </div>
      <div className="theme-studio__slider-field">
        <Slider
          min={config.min}
          max={config.max}
          step={config.step}
          value={parsed ?? config.min}
          onChange={(next) => {
            if (typeof next === 'number') onChange(formatSliderValue(next, config.unit));
          }}
        />
        <InputNumber
          value={parsed}
          min={config.min}
          max={config.max}
          step={config.step}
          onChange={(next) => {
            if (typeof next === 'number') onChange(formatSliderValue(next, config.unit));
          }}
        />
      </div>
    </label>
  );
}

function ShadowMetricField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (next: number) => void;
}): React.ReactElement {
  return (
    <label className="theme-studio__field theme-studio__shadow-metric">
      <div className="theme-studio__field-row">
        <span className="theme-studio__shadow-metric-label">{label}</span>
        <span className="theme-studio__field-value">
          {unit ? `${value}${unit}` : String(value)}
        </span>
      </div>
      <div className="theme-studio__slider-field">
        <Slider
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(next) => typeof next === 'number' && onChange(next)}
        />
        <InputNumber
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(next) => typeof next === 'number' && onChange(next)}
        />
      </div>
    </label>
  );
}

export function ShadowField({
  label,
  value,
  onChange,
  fallback,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  fallback: ShadowValue;
}): React.ReactElement {
  const parsed = React.useMemo(() => parseShadowValue(value, fallback), [fallback, value]);

  const updateShadow = (patch: Partial<ShadowValue>) => {
    onChange(
      formatShadowValue({
        ...parsed,
        ...patch,
      })
    );
  };

  return (
    <div className="theme-studio__field theme-studio__shadow-field">
      <span className="theme-studio__field-label">{label}</span>
      <div className="theme-studio__shadow-editor">
        <div className="theme-studio__shadow-color-row">
          <span className="theme-studio__shadow-color-label">Color</span>
          <div className="theme-studio__color-field">
            <ColorPicker
              value={parsed.color}
              onChange={(next) => updateShadow({ color: next })}
              presets={[
                '#000000',
                '#ffffff',
                '#1e9df1',
                '#0f1419',
                '#e11d48',
                '#22c55e',
                '#f59e0b',
                '#8b5cf6',
              ]}
            />
            <Input
              value={parsed.color}
              onChange={(event) => updateShadow({ color: event.target.value })}
            />
          </div>
        </div>
        <ShadowMetricField
          label="Opacity"
          value={parsed.opacity}
          min={0}
          max={1}
          step={0.01}
          onChange={(next) => updateShadow({ opacity: next })}
        />
        <ShadowMetricField
          label="Blur"
          value={parsed.blur}
          min={0}
          max={32}
          step={1}
          unit="px"
          onChange={(next) => updateShadow({ blur: next })}
        />
        <ShadowMetricField
          label="Spread"
          value={parsed.spread}
          min={-16}
          max={32}
          step={1}
          unit="px"
          onChange={(next) => updateShadow({ spread: next })}
        />
        <ShadowMetricField
          label="Offset X"
          value={parsed.offsetX}
          min={-32}
          max={32}
          step={1}
          unit="px"
          onChange={(next) => updateShadow({ offsetX: next })}
        />
        <ShadowMetricField
          label="Offset Y"
          value={parsed.offsetY}
          min={-32}
          max={32}
          step={1}
          unit="px"
          onChange={(next) => updateShadow({ offsetY: next })}
        />
      </div>
    </div>
  );
}
