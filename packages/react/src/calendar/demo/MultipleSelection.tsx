import React from 'react';
import { Calendar } from '@tiny-design/react';

export default function MultipleSelectionDemo() {
  const [dates, setDates] = React.useState<Date[]>([]);

  return (
    <div>
      <Calendar
        selectionMode="multiple"
        multipleValue={dates}
        onMultipleChange={setDates}
        fullscreen={false}
      />
      {dates.length > 0 && (
        <p style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
          Selected: {dates.map((d) => d.toLocaleDateString()).join(', ')}
        </p>
      )}
    </div>
  );
}
