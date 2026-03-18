import React from 'react';
import { Cascader } from '@tiny-design/react';

export default function DisabledDemo() {
  const options = [
    {
      value: 'free',
      label: 'Free Tier',
      children: [
        { value: 'starter', label: 'Starter — 1 GB' },
        { value: 'hobby', label: 'Hobby — 5 GB' },
      ],
    },
    {
      value: 'pro',
      label: 'Pro Tier',
      children: [
        { value: 'team', label: 'Team — 100 GB' },
        { value: 'business', label: 'Business — 500 GB' },
      ],
    },
    {
      value: 'enterprise',
      label: 'Enterprise',
      disabled: true,
      children: [
        { value: 'custom', label: 'Custom — Contact us' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Cascader
        options={options}
        placeholder="Select a plan"
      />
      <Cascader
        options={options}
        defaultValue={['pro', 'team']}
        disabled
      />
    </div>
  );
}