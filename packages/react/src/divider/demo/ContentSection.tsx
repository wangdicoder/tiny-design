import React from 'react';
import { Card, Divider, Tag, Text } from '@tiny-design/react';

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
};

export default function ContentSectionDemo() {
  return (
    <Card
      style={{
        maxWidth: 520,
        borderRadius: 16,
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--ty-color-primary) 5%, white), white)',
      }}
    >
      <Card.Content>
        <div style={rowStyle}>
          <div>
            <Text strong>Release Checklist</Text>
            <div style={{ marginTop: 6 }}>
              <Text type="secondary">Prepare the final rollout for the next product update.</Text>
            </div>
          </div>
          <Tag color="info" variant="soft">v1.12</Tag>
        </div>

        <Divider titlePlacement="start" plain>
          QA Status
        </Divider>
        <div style={rowStyle}>
          <div>
            <Text>Visual review</Text>
            <div style={{ marginTop: 4 }}>
              <Text type="secondary">Tokens, spacing, and states confirmed.</Text>
            </div>
          </div>
          <Tag color="success" variant="soft">Passed</Tag>
        </div>

        <Divider titlePlacement="start" plain>
          Deployment
        </Divider>
        <div style={rowStyle}>
          <div>
            <Text>Production rollout</Text>
            <div style={{ marginTop: 4 }}>
              <Text type="secondary">Waiting for final approval from release owners.</Text>
            </div>
          </div>
          <Tag color="warning" variant="soft">Pending</Tag>
        </div>
      </Card.Content>
    </Card>
  );
}
