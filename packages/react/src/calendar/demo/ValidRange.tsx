import React from 'react';
import { Calendar } from '@tiny-design/react';

export default function ValidRangeDemo() {
  const [value, setValue] = React.useState(new Date());

  const today = new Date();
  const threeMonthsLater = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
  const validRange: [Date, Date] = [today, threeMonthsLater];

  return (
    <Calendar
      value={value}
      onChange={(date) => setValue(date)}
      validRange={validRange}
      showToday
      fullscreen={false}
    />
  );
}
