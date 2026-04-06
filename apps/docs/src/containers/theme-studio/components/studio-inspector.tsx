import React from 'react';
import { Button, Card, Input, InputNumber, Segmented, Slider, Tag, Textarea, Typography } from '@tiny-design/react';
import { RegistryToken, prettifyTokenLabel } from '../utils/studio-registry';

interface StudioInspectorProps {
  token?: RegistryToken;
  currentValue?: string;
  onChangeValue?: (value: string) => void;
  onReset?: () => void;
}

const FONT_OPTIONS = [
  { label: 'Instrument Sans', value: '"Instrument Sans", "Inter", system-ui, sans-serif' },
  { label: 'IBM Plex Sans', value: '"IBM Plex Sans", system-ui, sans-serif' },
  { label: 'Manrope', value: '"Manrope", system-ui, sans-serif' },
  { label: 'Source Serif', value: '"Source Serif 4", Georgia, serif' },
  { label: 'JetBrains Mono', value: '"JetBrains Mono", "SFMono-Regular", monospace' },
];

function parseDimension(value: string): number | undefined {
  const match = /^(-?\d+(?:\.\d+)?)px$/.exec(value.trim());
  return match ? Number(match[1]) : undefined;
}

function getDimensionRange(token: RegistryToken) {
  if (token.key.includes('radius')) return { min: 0, max: 40, step: 1 };
  if (token.key.includes('height')) return { min: 24, max: 72, step: 1 };
  if (token.key.includes('spacing') || token.key.includes('padding')) return { min: 0, max: 48, step: 1 };
  if (token.key.includes('font-size')) return { min: 10, max: 32, step: 1 };
  if (token.key.includes('line-height')) return { min: 1, max: 2, step: 0.05 };
  if (token.key.includes('letter-spacing')) return { min: -0.05, max: 0.4, step: 0.01 };
  return { min: 0, max: 100, step: 1 };
}

function renderInput(token: RegistryToken, value: string, onChange: (next: string) => void) {
  if (token.type === 'color' && /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(value)) {
    return (
      <div className="theme-studio__token-color">
        <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
        <Input value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    );
  }

  if (token.key.includes('font-family')) {
    return (
      <div className="theme-studio__inspector-stack">
        <Segmented
          options={FONT_OPTIONS}
          value={FONT_OPTIONS.some((item) => item.value === value) ? value : undefined}
          onChange={(next) => {
            if (typeof next === 'string') onChange(next);
          }}
        />
        <Input value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    );
  }

  if (token.type === 'dimension' || token.key.includes('height') || token.key.includes('radius') || token.key.includes('padding') || token.key.includes('font-size')) {
    const parsed = parseDimension(value);
    const range = getDimensionRange(token);
    return (
      <div className="theme-studio__inspector-stack">
        {parsed != null ? (
          <Slider
            min={range.min}
            max={range.max}
            step={range.step}
            value={parsed}
            onChange={(next) => onChange(`${next}px`)}
          />
        ) : null}
        <InputNumber
          value={parsed}
          min={range.min}
          max={range.max}
          step={range.step}
          onChange={(next) => {
            if (typeof next === 'number') onChange(`${next}px`);
          }}
        />
        <Input value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    );
  }

  if (token.key.includes('line-height') || token.key.includes('letter-spacing')) {
    const parsed = Number(value);
    const range = getDimensionRange(token);
    return (
      <div className="theme-studio__inspector-stack">
        {!Number.isNaN(parsed) ? (
          <Slider
            min={range.min}
            max={range.max}
            step={range.step}
            value={parsed}
            onChange={(next) => onChange(String(next))}
          />
        ) : null}
        <InputNumber
          value={Number.isNaN(parsed) ? undefined : parsed}
          min={range.min}
          max={range.max}
          step={range.step}
          onChange={(next) => {
            if (typeof next === 'number') onChange(String(next));
          }}
        />
        <Input value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    );
  }

  if (token.type === 'shadow' || token.type === 'transition' || token.key.includes('shadow')) {
    return <Textarea rows={4} value={value} onChange={(event) => onChange(event.target.value)} />;
  }

  return <Input value={value} onChange={(event) => onChange(event.target.value)} />;
}

export const StudioInspector = ({ token, currentValue, onChangeValue, onReset }: StudioInspectorProps): React.ReactElement => {
  if (!token) {
    return (
      <Card className="theme-studio__inspector" title="Inspector">
        <Card.Content>
          <Typography.Paragraph>Select a token to inspect its metadata and effective value.</Typography.Paragraph>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card className="theme-studio__inspector" title="Inspector">
      <Card.Content>
        <div className="theme-studio__inspector-header">
          <Typography.Text strong>{prettifyTokenLabel(token.key)}</Typography.Text>
          <Tag color={token.category === 'semantic' ? 'info' : 'success'}>{token.category}</Tag>
        </div>
        <Typography.Paragraph>{token.description}</Typography.Paragraph>
        <div className="theme-studio__inspector-list">
          <div>
            <span>Token key</span>
            <code>{token.key}</code>
          </div>
          <div>
            <span>CSS var</span>
            <code>{token.cssVar}</code>
          </div>
          <div>
            <span>Current value</span>
            <code>{currentValue ?? token.defaultValue}</code>
          </div>
          <div>
            <span>Default value</span>
            <code>{token.defaultValue}</code>
          </div>
          <div>
            <span>Source</span>
            <code>{token.source}</code>
          </div>
          <div>
            <span>Control</span>
            <code>{token.type}</code>
          </div>
          <div>
            <span>Aliases</span>
            <code>{token.aliases?.length ? token.aliases.join(', ') : 'None'}</code>
          </div>
        </div>
        {currentValue && onChangeValue ? (
          <div className="theme-studio__inspector-editor">
            <Typography.Text strong>Edit Value</Typography.Text>
            {renderInput(token, currentValue, onChangeValue)}
          </div>
        ) : null}
        <div className="theme-studio__inspector-actions">
          {onReset ? <Button onClick={onReset}>Reset Token</Button> : null}
        </div>
      </Card.Content>
    </Card>
  );
};
