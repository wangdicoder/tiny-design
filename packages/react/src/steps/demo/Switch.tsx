import React, { useState } from 'react';
import { Steps, Button } from '@tiny-design/react';

export default function SwitchDemo() {
  const [curr, setCurr] = useState(0);

  const handleNext = () => {
    let next = curr + 1;
    if (next > 3) {
      next = 0;
    }
    setCurr(next);
  };

  return (
    <>
      <Steps current={curr}>
        <Steps.Step title="Step 1" description="This is a description." />
        <Steps.Step title="Step 2" description="This is a description." />
        <Steps.Step title="Step 3" description="This is a description." />
        <Steps.Step title="Step 4" description="This is a description." />
      </Steps>
      <br />
      <br />
      <Button variant="solid" color="primary" onClick={handleNext}>
        Next
      </Button>
    </>
  );
}
