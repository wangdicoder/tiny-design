import React from 'react';
import { Result, Button } from '@tiny-design/react';

export default function ErrorDemo() {
  return (
    <Result
      status="error"
      title="Submission Failed"
      subtitle="Please check and modify the following information before resubmitting."
      extra={[
        <Button btnType="primary" key="console">
          Go Console
        </Button>
      ]}
    />
  );
}