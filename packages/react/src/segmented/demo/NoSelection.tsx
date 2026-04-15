import React from 'react';
import { Segmented, Text } from '@tiny-design/react';

export default function NoSelectionDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Segmented
        options={[
          { label: 'All', value: 'all' },
          { label: 'Open', value: 'open' },
          { label: 'Closed', value: 'closed' },
        ]}
      />
      <Text type="secondary">Without value or defaultValue, no option is selected initially.</Text>
    </div>
  );
}
