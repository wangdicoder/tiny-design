import React from 'react';
import { Calendar } from '@tiny-design/react';

export default function CardModeDemo() {
  const [value, setValue] = React.useState(new Date());

  return (
    <div>
      <style>{`.weekend-cell.ty-calendar__cell_in-view { color: var(--ty-color-danger, #e5484d); }`}</style>
      <p style={{ marginBottom: 8, fontSize: 13, color: '#666' }}>
        Use arrow keys to navigate, Enter to select, Escape to reset focus.
      </p>
      <Calendar
        value={value}
        onChange={(date) => setValue(date)}
        fullscreen={false}
        cellClassName={(date) =>
          date.getDay() === 0 || date.getDay() === 6 ? 'weekend-cell' : undefined
        }
      />
    </div>
  );
}
