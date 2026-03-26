import React from 'react';
import { Tabs } from '@tiny-design/react';

export default function AnimatedDemo() {
  const items = [
    { key: '1', label: 'Tab 1', children: 'Content of Tab 1' },
    { key: '2', label: 'Tab 2', children: 'Content of Tab 2' },
    { key: '3', label: 'Tab 3', children: 'Content of Tab 3' },
  ];
  return <Tabs defaultActiveKey="1" items={items} animated={false} />;
}
