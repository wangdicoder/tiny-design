import React from 'react';
import { Tour, Button } from '@tiny-design/react';
import type { TourStepProps } from '../../tour/types';

export default function PlacementDemo() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  const steps: TourStepProps[] = [
    {
      title: 'Top Placement',
      description: 'This tooltip is placed on top.',
      target: () => ref.current,
      placement: 'top',
    },
    {
      title: 'Right Placement',
      description: 'This tooltip is placed on the right.',
      target: () => ref.current,
      placement: 'right',
    },
    {
      title: 'Bottom Placement',
      description: 'This tooltip is placed at the bottom.',
      target: () => ref.current,
      placement: 'bottom',
    },
    {
      title: 'Left Placement',
      description: 'This tooltip is placed on the left.',
      target: () => ref.current,
      placement: 'left',
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
        <Button ref={ref} btnType="primary" onClick={() => setOpen(true)}>
          Start Tour
        </Button>
      </div>
      <Tour open={open} steps={steps} onClose={() => setOpen(false)} />
    </>
  );
}
