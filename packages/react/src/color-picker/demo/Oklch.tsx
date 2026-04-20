import React from 'react';
import ColorPicker from '../index';
import type { ColorChangeMeta, ColorFormat } from '../types';

export default function OklchDemo() {
  const format: ColorFormat = 'oklch';
  const [color, setColor] = React.useState('oklch(0.667 0.178 258.4)');
  const [meta, setMeta] = React.useState<ColorChangeMeta | null>(null);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <ColorPicker
          value={color}
          format={format}
          formats={['hex', 'rgb', 'oklch']}
          onChange={(next: string, nextMeta: ColorChangeMeta) => {
            setColor(next);
            setMeta(nextMeta);
          }}
        />
        <span>Value: {color}</span>
      </div>
      <pre style={{ margin: 0, padding: 12, fontSize: 12, borderRadius: 8, background: 'var(--ty-color-fill-secondary, rgba(0,0,0,0.04))' }}>
        {JSON.stringify(meta, null, 2)}
      </pre>
    </div>
  );
}
