import React from 'react';
import { Button, LoadingBar, Flex } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <Flex gap="sm">
      <Button onClick={() => LoadingBar.start()}>Start</Button>
      <Button onClick={() => LoadingBar.succeed()} btnType="success">Success</Button>
      <Button onClick={() => LoadingBar.fail()} btnType="danger">Fail</Button>
    </Flex>
  );
}