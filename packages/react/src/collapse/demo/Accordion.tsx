import React from 'react';
import { Collapse } from '@tiny-design/react';

const text = `A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.`;

export default function AccordionDemo() {
  return (
    <Collapse
      multiple={false}
      defaultValue={['chapter-1']}
      items={[
        {
          key: 'chapter-1',
          label: 'Chapter 1',
          children: <p>{text}</p>,
        },
        {
          key: 'chapter-2',
          label: 'Chapter 2',
          children: <p>{text}</p>,
        },
        {
          key: 'chapter-3',
          label: 'Chapter 3',
          children: <p>{text}</p>,
        },
      ]}
    />
  );
}
