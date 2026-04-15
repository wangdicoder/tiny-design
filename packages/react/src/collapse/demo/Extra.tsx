import React from 'react';
import { Collapse, Badge, Button, Tag } from '@tiny-design/react';

export default function ExtraDemo() {
  return (
    <Collapse
      defaultValue={['activity']}
      items={[
        {
          key: 'activity',
          label: ({ active }) => `Recent activity${active ? ' opened' : ''}`,
          extra: <Badge count={5} />,
          children: 'Header and extra content can be rendered from the item definition without composition wrappers.',
        },
        {
          key: 'release',
          label: 'Release notes',
          extra: ({ active }) => <Tag color={active ? '#047857' : '#475569'}>{active ? 'Live' : 'Draft'}</Tag>,
          children: 'Both label and extra accept render functions that receive the active and disabled state.',
        },
        {
          key: 'settings',
          label: 'Panel with action',
          extra: (
            <Button
              size="sm"
              onClick={(event) => {
                event.stopPropagation();
                alert('Settings clicked');
              }}
            >
              Settings
            </Button>
          ),
          children: 'Interactive controls inside extra should stop propagation if they should not toggle the panel.',
        },
      ]}
    />
  );
}
