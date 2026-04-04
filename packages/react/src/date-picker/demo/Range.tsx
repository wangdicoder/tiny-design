import React from 'react';
import { DatePicker } from '@tiny-design/react';

export default function RangeDemo() {
  const [value, setValue] = React.useState<[Date | null, Date | null]>([
    new Date(2024, 0, 10),
    new Date(2024, 0, 15),
  ]);

  return (
    <DatePicker
      range
      value={value}
      onChange={(nextValue, dateStrings) => {
        if (Array.isArray(nextValue)) {
          setValue(nextValue);
        }
        console.log(dateStrings);
      }}
    />
  );
}
