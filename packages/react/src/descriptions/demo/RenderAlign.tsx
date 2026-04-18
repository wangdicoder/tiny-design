import React from 'react';
import { Descriptions, Tag } from '@tiny-design/react';

export default function RenderAlignDemo() {
  return (
    <Descriptions
      title="Render And Align"
      semantic="table"
      bordered
      columns={1}
      labelAlign="end"
      contentAlign="start"
      items={[
        { key: 'severity', label: 'Severity', content: 'High' },
        { key: 'owner', label: 'Owner', content: 'UI Foundation' },
        { key: 'eta', label: 'ETA', content: '2 days' },
        { key: 'scope', label: 'Scope', content: 'Descriptions demo refinement' },
      ]}
      labelRender={(item) => (
        <span style={{ display: 'inline-block', minWidth: 88, fontSize: 12, letterSpacing: '0.08em' }}>
          {item.label}
        </span>
      )}
      contentRender={(item) => {
        if (item.key === 'severity') {
          return <Tag color="warning">High</Tag>;
        }

        return item.content;
      }}
    />
  );
}
