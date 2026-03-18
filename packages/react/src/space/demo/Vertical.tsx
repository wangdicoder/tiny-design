import React from 'react';
import { Button, Space, PopConfirm } from '@tiny-design/react';

export default function VerticalDemo() {
  return (
    <Space direction="vertical" align="start">
      Space
      <Button btnType="primary">Button</Button>
      <Button>Another Button</Button>
      <PopConfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
        <Button>Confirm</Button>
      </PopConfirm>
    </Space>
  );
}