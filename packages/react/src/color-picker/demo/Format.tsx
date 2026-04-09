import React from 'react';
import ColorPicker from '../index';
import type { ColorFormat } from '../types';

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
