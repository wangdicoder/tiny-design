import React, { useState } from 'react';
import { ScrollNumber, Button, Flex } from '@tiny-design/react';

export default function BasicDemo() {
  const [value, setValue] = useState(1234);

  return (
    <Flex vertical gap="md">
      <ScrollNumber value={value} />
      <Button.Group>
        <Button onClick={() => setValue((v) => v + 1)}>
          +
        </Button>
        <Button onClick={() => setValue((v) => v - 1)}>
          -
        </Button>
        <Button onClick={() => setValue(Math.floor(Math.random() * 100000))}>?</Button>
      </Button.Group>
    </Flex>
  );
}
