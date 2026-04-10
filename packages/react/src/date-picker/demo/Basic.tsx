import React from 'react';
import { DatePicker } from '@tiny-design/react';

export default function BasicDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <DatePicker
      value={date}
      onChange={(d, str) => {
        setDate(d instanceof Date ? d : undefined);
        console.log(str);
      }}
    />
  );
}
