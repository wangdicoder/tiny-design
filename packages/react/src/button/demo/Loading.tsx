import React from 'react';
import { Button, Flex } from '@tiny-design/react';

export default function LoadingDemo() {
  return (
    <Flex gap="sm">
      <Button loading>Default</Button>
      <Button loading variant="solid" color="primary">
        Primary
      </Button>
      <Button loading variant="link" color="primary">
        Link
      </Button>
    </Flex>
  );
}
