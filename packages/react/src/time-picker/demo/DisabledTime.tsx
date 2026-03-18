import React from 'react';
import { TimePicker } from '@tiny-design/react';

export default function DisabledTimeDemo() {
  const disabledTime = () => ({
    disabledHours: () => [0, 1, 2, 3, 4, 5, 22, 23],
    disabledMinutes: (hour: number) => hour === 12 ? [0, 30] : [],
    disabledSeconds: () => [],
  });
  return (
    <TimePicker
      disabledTime={disabledTime}
      placeholder="Business hours only"
    />
  );
}