import React from 'react';
import { Segmented } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Segmented options={['Daily', 'Weekly', 'Monthly', 'Yearly']} />
      <Segmented
        options={[
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ]}
        size="sm"
      />
      <Segmented options={['Map', 'Transit', 'Satellite']} block />
    </div>
  );
}