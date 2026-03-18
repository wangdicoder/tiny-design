import React from 'react';
import { Segmented } from '@tiny-design/react';

export default function DisabledDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Segmented options={['Daily', 'Weekly', 'Monthly']} disabled />
      <Segmented
        options={[
          { label: 'Active', value: 'active' },
          { label: 'Disabled', value: 'disabled', disabled: true },
          { label: 'Active', value: 'active2' },
        ]}
      />
    </div>
  );
}