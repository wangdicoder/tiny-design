import React from 'react';
import { InputOTP } from '@tiny-design/react';

export default function MaskDemo() {
  const [value, setValue] = React.useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8 }}>Default mask (•)</div>
        <InputOTP length={4} mask onChange={setValue} />
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>Custom mask character (*)</div>
        <InputOTP length={4} mask="*" onChange={setValue} />
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>No mask (default)</div>
        <InputOTP length={4} onChange={setValue} />
      </div>
      <p>Value: {value}</p>
    </div>
  );
}