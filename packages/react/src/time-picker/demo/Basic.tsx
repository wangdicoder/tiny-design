import React from 'react';
import { TimePicker } from '@tiny-design/react';

export default function BasicDemo() {
  const [time, setTime] = React.useState<Date | undefined>(new Date());
  return (
    <TimePicker
      value={time}
      onChange={(t) => setTime(t ?? undefined)}
    />
  );
}
