import React from 'react';
import { Result, Button } from '@tiny-design/react';

export default function LoadingDemo() {
  return (
    <Result
      status="loading"
      title="Your order is in processing."
      extra={[
        <Button btnType="primary" key="console">
          Go Console
        </Button>
      ]}
    />
  );
}