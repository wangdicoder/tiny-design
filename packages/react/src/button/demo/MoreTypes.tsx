import React from 'react';
import { Button, Flex } from '@tiny-design/react';

export default function MoreTypesDemo() {
  return (
    <Flex gap="sm">
      <Button variant="solid" color="success">
        Success
      </Button>
      <Button variant="solid" color="info">
        Info
      </Button>
      <Button variant="solid" color="warning">
        Warning
      </Button>
      <Button variant="solid" color="danger">
        Danger
      </Button>
    </Flex>
  );
}
