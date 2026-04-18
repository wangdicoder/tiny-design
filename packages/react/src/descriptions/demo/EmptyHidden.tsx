import React from 'react';
import { Descriptions } from '@tiny-design/react';

export default function EmptyHiddenDemo() {
  return (
    <Descriptions
      title="Empty And Hidden"
      columns={2}
      empty="Not configured"
      items={[
        { key: 'env', label: 'Environment', content: 'Production' },
        { key: 'token', label: 'Access Token', content: null },
        { key: 'internal', label: 'Internal Note', content: 'Only for admins', hidden: true },
        { key: 'fallback', label: 'Rollback Plan', content: undefined },
      ]}
    />
  );
}
