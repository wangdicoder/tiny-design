import React from 'react';
import { Tour, Button } from '@tiny-design/react';
import type { TourStepProps } from '../../tour/types';

export default function NoTargetDemo() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  const steps: TourStepProps[] = [
    {
      title: 'Welcome',
      description: 'Welcome to the app! This step has no target, so it appears centered.',
    },
    {
      title: 'Click Here',
      description: 'This step highlights a specific element.',
      target: () => ref.current,
    },
    {
      title: 'All Done',
      description: 'You have completed the tour. This step is centered again.',
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
        <Button ref={ref} btnType="primary" onClick={() => setOpen(true)}>
          Start Tour
        </Button>
      </div>
      <Tour open={open} steps={steps} onClose={() => setOpen(false)} />
    </>
  );
}
