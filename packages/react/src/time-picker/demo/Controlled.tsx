import React from 'react';
import { TimePicker, Space, Button } from '@tiny-design/react';

export default function ControlledDemo() {
  const [time, setTime] = React.useState(new Date(2024, 0, 1, 9, 0, 0));
  return (
    <Space>
      <TimePicker value={time} onChange={(t) => setTime(t)} />
      <Button size="sm" onClick={() => setTime(new Date())}>Now</Button>
      <Button size="sm" onClick={() => setTime(null)}>Clear</Button>
    </Space>
  );
}