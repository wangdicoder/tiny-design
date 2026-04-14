import React from 'react';
import { Button, Card, ConfigProvider, Space } from '@tiny-design/react';

export default function NestedThemeDemo() {
  return (
    <ConfigProvider
      theme={{
        mode: 'dark',
        tokens: {
          semantic: {
            'color-primary': '#1677ff',
          },
          components: {
            'button.radius': '999px',
          },
        },
      }}>
      <Card title="Outer Provider" style={{ marginBottom: 16 }}>
        <Space>
          <Button variant="solid" color="primary">
            Outer Primary
          </Button>
          <Button>Outer Default</Button>
        </Space>
      </Card>

      <ConfigProvider
        theme={{
          tokens: {
            semantic: {
              'color-primary': '#f5222d',
            },
            components: {
              'button.radius': '2px',
            },
          },
        }}>
        <Card title="Inner Provider">
          <Space>
            <Button variant="solid" color="primary">
              Inner Primary
            </Button>
            <Button>Inner Default</Button>
          </Space>
        </Card>
      </ConfigProvider>
    </ConfigProvider>
  );
}
