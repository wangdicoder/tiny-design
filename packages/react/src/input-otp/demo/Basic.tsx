import React from 'react';
import { InputOTP } from '@tiny-design/react';

export default function BasicDemo() {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <InputOTP onChange={(val) => setValue(val)} />
      <p>Entered: {value}</p>
    </div>
  );
}