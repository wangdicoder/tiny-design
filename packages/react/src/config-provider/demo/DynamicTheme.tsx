import React, { useState } from 'react';
import { Button, ConfigProvider, Space } from '@tiny-design/react';

export default function DynamicThemeDemo() {
  const [danger, setDanger] = useState(false);

  return (
    <ConfigProvider
      theme={
        danger
          ? {
              token: {
                colorPrimary: '#ff4d4f',
                borderRadius: '2px',
              },
              components: {
                Button: {
                  borderRadius: '2px',
                },
              },
            }
          : {
              token: {
                colorPrimary: '#1677ff',
              },
              components: {
                Button: {
                  borderRadius: '999px',
                },
              },
            }
      }>
      <Space>
        <Button btnType="primary" onClick={() => setDanger((prev) => !prev)}>
          Toggle Theme
        </Button>
        <Button>{danger ? 'Danger Mode' : 'Default Mode'}</Button>
      </Space>
    </ConfigProvider>
  );
}
