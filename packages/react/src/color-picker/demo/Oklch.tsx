import React from 'react';
import { ColorPicker } from '@tiny-design/react';
import type { ColorChangeMeta } from '@tiny-design/react';

export default function OklchDemo() {
  const [color, setColor] = React.useState('oklch(0.667 0.178 258.4)');
  const [meta, setMeta] = React.useState<ColorChangeMeta | null>(null);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <ColorPicker
          value={color}
          format="oklch"
          formats={['hex', 'rgb', 'oklch']}
          onChange={(next, nextMeta) => {
            setColor(next);
            setMeta(nextMeta);
          }}
        />
        <span>Value: {color}</span>
      </div>
      <pre style={{ margin: 0, padding: 12, fontSize: 12, borderRadius: 8, background: 'var(--ty-color-fill-2, rgba(0,0,0,0.04))' }}>
        {JSON.stringify(meta, null, 2)}
      </pre>
    </div>
  );
}
