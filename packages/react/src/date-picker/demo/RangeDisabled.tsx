import React from 'react';
import { DatePicker } from '@tiny-design/react';

export default function RangeDisabledDemo() {
  const disabledDate = (current: Date) => {
    const day = current.getDay();
    return day === 0 || day === 6;
  };

  return (
    <DatePicker
      range
      placeholder="Select a work-week range"
      disabledDate={disabledDate}
      renderExtraFooter={() => (
        <span style={{ fontSize: 12, color: '#999' }}>Weekends are unavailable in range mode</span>
      )}
    />
  );
}
