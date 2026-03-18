import React from 'react';
import { Segmented } from '@tiny-design/react';

export default function SizeDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Segmented options={['Small', 'Medium', 'Large']} size="sm" />
      <Segmented options={['Small', 'Medium', 'Large']} size="md" />
      <Segmented options={['Small', 'Medium', 'Large']} size="lg" />
    </div>
  );
}