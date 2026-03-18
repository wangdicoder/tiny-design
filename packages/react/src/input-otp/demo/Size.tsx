import React from 'react';
import { InputOTP } from '@tiny-design/react';

export default function SizeDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InputOTP size="sm" length={4} />
      <InputOTP size="md" length={4} />
      <InputOTP size="lg" length={4} />
    </div>
  );
}