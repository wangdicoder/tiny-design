import React, { useState } from 'react';
import { Progress, Button } from '@tiny-design/react';

export default function CustomTextDemo() {
  const { Bar, Circle } = Progress;
  const { Group } = Button;

  const [percent, setPercent] = useState(90);

  const renderText = (val: number) => {
    if (val < 100) return `${val} Days`;
    return 'Done';
  };

  return (
    <div>
      <Group style={{ marginBottom: 20 }}>
        <Button onClick={() => percent > 0 && setPercent(percent - 10)}>-</Button>
        <Button onClick={() => percent < 100 && setPercent(percent + 10)}>+</Button>
      </Group>

      <Bar percent={percent} format={renderText} />
      <Circle percent={percent} format={renderText} />
    </div>
  );
}