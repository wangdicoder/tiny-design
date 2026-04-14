import React from 'react';
import { Button, LoadingBar, Flex } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <Flex gap="sm">
      <Button onClick={() => LoadingBar.start()}>Start</Button>
      <Button onClick={() => LoadingBar.succeed()} variant="solid" color="success">
        Success
      </Button>
      <Button onClick={() => LoadingBar.fail()} variant="solid" color="danger">
        Fail
      </Button>
    </Flex>
  );
}
