import React from 'react';
import { Button, Flex, Message } from '@tiny-design/react';

export default function TypeDemo() {
  const onClick = (type: string) => {
    Message[type](`A ${type} type message.`);
  };

  return (
    <Flex gap="sm">
      <Button btnType="info" onClick={() => onClick('info')}>Info</Button>
      <Button btnType="success" onClick={() => onClick('success')}>Success</Button>
      <Button btnType="warning" onClick={() => onClick('warning')}>Warning</Button>
      <Button btnType="danger" onClick={() => onClick('error')}>Error</Button>
      <Button btnType="info" onClick={() => onClick('loading')}>Loading</Button>
    </Flex>
  );
}