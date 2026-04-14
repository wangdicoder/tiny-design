import React from 'react';
import { Result, Button } from '@tiny-design/react';

export default function InfoDemo() {
  return (
    <Result
      status="info"
      title="Your operation has been executed."
      extra={[
        <Button variant="solid" color="primary" key="console">
          Go Console
        </Button>,
      ]}
    />
  );
}
