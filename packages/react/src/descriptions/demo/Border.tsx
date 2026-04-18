import React from 'react';
import { Badge, Descriptions } from '@tiny-design/react';

export default function BorderDemo() {
  return (
    <Descriptions
      title="Deployment Contract"
      bordered
      semantic="table"
      columns={2}
      items={[
        { key: 'service', label: 'Service', content: 'Managed DB' },
        { key: 'billing', label: 'Billing', content: 'Annual prepaid' },
        { key: 'renewal', label: 'Renewal', content: 'Enabled' },
        { key: 'orderedAt', label: 'Ordered', content: 'Apr 18, 10:30' },
        { key: 'period', label: 'Usage Window', content: 'Apr 18, 2026 to Apr 18, 2027', span: 'fill' },
        {
          key: 'status',
          label: 'Status',
          content: (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Badge dot processing color="#1890ff" />
              Running
            </span>
          ),
          span: 'fill',
        },
        { key: 'amount', label: 'Amount', content: '$80.00' },
        { key: 'discount', label: 'Discount', content: '$20.00' },
        { key: 'total', label: 'Receipts', content: '$60.00' },
        {
          key: 'config',
          label: 'Config',
          span: 'fill',
          content: 'MongoDB / 3 replicas / 10 GB',
        },
      ]}
    />
  );
}
