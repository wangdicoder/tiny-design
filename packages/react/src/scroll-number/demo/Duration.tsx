import React, { useState } from 'react';
import { ScrollNumber, Button, Flex } from '@tiny-design/react';

export default function DurationDemo() {
  const [value, setValue] = useState(100);

  const handleClick = () => setValue(Math.floor(Math.random() * 10000));

  return (
    <div>
      <Flex gap="lg">
        <div>
          <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>Fast (100ms)</div>
          <ScrollNumber value={value} duration={100} />
        </div>
        <div>
          <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>Default (300ms)</div>
          <ScrollNumber value={value} duration={300} />
        </div>
        <div>
          <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>Slow (800ms)</div>
          <ScrollNumber value={value} duration={800} />
        </div>
      </Flex>
      <Button onClick={handleClick} style={{ marginTop: 16 }}>Randomize</Button>
    </div>
  );
}
