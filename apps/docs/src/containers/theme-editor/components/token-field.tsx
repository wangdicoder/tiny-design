import React from 'react';
import { ColorPicker, InputNumber, Select, Slider } from '@tiny-design/react';
import { TokenDef } from '../constants/default-tokens';

interface TokenFieldProps {
  token: TokenDef;
  value: string;
  isOverridden: boolean;
  onChange: (value: string) => void;
  onReset: () => void;
}

export const TokenField = ({
  token,
  value,
  isOverridden,
  onChange,
  onReset,
}: TokenFieldProps): React.ReactElement => {
  const renderEditor = () => {
    switch (token.type) {
      case 'color':
        return (
          <ColorPicker
            value={value}
            onChange={(hex: string) => onChange(hex)}
            trigger="click"
          />
        );

      case 'size':
        return (
          <div className="theme-editor__size-field">
            <Slider
              value={parseFloat(value)}
              min={token.min}
              max={token.max}
              step={token.step}
              onChange={(v: number) => onChange(`${v}${token.unit || 'px'}`)}
            />
            <span className="theme-editor__size-value">{value}</span>
          </div>
        );

      case 'number':
        return (
          <InputNumber
            value={parseFloat(value)}
            min={token.min}
            max={token.max}
            step={token.step}
            size="sm"
            onChange={(v: number | null) => v != null && onChange(String(v))}
          />
        );

      case 'select':
        return (
          <Select
            value={value}
            size="sm"
            onChange={(v: string) => onChange(v)}
            style={{ width: '100%' }}
          >
            {token.options?.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );

      case 'text':
        return (
          <input
            className="theme-editor__text-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="theme-editor__field">
      <div className="theme-editor__field-header">
        <label className="theme-editor__field-label">{token.label}</label>
        {isOverridden && (
          <button
            className="theme-editor__field-reset"
            onClick={onReset}
            title="Reset to default"
          >
            Reset
          </button>
        )}
      </div>
      <div className="theme-editor__field-editor">{renderEditor()}</div>
    </div>
  );
};
