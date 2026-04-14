import React from 'react';
import { Button, Space, PopConfirm } from '@tiny-design/react';

export default function VerticalDemo() {
  return (
    <Space direction="vertical" align="start">
      Space
      <Button variant="solid" color="primary">
        Button
      </Button>
      <Button>Another Button</Button>
      <PopConfirm title="Are you sure delete this task?" confirmText="Yes" cancelText="No">
        <Button>Confirm</Button>
      </PopConfirm>
    </Space>
  );
}
