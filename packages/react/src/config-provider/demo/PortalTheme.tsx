import React from 'react';
import { Button, ConfigProvider, Select, Space, Tooltip } from '@tiny-design/react';

const options = [
  { label: 'Ocean', value: 'ocean' },
  { label: 'Forest', value: 'forest' },
  { label: 'Sunset', value: 'sunset' },
];

export default function PortalThemeDemo() {
  return (
    <ConfigProvider
      theme={{
        tokens: {
          semantic: {
            'color-primary': '#13c2c2',
          },
          components: {
            'select.dropdown-shadow':
              '0 0 0 2px rgba(19, 194, 194, 0.18), 0 12px 28px rgba(0, 0, 0, 0.18)',
            'tooltip.content-padding': '8px 12px',
          },
        },
      }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select defaultOpen style={{ maxWidth: 280 }} defaultValue="ocean" options={options} />
        <Tooltip title="This popup is rendered through a portal and still inherits the theme tokens.">
          <Button variant="solid" color="primary">
            Hover For Tooltip
          </Button>
        </Tooltip>
      </Space>
    </ConfigProvider>
  );
}
