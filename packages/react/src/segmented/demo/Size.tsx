import React from 'react';
import { Segmented } from '@tiny-design/react';

export default function SizeDemo() {
  const options = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Segmented options={options} size="sm" />
      <Segmented options={options} size="md" />
      <Segmented options={options} size="lg" />
    </div>
  );
}
