import React from 'react';
import { ColorPicker } from '@tiny-design/react';

export default function AlphaDemo() {
  const [color, setColor] = React.useState('#6e41bf');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <ColorPicker value={color} onChange={setColor} showAlpha />
      <span>{color}</span>
    </div>
  );
}