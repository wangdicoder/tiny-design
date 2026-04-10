import React from 'react';
import { TimePicker, Space, Button } from '@tiny-design/react';

export default function ControlledDemo() {
  const [time, setTime] = React.useState<Date | undefined>(new Date(2024, 0, 1, 9, 0, 0));
  return (
    <Space>
      <TimePicker value={time} onChange={(t) => setTime(t ?? undefined)} />
      <Button size="sm" onClick={() => setTime(new Date())}>Now</Button>
      <Button size="sm" onClick={() => setTime(undefined)}>Clear</Button>
    </Space>
  );
}
