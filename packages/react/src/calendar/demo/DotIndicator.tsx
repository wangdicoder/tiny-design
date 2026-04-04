import React from 'react';
import { Calendar } from '@tiny-design/react';

// Simulate some event dates
const eventDates = new Set([3, 7, 12, 15, 20, 25]);

export default function DotIndicatorDemo() {
  const [value, setValue] = React.useState(new Date());

  return (
    <Calendar
      value={value}
      onChange={(date) => setValue(date)}
      fullscreen={false}
      dotRender={(date) => {
        if (eventDates.has(date.getDate())) {
          return date.getDate() % 2 === 0 ? '#f56c6c' : true;
        }
        return false;
      }}
    />
  );
}
