import React from 'react';
import { Tour, Button } from '@tiny-design/react';
import type { TourStepProps } from '../../tour/types';

export default function NoMaskDemo() {
  const [open, setOpen] = React.useState(false);
  const ref1 = React.useRef<HTMLButtonElement>(null);
  const ref2 = React.useRef<HTMLButtonElement>(null);

  const steps: TourStepProps[] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => ref1.current,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current,
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button ref={ref1}>Upload</Button>
        <Button ref={ref2} btnType="primary" onClick={() => setOpen(true)}>
          Start Tour
        </Button>
      </div>
      <Tour open={open} steps={steps} mask={false} onClose={() => setOpen(false)} />
    </>
  );
}
