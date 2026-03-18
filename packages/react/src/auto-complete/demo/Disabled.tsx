import React from 'react';
import { AutoComplete } from '@tiny-design/react';

export default function DisabledDemo() {
  const options = [
    { value: 'React' },
    { value: 'Vue' },
    { value: 'Angular' },
  ];

  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        options={options}
        defaultValue="React"
        disabled
        placeholder="Disabled"
      />
    </div>
  );
}