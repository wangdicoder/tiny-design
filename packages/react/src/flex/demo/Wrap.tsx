import React from 'react';
import { Flex, Button } from '@tiny-design/react';

export default function WrapDemo() {
  return (
    <Flex wrap="wrap" gap="sm">
      {Array.from({ length: 24 }, (_, i) => (
        <Button key={i} btnType="primary">Button</Button>
      ))}
    </Flex>
  );
}