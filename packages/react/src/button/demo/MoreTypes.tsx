import React from 'react';
import { Button, Flex } from '@tiny-design/react';

export default function MoreTypesDemo() {
  return (
    <Flex gap="sm">
      <Button btnType="success">Success</Button>
      <Button btnType="info">Info</Button>
      <Button btnType="warning">Warning</Button>
      <Button btnType="danger">Danger</Button>
    </Flex>
  );
}
