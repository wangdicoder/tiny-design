import React from 'react';
import { Segmented } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Segmented
        options={[
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Yearly', value: 'yearly' },
        ]}
      />
      <Segmented
        options={[
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ]}
        size="sm"
      />
      <Segmented
        options={[
          { label: 'Map', value: 'map' },
          { label: 'Transit', value: 'transit' },
          { label: 'Satellite', value: 'satellite' },
        ]}
        block
      />
    </div>
  );
}
