import React, { useState } from 'react';
import { Progress, Button } from '@tiny-design/react';

export default function DynamicDemo() {
  const { Bar, Circle } = Progress;
  const { Group } = Button;

  const [percent, setPercent] = useState(0);

  return (
    <div>
      <Group style={{ marginBottom: 20 }}>
        <Button onClick={() => percent > 0 && setPercent(percent - 10)}>-</Button>
        <Button onClick={() => percent < 100 && setPercent(percent + 10)}>+</Button>
      </Group>

      <Bar percent={percent} />
      <Circle percent={percent} />
    </div>
  );
}