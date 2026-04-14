import React from 'react';
import { Button, Flex, Message } from '@tiny-design/react';

export default function TypeDemo() {
  const onClick = (type: string) => {
    Message[type](`A ${type} type message.`);
  };

  return (
    <Flex gap="sm">
      <Button variant="solid" color="info" onClick={() => onClick('info')}>
        Info
      </Button>
      <Button variant="solid" color="success" onClick={() => onClick('success')}>
        Success
      </Button>
      <Button variant="solid" color="warning" onClick={() => onClick('warning')}>
        Warning
      </Button>
      <Button variant="solid" color="danger" onClick={() => onClick('error')}>
        Error
      </Button>
      <Button variant="solid" color="info" onClick={() => onClick('loading')}>
        Loading
      </Button>
    </Flex>
  );
}
