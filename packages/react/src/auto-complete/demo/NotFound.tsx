import React from 'react';
import { AutoComplete } from '@tiny-design/react';

export default function NotFoundDemo() {
  const options = [
    { value: 'React' },
    { value: 'Vue' },
    { value: 'Angular' },
  ];

  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        options={options}
        notFoundContent="No results found"
        placeholder="Try typing something"
      />
    </div>
  );
}