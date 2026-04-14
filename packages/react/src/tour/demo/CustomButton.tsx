import React from 'react';
import { Tour, Button } from '@tiny-design/react';
import type { TourStepProps } from '../../tour/types';

export default function CustomButtonDemo() {
  const [open, setOpen] = React.useState(false);
  const ref1 = React.useRef<HTMLButtonElement>(null);
  const ref2 = React.useRef<HTMLButtonElement>(null);
  const ref3 = React.useRef<HTMLButtonElement>(null);

  const steps: TourStepProps[] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => ref1.current,
      nextButtonProps: { children: 'Go Next' },
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current,
      prevButtonProps: { children: 'Go Back' },
      nextButtonProps: { children: 'Continue' },
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
      prevButtonProps: { children: 'Go Back' },
      nextButtonProps: { children: 'Done!' },
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button ref={ref1}>Upload</Button>
        <Button ref={ref2}>Save</Button>
        <Button ref={ref3} variant="solid" color="primary" onClick={() => setOpen(true)}>
          Start Tour
        </Button>
      </div>
      <Tour open={open} steps={steps} onClose={() => setOpen(false)} />
    </>
  );
}
