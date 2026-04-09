import React from 'react';
import { ColorPicker } from '@tiny-design/react';
import type { ColorFormat } from '@tiny-design/react';

export default function FormatDemo() {
  const [color, setColor] = React.useState('#1890ff');
  const [format, setFormat] = React.useState<ColorFormat>('hex');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <ColorPicker
        value={color}
        format={format}
        onChange={setColor}
        onFormatChange={setFormat}
      />
      <span>
        Format: <strong>{format}</strong>
      </span>
      <span>Value: {color}</span>
    </div>
  );
}
