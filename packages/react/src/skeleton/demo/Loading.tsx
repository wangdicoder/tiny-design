import React from 'react';
import { Button, Card, Flex, Skeleton, Tag } from '@tiny-design/react';

export default function LoadingDemo() {
  const [loading, setLoading] = React.useState(true);

  return (
    <Flex vertical gap={12}>
      <Button size="sm" onClick={() => setLoading((prev) => !prev)} style={{ alignSelf: 'flex-start' }}>
        {loading ? 'Show content' : 'Show skeleton'}
      </Button>
      <Skeleton
        loading={loading}
        animation="shimmer"
        avatar={{ size: 'lg' }}
        title={{ width: '32%' }}
        paragraph={{ rows: 3, widths: ['100%', '88%', '56%'] }}
      >
        <Card style={{ maxWidth: 520 }}>
          <Card.Content>
            <Flex vertical gap={12}>
              <Flex justify="space-between" align="center">
                <Flex align="center" gap={12}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>API Sync Health</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>Updated 2 minutes ago</div>
                  </div>
                </Flex>
                <Tag color="success">Healthy</Tag>
              </Flex>
              <div style={{ color: '#475569', lineHeight: 1.6 }}>
                14 upstream services are responding within the expected latency band. No manual action is
                required for the current release window.
              </div>
            </Flex>
          </Card.Content>
        </Card>
      </Skeleton>
    </Flex>
  );
}
