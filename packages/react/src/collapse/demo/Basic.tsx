import React from 'react';
import { Collapse } from '@tiny-design/react';

const text = `A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.`;

export default function BasicDemo() {
  return (
    <Collapse
      defaultValue={['overview']}
      items={[
        {
          key: 'overview',
          label: 'Overview',
          children: <p>{text}</p>,
        },
        {
          key: 'details',
          label: 'Details',
          children: <p>{text}</p>,
        },
        {
          key: 'disabled',
          label: 'Disabled panel',
          disabled: true,
          children: <p>{text}</p>,
        },
      ]}
    />
  );
}
