import React from 'react';
import { Button, Descriptions, Tag } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <Descriptions
      title="Workspace Profile"
      extra={<Button size="sm" type="primary">Edit</Button>}
      columns={2}
      footer={<span style={{ color: 'var(--ty-color-text-3)' }}>Last synced 2 minutes ago</span>}>
      <Descriptions.Item label="Name">Tiny Studio</Descriptions.Item>
      <Descriptions.Item label="Region">Australia Southeast</Descriptions.Item>
      <Descriptions.Item label="Owner" extra={<Tag size="sm">Core</Tag>}>
        Product Ops
      </Descriptions.Item>
      <Descriptions.Item label="Website">tiny.design</Descriptions.Item>
      <Descriptions.Item label="Summary" span="fill">
        Shared component workspace for tokens, docs, charts, and platform-specific UI packages.
      </Descriptions.Item>
    </Descriptions>
  );
}
