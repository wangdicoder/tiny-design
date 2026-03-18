import React from 'react';
import { InputNumber } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <div style={{ width: 400 }}>
      <InputNumber min={0} max={10} defaultValue={5} />
    </div>
  );
}