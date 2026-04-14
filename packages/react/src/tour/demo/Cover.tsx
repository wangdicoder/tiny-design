import React from 'react';
import { Tour, Button } from '@tiny-design/react';
import type { TourStepProps } from '../../tour/types';

export default function CoverDemo() {
  const [open, setOpen] = React.useState(false);
  const ref1 = React.useRef<HTMLButtonElement>(null);
  const ref2 = React.useRef<HTMLButtonElement>(null);

  const steps: TourStepProps[] = [
    {
      title: 'Create a project',
      description: 'Start by creating a new project from the dashboard.',
      cover: (
        <svg viewBox="0 0 300 120" style={{ width: '100%', borderRadius: '8px 8px 0 0' }}>
          <rect width="300" height="120" fill="#e6f4ff" />
          <circle cx="150" cy="50" r="25" fill="#1677ff" />
          <text x="150" y="100" textAnchor="middle" fill="#1677ff" fontSize="14">
            Step 1
          </text>
        </svg>
      ),
      target: () => ref1.current,
    },
    {
      title: 'Upload files',
      description: 'Upload files to your project to get started.',
      cover: (
        <svg viewBox="0 0 300 120" style={{ width: '100%', borderRadius: '8px 8px 0 0' }}>
          <rect width="300" height="120" fill="#f6ffed" />
          <polygon points="150,25 175,75 125,75" fill="#52c41a" />
          <text x="150" y="100" textAnchor="middle" fill="#52c41a" fontSize="14">
            Step 2
          </text>
        </svg>
      ),
      target: () => ref2.current,
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button ref={ref1}>Create</Button>
        <Button ref={ref2} variant="solid" color="primary" onClick={() => setOpen(true)}>
          Start Tour
        </Button>
      </div>
      <Tour open={open} steps={steps} onClose={() => setOpen(false)} />
    </>
  );
}
