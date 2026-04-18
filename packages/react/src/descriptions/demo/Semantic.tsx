import React from 'react';
import { Descriptions } from '@tiny-design/react';

export default function SemanticDemo() {
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <Descriptions
        title="List Semantic"
        semantic="list"
        columns={2}
        items={[
          { key: 'channel', label: 'Channel', content: 'Stable' },
          { key: 'package', label: 'Package', content: '@tiny-design/react' },
          { key: 'summary', label: 'Summary', content: 'Best when you want lighter metadata cards.', span: 'fill' },
        ]}
      />
      <Descriptions
        title="Table Semantic"
        semantic="table"
        bordered
        columns={1}
        items={[
          { key: 'channel', label: 'Channel', content: 'Stable' },
          { key: 'package', label: 'Package', content: '@tiny-design/react' },
          { key: 'summary', label: 'Summary', content: 'Best when rows need stronger alignment.' },
        ]}
      />
    </div>
  );
}
