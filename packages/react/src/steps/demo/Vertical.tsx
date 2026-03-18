import React from 'react';
import { Steps } from '@tiny-design/react';

export default function VerticalDemo() {
  return (
    <Steps current={1} direction="vertical">
      <Steps.Step title="Finished" description="This is a description." />
      <Steps.Step title="In Progress" description="This is a description." />
      <Steps.Step title="Waiting" description="This is a description." />
    </Steps>
  );
}