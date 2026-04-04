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
      weekNumberRender={(weekNum) => (
        <span style={{ color: '#8b5cf6', fontWeight: 500, fontSize: 11 }}>W{weekNum}</span>
      )}
      fullscreen={false}
    />
  );
}
