import React from 'react';
import { Button, Card, ConfigProvider, Space } from '@tiny-design/react';

export default function NestedThemeDemo() {
  return (
    <ConfigProvider
      theme={{
        mode: 'dark',
        token: {
          colorPrimary: '#1677ff',
        },
        components: {
          Button: { borderRadius: '999px' },
        },
      }}>
      <Card title="Outer Provider" style={{ marginBottom: 16 }}>
        <Space>
          <Button btnType="primary">Outer Primary</Button>
          <Button>Outer Default</Button>
        </Space>
      </Card>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#f5222d',
          },
          components: {
            Button: { borderRadius: '2px' },
          },
        }}>
        <Card title="Inner Provider">
          <Space>
            <Button btnType="primary">Inner Primary</Button>
            <Button>Inner Default</Button>
          </Space>
        </Card>
      </ConfigProvider>
    </ConfigProvider>
  );
}
