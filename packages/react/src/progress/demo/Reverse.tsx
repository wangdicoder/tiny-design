import React, { useState } from 'react';
import { Progress, Button } from '@tiny-design/react';

export default function ReverseDemo() {
  const { Circle } = Progress;
  const { Group } = Button;

  const [percent, setPercent] = useState(0);

  return (
    <div>
      <Group style={{ marginBottom: 20 }}>
        <Button onClick={() => percent > 0 && setPercent(percent - 10)}>-</Button>
        <Button onClick={() => percent < 100 && setPercent(percent + 10)}>+</Button>
      </Group>

      <br />

      <Circle percent={percent} reverse />
      <Circle percent={percent} style={{ marginLeft: 10 }} />
    </div>
  );
}