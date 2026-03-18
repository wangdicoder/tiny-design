import React from 'react';
import { AutoComplete } from '@tiny-design/react';

export default function AllowClearDemo() {
  const options = [
    { value: 'React' },
    { value: 'Vue' },
    { value: 'Angular' },
    { value: 'Svelte' },
  ];

  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        options={options}
        allowClear
        placeholder="Type and clear"
      />
    </div>
  );
}