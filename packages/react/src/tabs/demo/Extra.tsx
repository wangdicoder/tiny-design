import React from 'react';
import { Tabs, Button } from '@tiny-design/react';
import { IconUser, IconGift, IconBroadcast } from '@tiny-design/icons';

export default function ExtraDemo() {
  return (
    <Tabs
      defaultActiveKey="1"
      tabBarExtraContent={<Button size="sm">Action</Button>}
      items={[
        {
          key: '1',
          label: <span><IconUser /> Profile</span>,
          children: 'Profile content',
        },
        {
          key: '2',
          label: <span><IconGift /> Rewards</span>,
          children: 'Rewards content',
        },
        {
          key: '3',
          label: <span><IconBroadcast /> Alerts</span>,
          children: 'Alerts content',
        },
      ]}
    />
  );
}