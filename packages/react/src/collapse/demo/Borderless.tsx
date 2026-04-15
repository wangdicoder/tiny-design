import React from 'react';
import { Collapse, Tag } from '@tiny-design/react';

export default function BorderlessDemo() {
  return (
    <Collapse
      bordered={false}
      size="lg"
      defaultValue={['palette']}
      items={[
        {
          key: 'palette',
          label: 'Color palette',
          extra: <Tag color="#0f766e">Stable</Tag>,
          children: 'Borderless mode keeps the layout lighter when Collapse is used inside cards or side panels.',
        },
        {
          key: 'spacing',
          label: 'Spacing rhythm',
          children: 'Size presets affect both the trigger row and the content body spacing.',
        },
        {
          key: 'motion',
          label: 'Motion tokens',
          children: 'Motion is driven by the shared transition token instead of a hard-coded timeout.',
        },
      ]}
    />
  );
}
