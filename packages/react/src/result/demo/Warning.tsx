import React from 'react';
import { Result, Button } from '@tiny-design/react';

export default function WarningDemo() {
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={[
        <Button variant="solid" color="primary" key="console">
          Go Console
        </Button>,
      ]}
    />
  );
}
