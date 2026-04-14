import React from 'react';
import { Tour, Button, Slider } from '@tiny-design/react';
import type { TourStepProps } from '../../tour/types';

export default function GapDemo() {
  const [open, setOpen] = React.useState(false);
  const [offset, setOffset] = React.useState(6);
  const [radius, setRadius] = React.useState(2);
  const ref = React.useRef<HTMLButtonElement>(null);

  const steps: TourStepProps[] = [
    {
      title: 'Custom Gap',
      description: 'The spotlight has custom padding and rounded corners around the target.',
      target: () => ref.current,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>Offset: {offset}px</div>
        <Slider min={0} max={30} value={offset} onChange={(v) => setOffset(v as number)} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>Radius: {radius}px</div>
        <Slider min={0} max={20} value={radius} onChange={(v) => setRadius(v as number)} />
      </div>
      <Button ref={ref} variant="solid" color="primary" onClick={() => setOpen(true)}>
        Start Tour
      </Button>
      <Tour open={open} steps={steps} gap={{ offset, radius }} onClose={() => setOpen(false)} />
    </div>
  );
}
