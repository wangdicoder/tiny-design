import React from 'react';
import { InputPassword } from '@tiny-design/react';

export default function HideButtonDemo() {
  return (
    <div style={{ width: 400 }}>
      <InputPassword suffix={false} placeholder="Input password" />
    </div>
  );
}