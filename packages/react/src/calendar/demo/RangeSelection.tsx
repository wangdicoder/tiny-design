import React from 'react';
import { Calendar } from '@tiny-design/react';

export default function RangeSelectionDemo() {
  const [range, setRange] = React.useState<[Date, Date] | null>(null);

  return (
    <div>
      <Calendar
        selectionMode="range"
        rangeValue={range}
        onRangeChange={setRange}
        fullscreen={false}
      />
      {range && (
        <p style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
          {range[0].toLocaleDateString()} → {range[1].toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
