import React from 'react';
import { Segmented, Text } from '@tiny-design/react';

export default function DefaultValueDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Segmented
        options={[
          { label: 'Draft', value: 'draft' },
          { label: 'Review', value: 'review' },
          { label: 'Published', value: 'published' },
        ]}
        defaultValue="review"
      />
      <Text type="secondary">Initial selection is set with defaultValue.</Text>
    </div>
  );
}
