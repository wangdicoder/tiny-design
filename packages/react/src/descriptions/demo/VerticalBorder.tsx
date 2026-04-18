import React from 'react';
import { Descriptions } from '@tiny-design/react';

export default function VerticalBorderDemo() {
  return (
    <Descriptions
      title="Audit Snapshot"
      layout="vertical"
      bordered
      semantic="table"
      columns={1}
      items={[
        { key: 'createdBy', label: 'Created By', content: 'Product Team' },
        { key: 'approvedBy', label: 'Approved By', content: 'Review Board' },
        { key: 'risk', label: 'Risk Level', content: 'Moderate' },
        { key: 'window', label: 'Maintenance Window', content: 'Saturday 02:00-04:00 UTC' },
        {
          key: 'scope',
          label: 'Scope',
          span: 'fill',
          content: 'Descriptions, docs pages, snapshots, and visual regression fixtures.',
        },
      ]}
    />
  );
}
