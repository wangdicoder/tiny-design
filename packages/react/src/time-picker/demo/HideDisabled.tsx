import React from 'react';
import { TimePicker } from '@tiny-design/react';

export default function HideDisabledDemo() {
  const disabledTime = () => ({
    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 20, 21, 22, 23],
  });
  return (
    <TimePicker
      disabledTime={disabledTime}
      hideDisabledOptions
      placeholder="7:00 - 19:00"
    />
  );
}