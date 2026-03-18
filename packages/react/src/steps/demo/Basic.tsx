import React from 'react';
import { Steps } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <Steps current={1}>
      <Steps.Step title="Finished" description="This is a description." />
      <Steps.Step title="In Progress" description="This is a description." />
      <Steps.Step title="Waiting" description="This is a description." />
    </Steps>
  );
}