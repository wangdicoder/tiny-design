import React from 'react';
import { Tour, Button } from '@tiny-design/react';
import type { TourStepProps } from '../../tour/types';

export default function BasicDemo() {
  const [open, setOpen] = React.useState(false);
  const ref1 = React.useRef<HTMLButtonElement>(null);
  const ref2 = React.useRef<HTMLButtonElement>(null);
  const ref3 = React.useRef<HTMLButtonElement>(null);

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
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button ref={ref1}>Upload</Button>
        <Button ref={ref2}>Save</Button>
        <Button ref={ref3} btnType="primary" onClick={() => setOpen(true)}>
          Start Tour
        </Button>
      </div>
      <Tour open={open} steps={steps} onClose={() => setOpen(false)} />
    </>
  );
}
