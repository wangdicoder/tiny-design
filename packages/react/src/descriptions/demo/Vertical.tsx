import React from 'react';
import { Descriptions } from '@tiny-design/react';

export default function VerticalDemo() {
  return (
    <Descriptions
      title="Release Notes"
      layout="vertical"
      columns={1}
      items={[
        { key: 'channel', label: 'Channel', content: 'Stable' },
        { key: 'owner', label: 'Release Owner', content: 'Release Desk' },
        {
          key: 'summary',
          label: 'Summary',
          span: 'fill',
          content: 'Refined menu navigation, new shell templates, and a redesigned descriptions primitive.',
        },
        {
          key: 'links',
          label: 'Related Links',
          span: 'fill',
          content: 'RFC #218 · Docs preview · Visual baseline update',
        },
      ]}
    />
  );
}
