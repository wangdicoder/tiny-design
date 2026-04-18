import React from 'react';
import { Descriptions } from '@tiny-design/react';

export default function SeparatorDemo() {
  return (
    <Descriptions
      title="Formatting Controls"
      columns={2}
      separator="→"
      items={[
        { key: 'owner', label: 'Owner', content: 'Operations Desk' },
        { key: 'reviewer', label: 'Reviewer', content: 'QA Review' },
        { key: 'status', label: 'Status', content: 'Ready for release' },
        { key: 'window', label: 'Deploy Window', content: 'Friday 18:00 UTC' },
      ]}
    />
  );
}
