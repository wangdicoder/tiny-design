import React from 'react';
import { Tabs, Button, Space } from '@tiny-design/react';

export default function PositionDemo() {
  const [position, setPosition] = React.useState('top');
  const items = [
    { key: '1', label: 'Tab 1', children: 'Content of Tab 1' },
    { key: '2', label: 'Tab 2', children: 'Content of Tab 2' },
    { key: '3', label: 'Tab 3', children: 'Content of Tab 3' },
  ];
  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        {['top', 'bottom', 'left', 'right'].map(pos => (
          <Button
            key={pos}
            btnType={position === pos ? 'primary' : 'default'}
            onClick={() => setPosition(pos)}>
            {pos}
          </Button>
        ))}
      </Space>
      <Tabs tabPosition={position} defaultActiveKey="1" items={items} />
    </div>
  );
}