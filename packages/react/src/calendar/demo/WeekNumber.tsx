import React from 'react';
import { Calendar } from '@tiny-design/react';

export default function WeekNumberDemo() {
  const [value, setValue] = React.useState(new Date());

  return (
    <Calendar
      value={value}
      onChange={(date) => setValue(date)}
      showWeekNumber
      weekStartsOn={1}
      fullscreen={false}
    />
  );
}
