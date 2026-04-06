import React, { useState } from 'react';
import { Button, ConfigProvider, Space } from '@tiny-design/react';

export default function DynamicThemeDemo() {
  const [danger, setDanger] = useState(false);

  return (
    <ConfigProvider
      theme={
        danger
          ? {
              tokens: {
                semantic: {
                  'color-primary': '#ff4d4f',
                  'border-radius': '2px',
                },
                components: {
                  'button.radius': '2px',
                },
              },
            }
          : {
              tokens: {
                semantic: {
                  'color-primary': '#1677ff',
                },
                components: {
                  'button.radius': '999px',
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
