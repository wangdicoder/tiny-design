import React from 'react';
import { Descriptions } from '@tiny-design/react';

export default function SizeDemo() {
  return (
    <Descriptions
      title="Responsive API"
      columns={{ xs: 1, md: 2 }}
      items={[
        { key: 'env', label: 'Environment', content: 'Production' },
        { key: 'version', label: 'Version', content: 'v1.13.0' },
        { key: 'coverage', label: 'Coverage', content: '92%' },
        { key: 'runtime', label: 'Runtime', content: 'Node 22' },
        {
          key: 'notes',
          label: 'Notes',
          span: 'fill',
          content: 'Resize the page to see columns collapse from four to two to one.',
        },
      ]}
    />
  );
}
