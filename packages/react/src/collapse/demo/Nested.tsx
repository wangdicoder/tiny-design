import React from 'react';
import { Collapse } from '@tiny-design/react';

export default function NestedDemo() {
  return (
    <Collapse
      defaultValue={['parent-1']}
      items={[
        {
          key: 'parent-1',
          label: 'Nested structure',
          children: (
            <Collapse
              bordered={false}
              defaultValue={['child-1']}
              items={[
                {
                  key: 'child-1',
                  label: 'Nested panel',
                  children: 'Nested Collapse now uses the same items-driven API as the root instance.',
                },
              ]}
            />
          ),
        },
        {
          key: 'parent-2',
          label: 'Independent panel',
          children: 'Nested content no longer relies on child index cloning, so ordering stays stable.',
        },
      ]}
    />
  );
}
