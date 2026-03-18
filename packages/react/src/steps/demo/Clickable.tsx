import React from 'react';
import { Steps } from '@tiny-design/react';

export default function ClickableDemo() {
  const handleChange = (curr: number) => {
    console.log(curr);
  };

  return (
    <Steps defaultCurrent={1} onChange={handleChange}>
      <Steps.Step title="Step 1" description="This is a description." />
      <Steps.Step title="Step 2" description="This is a description." />
      <Steps.Step title="Step 3" description="This is a description." />
      <Steps.Step title="Step 4" description="This is a description." />
    </Steps>
  );
}