import React from 'react';
import { InputNumber } from '@tiny-design/react';

export default function SizeDemo() {
  return (
    <div style={{ width: 400 }}>
      <InputNumber size="sm" min={0} max={10} defaultValue={5} />
      <br />
      <InputNumber min={0} max={10} defaultValue={5} />
      <br />
      <InputNumber size="lg" min={0} max={10} defaultValue={5} />
    </div>
  );
}