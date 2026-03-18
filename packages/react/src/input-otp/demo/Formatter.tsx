import React from 'react';
import { InputOTP } from '@tiny-design/react';

export default function FormatterDemo() {
  const [value, setValue] = React.useState('');

  // Only allow digits
  const formatter = (val: string) => val.replace(/\D/g, '');

  return (
    <div>
      <InputOTP
        length={4}
        value={value}
        formatter={formatter}
        onChange={setValue}
      />
      <p>Value: {value}</p>
      <p>Only digits are allowed</p>
    </div>
  );
}