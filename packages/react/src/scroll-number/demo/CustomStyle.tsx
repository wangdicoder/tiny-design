import React, { useState } from 'react';
import { ScrollNumber, Button, Flex } from '@tiny-design/react';

export default function CustomStyleDemo() {
  const [value, setValue] = useState(88888);

  return (
    <div>
      <Flex gap="lg" align="start">
        <ScrollNumber
          title="Large"
          value={value}
          valueStyle={{ fontSize: 40, color: '#6c5ce7' }}
        />
        <ScrollNumber
          title="Small"
          value={value}
          valueStyle={{ fontSize: 16, fontWeight: 400 }}
        />
        <ScrollNumber
          title="No Separator"
          value={value}
          groupSeparator=""
        />
      </Flex>
      <Button onClick={() => setValue(Math.floor(Math.random() * 100000))} style={{ marginTop: 16 }}>
        Randomize
      </Button>
    </div>
  );
}
