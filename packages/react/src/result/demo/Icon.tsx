import React from 'react';
import { Result, Button } from '@tiny-design/react';

export default function IconDemo() {
  return (
    <Result
      status="success"
      title="You order has been delivered!"
      icon={<div style={{ fontSize: 80 }}>🎉</div>}
      extra={[
        <Button variant="solid" color="primary" key="console">
          Go Console
        </Button>,
      ]}
    />
  );
}
