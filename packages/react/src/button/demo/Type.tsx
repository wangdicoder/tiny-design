import React from 'react';
import { Button, Flex } from '@tiny-design/react';

export default function TypeDemo() {
  return (
    <Flex gap="sm">
      <Button>Default</Button>
      <Button variant="solid" color="primary">
        Primary
      </Button>
      <Button variant="outline" color="primary">
        Outline
      </Button>
      <Button variant="ghost" color="primary">
        Ghost
      </Button>
      <Button variant="link" color="primary">
        Link
      </Button>
    </Flex>
  );
}
