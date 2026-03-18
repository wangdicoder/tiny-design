import React from 'react';
import { InputOTP } from '@tiny-design/react';

export default function AutoFocusDemo() {
  return (
    <div>
      <InputOTP length={4} autoFocus />
    </div>
  );
}