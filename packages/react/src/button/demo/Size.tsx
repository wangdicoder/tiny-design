import React from 'react';
import { Button, Flex } from '@tiny-design/react';

export default function SizeDemo() {
  return (
    <Flex gap="sm">
      <Button variant="solid" color="primary" size="lg">
        Large Size
      </Button>
      <Button variant="solid" color="primary">
        Default Size
      </Button>
      <Button variant="solid" color="primary" size="sm">
        Small Size
      </Button>
    </Flex>
  );
}
