import React from 'react';
import { TimePicker } from '@tiny-design/react';

export default function StepDemo() {
  return (
    <TimePicker
      hourStep={2}
      minuteStep={15}
      secondStep={10}
      placeholder="Custom steps"
    />
  );
}